import React, { useState } from "react";
import NumericInput from "./NumericInput";

const Exchange = () => {
  const [bnbBalance, setBnbBalance] = useState(null);
  const [novaBalance, setNovaBalance] = useState(null);

  return (
    <div style={{ maxWidth: "max-content", margin: "auto" }}>
      <p style={{ marginBottom: 5, fontWeight: "bold" }}>
        Please enter the amount you wish to buy (400 NOVAs max)
      </p>
      <NumericInput
        label="From"
        token={{ symbol: "BNB", logo: "assets/images/bnb.png" }}
        balance={bnbBalance}
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
        token={{ symbol: "NOVA", logo: "assets/images/nova_token.png" }}
        balance={novaBalance}
      />
      <div
        style={{
          display: "flex",
          width: "90%",
          margin: "5px auto",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        <span style={{ color: "#159bd2", fontSize: 12 }}>Price:</span>
        &nbsp; 1$ per NOVA
      </div>
      <button
        style={{ minWidth: 175, padding: 8, marginTop: 20 }}
        className="btn btn-primary"
      >
        BUY
      </button>
    </div>
  );
};
export default Exchange;
