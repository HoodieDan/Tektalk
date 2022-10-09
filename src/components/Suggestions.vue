<template>
  <div class="container fade-in suggestions">
    <RecommendedUsers />
    <RecommendedTalks class="sticky-top" />
  </div>
</template>

<script>
import RecommendedTalks from './RecommendedTalks.vue';
import RecommendedUsers from './RecommendedUsers.vue';
export default {
    name: "Suggestions",
    // mounted() {
    //   window.addEventListener('scroll', this.handleScroll);
    // },
    // beforeUnmount() {
    //   window.removeEventListener('scroll', this.handleScroll);
    // },
    // data() {
    //   return {
    //     bottom: false,
    //   }
    // },
    // methods: {
    //   handleScroll() {
    //     const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    //     // const { innerHeight } = window;
    //     const bottomOfWindow = Math.round(scrollTop) + clientHeight === scrollHeight;

    //     if (bottomOfWindow) {
    //       this.bottom = true;
    //     }
    //   },
    // },
    components: { RecommendedTalks, RecommendedUsers }
}
</script>

<style>
div.suggestions {
  height: 100%;
}
.sticky-top {
  top: 6rem;
}
div.recommendation:hover {
  background-color: #191919;
}
</style>