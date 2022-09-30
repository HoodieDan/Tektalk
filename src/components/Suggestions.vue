<template>
  <div class="container">
    <RecommendedTalks />
    <RecommendedUsers />
  </div>
</template>

<script>
import RecommendedTalks from './RecommendedTalks.vue';
import RecommendedUsers from './RecommendedUsers.vue';
export default {
    name: "Suggestions",
    components: { RecommendedTalks, RecommendedUsers }
}
</script>

<style scoped>

</style>