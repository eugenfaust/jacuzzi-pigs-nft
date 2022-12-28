<script>
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import { useToast } from 'vue-toastification';
import Web3 from '../services/Web3';

import jacuzziPig from '../assets/jacuzzi_pig.gif';

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      jacuzziPig,
      alreadyBuyed: false,
      isBuying: false,
    };
  },
  computed: {
    address() {
      return this.$store.state.address;
    },
  },
  watch: {
    async address(newAddress) {
      const result = await Web3.balanceOf(newAddress);
      if (result > 0) {
        this.alreadyBuyed = true;
        console.log('Buyed');
      } else {
        this.alreadyBuyed = false;
      }
    },
  },
  methods: {
    async buyNFT() {
      if (!this.address) {
        this.$store.commit('setConnectModal', true);
        return;
      }
      this.isBuying = true;
      try {
        const response = await Web3.buyNFT(this.address);
        if (!response.status) {
          this.toast.error(response.message);
          if (response.balance > 0) {
            this.alreadyBuyed = true;
          }
          this.isBuying = false;
          return;
        }
        localStorage.setItem(
          'tokenId',
          response.events.Transfer.returnValues.tokenId,
        );
        this.toast.success(
          'You are successfully buy our NFT. Congratulations!',
        );
        this.alreadyBuyed = true;
      } catch (error) {
        this.toast.error(error.message);
      } finally {
        this.isBuying = false;
      }
    },
  },
};
</script>
<template>
  <div class="hero min-h-screen">
    <div class="flex flex-col items-center rounded-2xl p-2 w-full">
      <img :src="jacuzziPig" class="rounded-2xl p-2 md:w-[720] md:h-[960px]" />
      <p>By mach1n3ry</p>
      <button
        class="btn mt-2 btn-primary mb-2"
        :class="{ loading: isBuying }"
        :disabled="isBuying || alreadyBuyed"
        @click="buyNFT"
      >
        <p v-if="isBuying">Buying...</p>
        <p v-else-if="alreadyBuyed">1/1</p>
        <p v-else>Mint</p>
      </button>
    </div>
  </div>
</template>
