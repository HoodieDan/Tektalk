<template>
  <div class="container">
    <PostBox 
     :placeholder="placeholder"
     :category="category"
     :postedIn="postedIn"
    />
    <PostItem
     v-for="post in posts" 
     :key="post.postId" 
     :post="post" 
     :images="post.images" 
    />
    <PageLoader :width="30" :height="30" :color="color" v-if="loading" v-motion-pop />
  </div>
</template>

<script>
import PostBox from '../components/PostBox.vue';
import PostItem from '../components/PostItem.vue';
import PageLoader from '../components/PageLoader.vue';
import axios from 'axios';

export default {
    name: 'HomePage',
    components: { PostBox, PostItem, PageLoader },
    data() {
      return {
        placeholder: 'What is on your mind?',
        posts: [],
        category: 'Post',
        postedIn: 'Feed',
        pageNumber: 1,
        loading: false,
        color: 'FFF',
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    async beforeRouteEnter(to, from, next) {
      const apiKey = import.meta.env.VITE_API_KEY;
      const res = await axios.get(`/post?apiKey=${apiKey}&pageNumber=1`)
      next((vm) => {
        vm.posts = res.data.posts;
        vm.pageNumber = 2;
      })
    },
    methods: {
      async handleScroll() {
        const apiKey = import.meta.env.VITE_API_KEY;
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        const bottomOfWindow = Math.round(scrollTop) + clientHeight === scrollHeight;

        if (bottomOfWindow) {
          const res = await axios.get(`/post?apiKey=${apiKey}&pageNumber=${this.pageNumber}`)
          
          if (res) {
            this.loading = false;
          }

          if (res.data.posts === []) {
            this.loading = false;
            this.posts.push(res.data.posts);
            this.pageNumber += 1;
          }
        }
      },
    }
}
</script>

<style>

</style>
