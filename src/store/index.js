import { createStore } from "vuex";
import web3store from "../web3/store.js";

export default createStore({
  modules: {
    web3store,
  },
});
