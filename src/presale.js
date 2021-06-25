import React, { useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Header from "./presale/header";
import Exchange from "./presale/Exchange";
import Web3 from 'web3'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'

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

//metamask connection
const [web3, setWeb3] = useState(undefined)
	const [account, setAccount] = useState('')
	const [assetPrice, setAssetPrice] = useState(0)
	const [asset, setAsset] = useState('')
	// const [metamaskChange, setMetaMaskChange] = useState(true)
	const [wrongNetwork, setWrongNetwork] = useState(false)
	const [loading, setLoading] = useState(true)
	const handleClose = () => {
		// setMetaMaskChange(!metamaskChange)
		setWrongNetwork(false)
	}

	const getWeb3 = () => {
		return new Promise(async (resolve, reject) => {
			if (window.ethereum) {
				const web3 = new Web3(window.ethereum)
				try {
					// await window.ethereum.send("eth_requestAccounts");
					await window.ethereum.enable()
					resolve(web3)
				} catch (e) {
					reject(e)
				}
			} else if (window.web3) {
				resolve(window.web3)
			} else {
				window.alert('Must install Metamask Extension!\nDApp will not load')
				// resolve('Must install Metamask Extension!')
			}
		})
	}

	useEffect(() => {
		const init = async () => {
			const web3 = await getWeb3()
			if (web3 === undefined) return
			const account = (await web3.eth.getAccounts())[0]
			const networkId = await web3.eth.net.getId()
			if (networkId !== parseInt(REACT_APP_NETWORK_ID)) {
				console.log('Not correct', networkId, REACT_APP_NETWORK_ID)
				setWrongNetwork(true)
			}
			const domain = window.location.href.split('?')[0]
			if (domain.indexOf('/presale') === -1) {
				setAsset('BUSD')
			} else {
				setAsset('BNB')
			}
			const bnbPrice = await getAssetPrice(web3)
			setAssetPrice(bnbPrice)
			setWeb3(web3)
			setAccount(account)
		}
		setLoading(true)
		init()
		setLoading(false)
	}, [])

	// useEffect(() => {
	// 	window.ethereum.on('accountsChanged', () => {
	// 		console.warn('Account changed')
	// 		setMetaMaskChange((m) => !m)
	// 	})
	// 	window.ethereum.on('chainChanged', () => {
	// 		console.warn('Chain changed')
	// 		setMetaMaskChange((m) => !m)
	// 	})
	// }, [])



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
