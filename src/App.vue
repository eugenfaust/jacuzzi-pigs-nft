<script>
import { useToast } from 'vue-toastification';
import NavbarVue from './components/NavBar.vue';
import Web3 from './services/Web3';
import HomeView from './views/HomeView.vue';

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    subscribeOnChanges() {
      Web3.onChainChange(this.onChainChange);
      Web3.onAccountChange(this.onAccountChange);
    },
    onChainChange(chainId) {
      let decChainId = chainId;
      if (typeof chainId === 'string') {
        decChainId = parseInt(chainId, 16);
      }
      this.$store.commit('setChainId', decChainId);
    },
    onAccountChange(accounts) {
      this.$store.commit('setAddress', accounts[0]);
    },
  },
  computed: {
    address() {
      return this.$store.state.address;
    },
    theme() {
      return this.$store.state.theme;
    },
  },
  watch: {
    address() {
      this.subscribeOnChanges();
    },
  },
  components: { NavbarVue, HomeView },
  async mounted() {
    this.$store.commit('setTheme', localStorage.getItem('theme') || 'cupcake');
    const wallet = await Web3.getWallet();
    if (wallet) {
      this.$store.commit('setAddress', wallet);
      const chain = await Web3.getChainId();
      if (chain !== Web3.defaultChain) {
        this.toast.error('Please, change your network chain to BNB Mainnet');
        // await Web3.changeChain(Web3.defaultChain);
      }
      this.$store.commit('setChainId', chain);
      this.subscribeOnChanges();
    }
  },
};
</script>

<template>
  <div :data-theme="theme">
    <NavbarVue />
    <div class="flex justify-center items-center pt-16">
      <HomeView />
    </div>
  </div>
</template>
