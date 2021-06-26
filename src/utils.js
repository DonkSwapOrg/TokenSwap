import Web3 from "web3";

const httpProvider = new Web3.providers.HttpProvider(
  process.env.REACT_APP_RPCURL,
  {
    timeout: 10000,
  }
);

const getWeb3 = () => {
  return new Web3(httpProvider);
};

export { getWeb3 };
