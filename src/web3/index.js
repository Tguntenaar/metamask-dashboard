import Web3 from "web3";
import Web3Utils from "web3-utils";
import abi_bth from "./bth.json";

window.web3 = new Web3(window.ethereum);
const web3 = window.web3;
// Check whether metamask is connected to the right network.
// Request to switch network otherwise.
if (window.ethereum) {
  // This is only metamask
  window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x38",
        chainName: "Binance Smart Chain",
        nativeCurrency: {
          name: "Binance Coin",
          symbol: "BNB",
          decimals: 18,
        },
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        blockExplorerUrls: ["https://bscscan.com"],
      },
    ],
  });
}

const bthContract = new web3.eth.Contract(
  abi_bth,
  "0x57Bc18F6177cDafFb34aCE048745bc913a1B1b54"
);

console.log({ bthContract });

const getActiveMetaMaskAccount = async () => {
  if (!window.ethereum) return "";
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
};

const getBalance = async () => {
  try {
    const account = await getActiveMetaMaskAccount();
    const result = await bthContract.methods.balanceOf(account).call();
    const balance = Web3Utils.fromWei(result.toString(), "ether");
    return balance;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
};

export { web3, getBalance };
