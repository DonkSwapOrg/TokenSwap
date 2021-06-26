import { useWallet } from "@binance-chain/bsc-use-wallet";
import React, { useEffect, useState } from "react";
import NumericInput from "./NumericInput";
import BUSDTokenABI from "../contracts/BUSDTokenABI";
import NovaTokenABI from "../contracts/NovaTokenABI";
import NovaSwapABI from "../contracts/NovaSwapABI";
import { getWeb3 } from "../utils";

const Exchange = () => {
  const wallet = useWallet();
  const [tokenABal, setTokenABal] = useState(null);
  const [tokenBBal, setTokenBBal] = useState(null);

  useEffect(() => {
    const fetchBUSDBalance = async () => {
      const web3 = getWeb3();
      const token = new web3.eth.Contract(
        BUSDTokenABI,
        process.env.REACT_APP_BUSDTOKEN
      );

      const tokenBalance = await token.methods.balanceOf(wallet.account).call();

      setTokenABal(tokenBalance);
    };

    if (wallet.status === "connected") {
      fetchBUSDBalance();
    } else {
      setTokenABal(null);
    }
  }, [wallet.status, wallet.balance]);

  useEffect(() => {
    const fetchNovaBalance = async () => {
      const web3 = getWeb3();
      const token = new web3.eth.Contract(
        NovaTokenABI,
        process.env.REACT_APP_NOVATOKEN
      );

      const tokenBalance = await token.methods.balanceOf(wallet.account).call();

      setTokenBBal(tokenBalance);
    };

    if (wallet.status === "connected") {
      fetchNovaBalance();
    } else {
      setTokenBBal(null);
    }
  }, [wallet.status, wallet.balance]);

  const handleBuy = () => {
    if (wallet.status !== "connected") {
      return;
    }

    const buy = async () => {
      const web3 = getWeb3();

      const busdToken = new web3.eth.Contract(
        BUSDTokenABI,
        process.env.REACT_APP_BUSDTOKEN
      );

      const swapContract = new web3.eth.Contract(
        NovaSwapABI,
        process.env.REACT_APP_NOVASWAP
      );

      // NOT IDEA WHAT I'M DOING
      await busdToken.methods
        .approve(swapContract._address, 1)
        .send({ from: wallet.account })
        .on("transactionHash", (hash) => {
          swapContract.methods
            .swap(1)
            .send({ from: wallet.account })
            .on("transactionHash", (hash) => {
              console.log(hash);
            });
        });
    };

    buy();
  };

  return (
    <div style={{ maxWidth: "max-content", margin: "auto" }}>
      <p style={{ marginBottom: 5, fontWeight: "bold" }}>
        Please enter the amount you wish to buy (400 NOVAs max)
      </p>
      <NumericInput
        label="From"
        token={{
          symbol: "BUSD",
          logo: require("../../assets/images/busd.png"),
        }}
        balance={tokenABal}
        showMaxBtn
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
        balance={tokenBBal}
      />
      <div
        style={{
          display: "flex",
          width: "90%",
          margin: "5px auto",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: 12,
        }}
      >
        <span style={{ color: "#159bd2" }}>Price:</span>
        &nbsp; 1 BUSD per NOVA
      </div>
      <button
        style={{ minWidth: 175, padding: 8, marginTop: 20 }}
        className="btn btn-primary"
        onClick={handleBuy}
      >
        BUY
      </button>
    </div>
  );
};
export default Exchange;
