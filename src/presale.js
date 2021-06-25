import React, { useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Header from "./presale/header";
import Exchange from "./presale/Exchange";
import Web3 from 'web3'
import Spinner from 'react-bootstrap/Spinner'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const { REACT_APP_NETWORK_ID } = process.env



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
  return <div className="particles">{generateParticles()}</div>;
};

const App = () => {
  
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])


  return (
    <>
      <Header account={account} asset={asset} assetPrice={assetPrice}/>
      {loading === true ? <Spinner /> : null}
      <div className="d-flex flex-column align-items-center justify-content-between">
        <a href="/">
          <img
            id="logo_slogan"
            src="assets/images/logo.png"
            style={{ height: 260 }}
            alt=""
          />
        </a>

        <div style={{ width: "100%" }} className="hero">
          <p style={{ fontSize: 22 }} className="mx-auto">
            Welcome to ShibaNova Public Pre-sale!
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "0 1rem" }}>
        <Exchange  web3={web3} asset={asset}/>
        <div className="presale-text-info">
          Only whitelisted wallets can purchase NOVA; please check our Telegram
          if you're unsure of your whitelist status.
        </div>
      </div>
      <Particles />
    </>
  );
};

var mountNode = document.body;
ReactDOM.render(<App name="Jane" />, mountNode);
