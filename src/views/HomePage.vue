<template>
  <div class="container">
    <PostBox :placeholder="placeholder" />
    <PostItem v-for="post in posts" :key="post.postId" :post="post" :images="post.images" />
  </div>
</template>

<script>
import PostBox from '../components/PostBox.vue';
import PostItem from '../components/PostItem.vue';
import axios from 'axios';

export default {
    name: 'HomePage',
    components: { PostBox, PostItem },
    data() {
      return {
        placeholder: 'What is on your mind?',
        posts: []
      }
    },
    async created() {
      const apiKey = import.meta.env.VITE_API_KEY;
      const res = await axios.get(`/post?apiKey=${apiKey}&pageNumber=1`)
      this.posts = res.data.posts;
    }
}
</script>

<style>

</style>
