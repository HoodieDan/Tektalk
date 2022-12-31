<template>
  <div class="container fade-in suggestions">
    <RecommendedUsers :suggested="suggested" />
    <RecommendedTalks :suggested-talks="suggestedTalks" class="sticky-top rec-talks" />
  </div>
</template>

<script>
import RecommendedTalks from './RecommendedTalks.vue';
import RecommendedUsers from './RecommendedUsers.vue';
import axios from 'axios';
export default {
    name: "Suggestions",
    components: { RecommendedTalks, RecommendedUsers },
    async created() {
      if (localStorage.getItem('token')) {
        const apiKey = import.meta.env.VITE_API_KEY;
        const res = await axios.get(`/suggestions?apiKey=${apiKey}&pageNumber=1`)
        this.suggested = res.data.users;
      }
    },
    data() {
      return {
        suggested: null,
      }
    },
    props: [ 'suggestedTalks' ],
}
</script>

<style scoped>
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