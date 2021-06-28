import Web3 from "web3";
import whitelistedAddresses from "./presale/whitelist.json";

const httpProvider = new Web3.providers.HttpProvider(
  process.env.REACT_APP_RPCURL,
  {
    timeout: 10000,
  }
);

const getWeb3 = () => {
  return new Web3(httpProvider);
};

const isWhitelisted = (addr) => whitelistedAddresses.some((a) => a === addr);

export { getWeb3, isWhitelisted };
