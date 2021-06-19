import React, { useState } from "react";
import ReactDOM from "react-dom";
import Header from "./presale/header";

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
  const [amount, setAmount] = useState("");

  return (
    <>
      <Header />
      <div className="d-flex flex-column align-items-center justify-content-between">
        <img
          id="logo_slogan"
          src="assets/images/logo.png"
          style={{ height: 260 }}
          alt=""
        />
        <div style={{ width: "100%" }} className="hero">
          <p style={{ marginTop: 16, fontWeight: "bold" }} className="mx-auto">
            Welcome to ShibaNova Public Pre-sale!
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "0 1rem" }}>
        <p style={{ marginBottom: 5 }}>
          Please enter the amount you wish to buy (400 NOVA maximum)
        </p>
        <div
          style={{
            display: "flex",
            flexFlow: "column nowrap",
            position: "relative",
            margin: "auto",
            maxWidth: 450,
          }}
        >
          <div style={{ borderRadius: 16, border: "2px solid #159dd28c" }}>
            <div
              style={{
                display: "flex",
                flexFlow: "row nowrap",
                boxAlign: "center",
                fontSize: 14,
                lineHeight: "1rem",
                padding: "0.75rem 1rem 0px",
              }}
            >
              <div
                style={{
                  boxPack: "justify",
                  justifyContent: "space-between",
                  width: "100%",
                  display: "flex",
                  boxAlign: "center",
                  padding: 0,
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <div>From</div>
                <div>Balance: 0.0345323</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "row nowrap",
                boxAlign: "center",
                padding: "0.75rem 0.75rem 0.75rem 1rem",
              }}
            >
              <input
                type="text"
                inputMode="decimal"
                title="Token Amount"
                autoComplete="off"
                autoCorrect="off"
                pattern="^[0-9]*[.,]?[0-9]*$"
                placeholder="0.0"
                minLength="1"
                maxLength="79"
                spellCheck="false"
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
                style={{
                  color: "rgb(244, 238, 255)",
                  fontWeight: "bold",
                  outline: "currentcolor none medium",
                  border: "medium none",
                  flex: "1 1 auto",
                  backgroundColor: "transparent",
                  fontSize: 16,
                  width: 0,
                }}
              />
              <button
                style={{
                  boxAlign: "center",
                  alignItems: "center",
                  border: "0px none",
                  padding: "0px 16px",
                  fontWeight: "bold",
                  color: "rgb(31, 199, 212)",
                  backgroundColor: "transparent",
                  height: 32,
                  outline: "currentcolor none 0px",
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                }}
              >
                MAX
              </button>
              <button
                style={{
                  padding: "0px 0.5rem",
                  height: 34,
                  backgroundColor: "transparent",
                  border: "medium none",
                  outline: "currentcolor none medium",
                  borderRadius: 12,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src="assets/images/bnb.png"
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                  <div style={{ color: "#fff", fontWeight: "bold" }}>BNB</div>
                </span>
              </button>
            </div>
          </div>
        </div>
        <button
          style={{ minWidth: 175, padding: 8, marginTop: 20 }}
          className="btn btn-primary"
        >
          BUY
        </button>
        <div
          style={{
            fontWeight: "bold",
            color: "#00aaff",
            fontSize: 18,
            border: "1px solid #159dd28c",
            borderRadius: 25,
            padding: "10px 20px 5px",
            margin: "2rem auto",
            maxWidth: "max-content",
          }}
        >
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
