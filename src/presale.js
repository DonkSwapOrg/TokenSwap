import React from "react";
import ReactDOM from "react-dom";
import Header from "./presale/header";
import Exchange from "./presale/Exchange";

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
  return (
    <>
      <Header />
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
        <Exchange />
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
