<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <connect-wallet />
    <HelloWorld msg="Hello Vue 3 + Vite" />
    <div class="card" v-for="item in arry" :key="item">info {{ balance }}</div>
  </div>
</template>
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "../views/HelloWorld.vue";
import ConnectWallet from "../components/ConnectWallet.vue";
import { getBalance } from "../web3";
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
const arry = [1, 2, 3, 4, 5, 6];
const balance = ref(0);
onBeforeMount(async () => {
  balance.value = await getBalance();
});
</script>
<style lang="scss">
.card {
  width: 80%;
  border-radius: 7px;
  height: 30px;
  background: linear-gradient(267deg, rgb(0, 9, 66) 0%, rgb(0, 39, 84) 94%);
  color: white;
  margin: auto;
  margin-top: 10px;
}
</style>
