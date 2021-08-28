import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import Header from "./presale/Header";
import Exchange from "./presale/Exchange";
import * as bsc from "@binance-chain/bsc-use-wallet";
const logo = require("../assets/images/og.png");

//generate particles
const generateParticles = () => {
  const arr = [];
  for (var i = 1; i <= 35; i++) {
    arr.push(
      <div key={i} className="circle-container">
        <div className="circle"></div>
      </div>
    );
  }
  return arr;
};

const Particles = () => {
  return <div className="particles"></div>;
};



const App = () => {
  const chainId = parseInt(process.env.REACT_APP_NETWORKID);

  return (
    <bsc.UseWalletProvider chainId={chainId}>
      <Header />
     
      <div  
      className="d-flex flex-column align-items-center justify-content-between">
        <a href="/">
          <img id="logo_slogan" src={logo} style={{ height: 260 }} alt="" />
        </a>

        <div style={{ width: "100%"}} className="hero">
          <p style={{ fontSize: 22, marginBottom: 0 }} className="mx-auto">
            Welcome to the DONK Finance new DonkSwap Token Exchange!
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "1rem" }}>
        <Exchange />
        <div className="presale-text-info">
          When you hit 'Buy' there will be three approvals in metamask. The first is to whitelist your wallet, then approve the allowance, and then the swap.
        </div>
      </div>
      
      <Particles />
    </bsc.UseWalletProvider>
  );
};

var mountNode = document.body;
ReactDOM.render(<App />, mountNode);
