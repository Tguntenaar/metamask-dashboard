<template>
  <div>
    <button
      v-show="isConnected === false"
      class="connect-wallet"
      @click="connect"
    >
      Connect wallet
    </button>

    <button
      class="connect-wallet disconnect"
      v-show="isConnected === true"
      @click="disconnect"
    >
      Disconnect
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    bthBalance: 0,
  }),
  watch: {
    walletName() {
      // Watches when wallet changes
    },
  },
  async created() {
    if (window.ethereum) {
      try {
        window.ethereum.on("accountsChanged", async () => {
          await this.connectToMetaMask();
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    ...mapGetters(["isConnected", "walletAddress", "walletName"]),
  },
  methods: {
    ...mapActions([
      "connectToMetaMask",
      "connectToWalletConnect",
      "connectToTrustWallet",
      "setDisconnected",
      "getMyNFTs",
    ]),
    async connect() {
      await this.connectToMetaMask();
    },

    async disconnect() {
      localStorage.setItem("bthBalance", "0");
      await this.setDisconnected();
    },
  },
};
</script>

<style scoped lang="scss">
.mobile-connect .connect-wallet {
  display: block !important;
}

.web3-info {
  width: 330px;
  height: 60px;
  background: grey;
  position: absolute;
  z-index: 500;
  right: 30px;
  top: 30px;
  background: linear-gradient(
    354deg,
    rgb(0, 123, 175) 0%,
    rgb(0, 212, 255) 100%
  );
  border-radius: 10px;
  border: 1px solid rgba(113, 113, 133, 0.3);

  .vertical-line {
    height: 60px;
    width: 1px;
    float: left;
    margin-left: 10px;
    margin-right: 15px;
    background: #454558;
  }
}

.connect-wallet {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 15px 20px 15px 25px;
  text-align: center;
  position: absolute;
  width: 198px;
  height: 50px;
  right: 50px;
  top: 22px;
  cursor: pointer;

  background: linear-gradient(
    354deg,
    rgb(0, 123, 175) 0%,
    rgb(0, 212, 255) 100%
  );
  border-radius: 10px;
  z-index: 5;
  text-align: center;
  border: 0;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 400;
  cursor: poiner;
  z-index: 555;
}

.disconnect {
  background: linear-gradient(267deg, rgb(181, 168, 70) 0%, rgb(255, 0, 0) 94%);
}

@media only screen and (max-width: 1024px) {
  .connect-wallet {
    bottom: 155px;
    display: none;
  }

  .mobile-connect {
    position: absolute;
    bottom: 335px;
    left: 210px;
    right: auto !important;
  }

  .activeM .web3-info {
    display: none;
  }
}

@media only screen and (max-width: 800px) {
  .connect-wallet {
    height: 40px;
    line-height: 14px;
    width: 140px;
    font-size: 10px;
    bottom: 155px;
  }
}
</style>
