import { useWallet } from "@binance-chain/bsc-use-wallet";
import React, { useEffect, useState } from "react";
import NumericInput from "./NumericInput";
import BUSDTokenABI from "../contracts/BUSDTokenABI";
import NovaTokenABI from "../contracts/NovaTokenABI";
import NovaSwapABI from "../contracts/NovaSwapABI";
import { getWeb3, isWhitelisted } from "../utils";
import Web3 from "web3";
import IERC20ABI from "../contracts/IERC20ABI";

const MAX_PURCHASE_BUSD = "1000000000000000";
const MAX_PURCHASE_NOVA = "1000000000000000";
const BUSD_PER_NOVA = "2";

const Exchange = () => {
  const wallet = useWallet();
  const [balances, setBalances] = useState({ BUSD: null, NOVA: null });
  const [spent, setSpent] = useState("");
  const [buying, setBuying] = useState(false);
  const [joining, setJoining] = useState(false);
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
    // (!isWhitelisted(wallet.account) ||
      buying ||
      Number(amountA) === 0 ||
      Number(amountA) > Number(balances.BUSD) 
      // ||      Number(amountA) > MAX_PURCHASE_BUSD);

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
    const swapContract = new web3.eth.Contract(
      NovaSwapABI,
      process.env.REACT_APP_NOVASWAP
    );

    const BUSDBal = await BUSDContract.methods.balanceOf(wallet.account).call()*1000000000;
    const NOVABal = await NOVAContract.methods.balanceOf(wallet.account).call();

    const spentBusdInWei = await swapContract.methods
      .spent(wallet.account)
      .call();

    const spentBusdForWallet = web3.utils.fromWei(spentBusdInWei);

    setBalances({
      BUSD: web3.utils.fromWei(String(BUSDBal)),
      NOVA: web3.utils.fromWei(NOVABal),
     
    });
    setSpent(spentBusdForWallet);
  };
  
  // const handleJoin = () => {
  //   if (isDisconnected) {
  //     wallet.connect("injected");
  //     return;
  //   }

  //   const join = async () => {
  //   const swapContract = new web3.eth.Contract(
  //     NovaSwapABI,
  //     process.env.REACT_APP_NOVASWAP
  //   );

  //   const isWalletWhitelisted = await swapContract.methods
  //   .isWhitelisted(wallet.account)
  //   .call();
  
  //   if (!isWalletWhitelisted) {
  //    await swapContract.methods
  //     .joinWhitelist(wallet.account)
  //     .send({ from: wallet.account })
  //     .on("transactionHash", (hash) => {
  //         console.log(`Join Whitelist TX hash: ${hash}`);
  //     });  
  //   };
  // };



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
      amountToSpendInWei.isZero()
       || amountToSpendGreaterThanMaximumAllowed
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
         await swapContract.methods
          .joinWhitelist(wallet.account)
         .send({ from: wallet.account })
         .on("transactionHash", (hash) => {
          console.log(`Join Whitelist TX hash: ${hash}`);
         });  
        }

     
        await busdToken.methods
          .approve(swapContract._address, web3.utils.toWei(MAX_PURCHASE_BUSD))
          .send({ from: wallet.account })
          .on("transactionHash", (hash) => {
            console.log(`Approval TX hash: ${hash}`);
          });

      

      await swapContract.methods
        .swap(amountA*1000000000)
        .send({ from: wallet.account })
        .on("transactionHash", (hash) => {
          console.log(`Swap TX hash: ${hash}`);
        });

      setBuying(false);
    };
    setBuying(true);
    buy();
  };

  const handleChange = (e) => {
    updateFields(e.target.validity.valid ? e.target.value : amountA);
  };

  const updateFields = (value) => {
    setAmountA(value);
    setAmountB(value * 1.009667);
  };

  const handleMaxBtn = async (e) => {
    // TODO: This is floating point arithmetic so there are edge case rounding errors; but not really a big deal right now.
    const maxValue =
      balances.BUSD > Number(MAX_PURCHASE_BUSD) - Number(spent) &&
      Number(MAX_PURCHASE_BUSD) - Number(spent) > 0
        ? Number(MAX_PURCHASE_BUSD) - Number(spent)
        : balances.BUSD;
    updateFields(maxValue);
  };

  return (
    <div className="exchange">
       {/* <button
       onClick={join}
      >
        {isDisconnected
          ? "Unlock Wallet"
           : "Join"}
      </button> */}
      <p style={{ marginBottom: 5, fontWeight: "bold" }}>
        NOTE: You'll recieve an extra 1% of the new DST token to account for the cost of swapping transactions.
      </p>
      <NumericInput
        label="From"
        token={{
          symbol: "DONK",
          logo: "https://bscscan.com/token/images/donkeyking_32.png",
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
        style={{ fill: "#8615d2", margin: "5px 0" }}
        color="secondary"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path>
      </svg>
      <NumericInput
        label="To"
        token={{
          symbol: "DST",
          logo: "https://bscscan.com/token/images/donkeyking_32.png",
        }}
        balance={balances.NOVA*1000000000}
        amount={amountB}
        disabled
        //onChange={() => null}
      />
      {/* <div className="price">
        <span style={{ color: "#159bd2" }}>Price:</span>
        &nbsp; 2 BUSD per NOVA
      </div> */}
      <button
        className={`btn btn-primary buy${disableSwap ? " disabled" : ""}`}
        onClick={handleBuy}
      >
        {isDisconnected
          ? "Unlock Wallet"
          // : !isWhitelisted(wallet.account)
          // ? "You're not whitelisted"
          : Number(amountA) === 0
          ? "Enter Amount"
          : Number(amountA) > Number(balances.BUSD*1000000000)
          ? "Insufficient DONK Balance"
          // : Number(amountA) > MAX_PURCHASE_BUSD
          // ? `Max purchase amount: ${MAX_PURCHASE_NOVA} NOVAs`
          : "Buy"}
      </button>
    </div>
  );
};
export default Exchange;
