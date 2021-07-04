import { useWallet } from "@binance-chain/bsc-use-wallet";
import React, { useEffect, useState } from "react";
import NumericInput from "./NumericInput";
import BUSDTokenABI from "../contracts/BUSDTokenABI";
import NovaTokenABI from "../contracts/NovaTokenABI";
import NovaSwapABI from "../contracts/NovaSwapABI";
import { getWeb3, isWhitelisted } from "../utils";
import Web3 from "web3";
import IERC20ABI from "../contracts/IERC20ABI";

const MAX_PURCHASE_BUSD = "250";

const Exchange = () => {
  const wallet = useWallet();
  const [balances, setBalances] = useState({ BUSD: null, NOVA: null });

  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");

  useEffect(() => {
    if (wallet.status === "connected") {
      fetchBalances();
    } else {
      setBalances({ BUSD: null, NOVA: null });
    }
  }, [wallet.status, wallet.balance]);

  const isDisconnected = wallet.status !== "connected";
  const disableSwap =
    !isDisconnected &&
    (!isWhitelisted(wallet.account) ||
      Number(amountA) === 0 ||
      Number(amountA) > Number(balances.BUSD) ||
      Number(amountA) > MAX_PURCHASE_BUSD);

  const fetchBalances = async () => {
    const web3 = getWeb3();
    const BUSDContract = new web3.eth.Contract(
      BUSDTokenABI,
      process.env.REACT_APP_BUSDTOKEN
    );
    const NOVAContract = new web3.eth.Contract(
      NovaTokenABI,
      process.env.REACT_APP_NOVATOKEN
    );

    const BUSDBal = await BUSDContract.methods.balanceOf(wallet.account).call();
    const NOVABal = await NOVAContract.methods.balanceOf(wallet.account).call();

    setBalances({
      BUSD: web3.utils.fromWei(BUSDBal),
      NOVA: web3.utils.fromWei(NOVABal),
    });
  };

  const handleBuy = () => {
    if (disableSwap) return;

    if (isDisconnected) {
      wallet.connect("injected");
      return;
    }

    // We have to make sure the Web3 instance we're using for creating read/write contract proxies uses a provider injected by our wallet.
    const web3 = new Web3(Web3.givenProvider);

    const amountToSpendInWei = web3.utils.toBN(
      amountA ? web3.utils.toWei(amountA) : "0"
    );
    const walletBalanaceInWei = web3.utils.toBN(
      web3.utils.toWei(balances.BUSD)
    );

    const amountToSpendGreaterThanWalletBalance = amountToSpendInWei.gt(
      walletBalanaceInWei
    );
    const amountToSpendGreaterThanMaximumAllowed = amountToSpendInWei.gt(
      web3.utils.toBN(web3.utils.toWei(MAX_PURCHASE_BUSD))
    );

    if (
      amountToSpendGreaterThanWalletBalance ||
      amountToSpendInWei.isZero() ||
      amountToSpendGreaterThanMaximumAllowed
    ) {
      console.log(
        `Preventing buy spending ${amountToSpendInWei.toString()} with wallet balance of ${walletBalanaceInWei.toString()}`
      );
      return;
    }

    const buy = async () => {
      const busdToken = new web3.eth.Contract(
        IERC20ABI,
        process.env.REACT_APP_BUSDTOKEN
      );

      const swapContract = new web3.eth.Contract(
        NovaSwapABI,
        process.env.REACT_APP_NOVASWAP
      );

      // Just do nothing if the connected wallet is not whitelisted and log to the console so we can get users console output and troubleshoot.
      const isWalletWhitelisted = await swapContract.methods
        .isWhitelisted(wallet.account)
        .call();
      if (!isWalletWhitelisted) {
        console.log(
          `Selected account (${wallet.account}) is not whitelisted. `
        );
        return;
      }

      const allowance = await busdToken.methods
        .allowance(wallet.account, swapContract._address)
        .call();
      const allowanceIsZero = web3.utils.toBN(allowance).isZero();

      if (allowanceIsZero) {
        await busdToken.methods
          .approve(swapContract._address, web3.utils.toWei(MAX_PURCHASE_BUSD))
          .send({ from: wallet.account })
          .on("transactionHash", (hash) => {
            console.log(`Approval TX hash: ${hash}`);
          });
      }

      await swapContract.methods
        .swap(web3.utils.toWei(amountA))
        .send({ from: wallet.account })
        .on("transactionHash", (hash) => {
          console.log(`Swap TX hash: ${hash}`);
        });
    };

    buy();
  };

  const handleChange = (e) => {
    updateFields(e.target.validity.valid ? e.target.value : amountA);
  };

  const updateFields = (value) => {
    setAmountA(value);
    setAmountB(value);
  };

  const handleMaxBtn = (e) => {
    // TODO: This is floating point arithmetic so there are edge case rounding errors; but not really a big deal right now.
    const maxValue =
      balances.BUSD > Number(MAX_PURCHASE_BUSD) - Number(balances.NOVA) &&
      Number(MAX_PURCHASE_BUSD) - Number(balances.NOVA) > 0
        ? Number(MAX_PURCHASE_BUSD) - Number(balances.NOVA)
        : balances.BUSD;
    updateFields(maxValue);
  };

  return (
    <div className="exchange">
      <p style={{ marginBottom: 5, fontWeight: "bold" }}>
        NOTE: A single wallet can only purchase a maximum of {MAX_PURCHASE_BUSD}{" "}
        NOVA
      </p>
      <NumericInput
        label="From"
        token={{
          symbol: "BUSD",
          logo: require("../../assets/images/busd.png"),
        }}
        balance={balances.BUSD}
        showMaxBtn
        onMaxBtnClick={handleMaxBtn}
        amount={amountA}
        onChange={handleChange}
      />
      <svg
        viewBox="0 0 24 24"
        width="24px"
        style={{ fill: "#159bd2", margin: "5px 0" }}
        color="primary"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path>
      </svg>
      <NumericInput
        label="To"
        token={{
          symbol: "NOVA",
          logo: require("../../assets/images/nova_token.png"),
        }}
        balance={balances.NOVA}
        amount={amountB}
        onChange={handleChange}
      />
      <div className="price">
        <span style={{ color: "#159bd2" }}>Price:</span>
        &nbsp; 1 BUSD per NOVA
      </div>
      <button
        className={`btn btn-primary buy${disableSwap ? " disabled" : ""}`}
        onClick={handleBuy}
      >
        {isDisconnected
          ? "Unlock Wallet"
          : !isWhitelisted(wallet.account)
          ? "You're not whitelisted"
          : Number(amountA) === 0
          ? "Enter Amount"
          : Number(amountA) > Number(balances.BUSD)
          ? "Insufficient BUSD Balance"
          : Number(amountA) > MAX_PURCHASE_BUSD
          ? `Max purchase ammount: ${MAX_PURCHASE_BUSD} NOVAs`
          : "Buy"}
      </button>
    </div>
  );
};
export default Exchange;
