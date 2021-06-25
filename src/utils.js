import NovaSwap from './contracts/NovaSwap.json'
import BUSDToken from './contracts/BUSDToken.json'
import NovaToken from './contracts/NovaToken.json'
import BNBOracle from './contracts/BNBOracle.json'

//NovaSwap Contract
const swapAddress = process.env.REACT_APP_NOVASWAP
//BUSD Address
const busdAddress = process.env.REACT_APP_BUSDTOKEN
//Nova Address
const novaAddress = process.env.REACT_APP_NOVATOKEN

const getAssetPrice = async (web3) => {
	const domain = window.location.href.split('?')[0]
	const networkId = await web3.eth.net.getId()
	let address
	if (domain.indexOf('/busd') === -1) {
		address = networkId === 56 ? '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE' : '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526'
	} else {
		address = networkId === 56 ? '0xcBb98864Ef56E9042e7d2efef76141f15731B82f' : '0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa'
	}
	const contractInstance = new web3.eth.Contract(BNBOracle, address)
	const assetPrice = ((await contractInstance.methods.latestAnswer().call()) / 1e8).toFixed(0)
	return assetPrice
}

const purchase = async (web3, value) => {
	try {
		const contractInstance = await contractInstanceMethod(web3)
		const account = (await web3.eth.getAccounts())[0]
		const domain = window.location.href.split('?')[0]
		const tokenInstance = new web3.eth.Contract(BEP20Token, busdAddress)
			// const balance = (await tokenInstance.methods.balanceOf(BNBTokenAddress).call()) / 1e18
		const allowance = (await tokenInstance.methods.allowance(account, swapAddress).call()) / 1
			if (allowance <= value) {
				await tokenInstance.methods
					.approve(swapAddress, web3.utils.toBN(2).pow(web3.utils.toBN(256)).sub(web3.utils.toBN(1)))
					.send({ from: account })
					.on('onReceipt', (receipt) => receipt)
					.on('error', (error) => error)
			}

			await contractInstance.methods
				.swap(value)
				.send({ from: account })
				.on('transactionHash', (transactionHash) => transactionHash)
				.on('error', (error) => error)
		
	} catch (e) {
		console.error(`Error at invest:`, e.message)
		throw e
	}
}

export {purchase}