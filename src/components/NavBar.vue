<script>
import { useToast } from 'vue-toastification';
import ConnectButton from './ConnectButton.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';
import Pig from '../assets/pig.png';

export default {
  name: 'NavBar',
  mounted() {
    window.addEventListener('scroll', this.scrollNavbar);
    this.prevScrollPos = window.scrollY;
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollNavbar);
  },
  data() {
    return {
      Pig,
      isScrolling: false,
      prevScrollPos: 0,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
    screenWidth() {
      return window.innerWidth;
    },
  },
  methods: {
    homePage() {
      this.$router.push('/');
    },
    showDrawer() {
      this.$store.commit('setDrawer', !this.$store.state.showDrawer);
    },
    scrollNavbar() {
      const curScrollPos = window.scrollY;
      if (curScrollPos < 50) return;
      if (this.prevScrollPos < curScrollPos) {
        this.isScrolling = true;
      } else {
        this.isScrolling = false;
      }
      this.prevScrollPos = curScrollPos;
    },
  },
  components: { ConnectButton, ThemeSwitcher },
};
</script>

<template>
  <div class="navbar bg-primary fixed top-0 duration-300 z-20" :class="{'-translate-y-16': isScrolling}">
    <div class="flex-1 ml-2 cursor-pointer">
      <img :src="Pig" class="w-10 h-10 "/>

      <a class="ml-2 select-none normal-case text-xl text-primary-content" @click="homePage"
        >Jacuzzi Pig</a
      >
    </div>
    <ThemeSwitcher class="mr-2"/>
    <ConnectButton />
  </div>
</template>
