import Web3 from "web3";

let state = {};
try {
  if (localStorage.getItem("walletName") == "wallet-connect") {
    localStorage.removeItem("walletName");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("isConnected");
  }
  state = {
    walletAddress: localStorage.getItem("walletAddress")
      ? localStorage.getItem("walletAddress")
      : "",
    walletName: localStorage.getItem("walletName")
      ? localStorage.getItem("walletName")
      : "",
    isConnected: localStorage.getItem("isConnected")
      ? JSON.parse(localStorage.getItem("isConnected"))
      : false,
  };
} catch (e) {
  console.log(e);
}

let getters = {
  walletAddress: (state) => state.walletAddress,
  walletName: (state) => state.walletName,
  isConnected: (state) => state.isConnected,
};

let mutations = {
  setWalletAddress(state, address) {
    state.walletAddress = address;
    localStorage.setItem("walletAddress", address);
  },
  setConnected(state, active) {
    state.isConnected = active;
    localStorage.setItem("isConnected", true);
  },
  setWalletName(state, name) {
    state.walletName = name;
    localStorage.setItem("walletName", name);
  },
};

let actions = {
  setDisconnected({ commit }) {
    commit("setConnected", false);
    commit("setWalletName", "");
    commit("setWalletAddress", "");
    localStorage.removeItem("walletName");
    localStorage.removeItem("isConnected");
    localStorage.removeItem("walletAddress");
  },
  async connectToMetaMask({ commit }) {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      window.web3 = new Web3(ethereum);
      await ethereum.request({ method: "eth_requestAccounts" });
      const networkId = await window.web3.eth.net.getId();
      if (networkId !== 56) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        });
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    try {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        commit("setConnected", true);
        commit("setWalletAddress", accounts[0]);
        commit("setWalletName", "metamask");
      } else {
        window.alert(
          "Something went wrong. You should consider trying MetaMask!"
        );
      }
    } catch (e) {
      window.alert(
        "Something went wrong. You should consider trying MetaMask!"
      );
    }
  },
};

export default { state, getters, mutations, actions };
