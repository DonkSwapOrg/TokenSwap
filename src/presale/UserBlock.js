import React from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";
//import Button from "../../../components/Button/Button";
//import { useWalletModal } from "../../WalletModal";

const UserBlock = ({ account, login, logout }) => {
  const { account, connect, reset, status, error } = useWallet();
  //const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
  //  login,
  //  logout,
  //  account
  //);
  const accountEllipsis = account
    ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}`
    : null;
  return (
    <div className="user-block">
      <button onClick={() => {}} className="btn btn-primary">
        {account.length > 0 ? accountEllipsis : "CONNECT WALLET"}
      </button>
    </div>
  );
};

export default React.memo(
  UserBlock,
  (prevProps, nextProps) => prevProps.account === nextProps.account
);
22