import React, { useState } from "react";

const NumericInput = ({
  label,
  token,
  balance,
  showMaxBtn,
  handleMaxBtn,
  onChange,
  amount,
}) => (
  <div
    style={{
      margin: "auto",
      maxWidth: 450,
    }}
  >
    <div style={{ borderRadius: 16, border: "2px solid #159dd28c" }}>
      <div
        style={{
          fontSize: 14,
          lineHeight: "1rem",
          padding: "0.75rem 1rem 0px",
        }}
      >
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            fontWeight: "bold",
          }}
        >
          <div>{label}</div>
          {balance ? <div>Balance: {balance}</div> : null}
        </div>
      </div>
      <div
        style={{
          display: "flex",
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
          onInput={onChange}
          style={{
            color: "rgb(244, 238, 255)",
            fontWeight: "bold",
            border: "medium none",
            flex: "1 1 auto",
            backgroundColor: "transparent",
            width: 0,
          }}
        />
        {showMaxBtn ? (
          <button
            style={{
              border: "0px none",
              fontWeight: "bold",
              color: "rgb(31, 199, 212)",
              backgroundColor: "transparent",
              letterSpacing: "0.03em",
              cursor: "pointer",
            }}
            onClick={() => handleMaxBtn && handleMaxBtn()}
          >
            MAX
          </button>
        ) : null}

        <button
          style={{
            height: 34,
            backgroundColor: "transparent",
            border: "medium none",
          }}
        >
          <span style={{ display: "flex" }}>
            <img src={token.logo} style={{ height: 24, marginRight: 8 }} />
            <div style={{ color: "#fff", fontWeight: "bold" }}>
              {token.symbol}
            </div>
          </span>
        </button>
      </div>
    </div>
  </div>
);

export default NumericInput;
