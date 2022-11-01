<template>
  <div class="container">
    <vue-headful
        title="Tektalk Home"
        description="Tektalk is the ultimate community for techies to meet like minded individuals."
        keywords="Tektalk"
        url="https://tektalk.vercel.app"
    />
    <PostBox 
     :placeholder="placeholder"
     :category="category"
     :postedIn="postedIn"
     @posted="pushPost"
    />
    <PostItem
     v-for="post in posts" 
     :key="post.postId" 
     :post="post" 
     :images="post.images" 
    />
    <!-- <button @click="getPosts">Get</button> -->
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
      window.addEventListener('resize', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    },
    async beforeRouteEnter(to, from, next) {
      const apiKey = import.meta.env.VITE_API_KEY;
      const res = await axios.get(`/post/related-posts?apiKey=${apiKey}&pageNumber=1`)
      next((vm) => {
        vm.posts = res.data.posts;
        vm.pageNumber = 2;
      })
    },
    methods: {
      async getPosts() {
        const apiKey = import.meta.env.VITE_API_KEY;
        if (this.loading) {
          return;
        }
        this.loading = true;
        const res = await axios.get(`/post/related-posts?apiKey=${apiKey}&pageNumber=${this.pageNumber}`)
        if (res.data.posts.length !== 0) {
          this.loading = false;
          this.posts.push(...res.data.posts)
          this.pageNumber += 1;
        } else {
          this.loading = false;
          window.removeEventListener('scroll', this.handleScroll);
        }
      },
      handleScroll() {
        // different ways to make sure infinite scroll works
        const { scrollTop, offsetHeight, clientHeight, scrollHeight } = document.documentElement;
        const { innerHeight } = window;
        const bottomOfWindow2 = Math.round(scrollTop) + innerHeight === offsetHeight;
        const bottomOfWindow = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight;
        const bottomOfMac = (window.innerHeight + Math.ceil(window.pageYOffset + 1)) >= document.body.offsetHeight;
        const bottomOfWindow3 = (window.innerHeight + window.scrollY) >= document.body.scrollHeight;
        const scrolledToEnd = scrollHeight - Math.round(scrollTop) === clientHeight;
        const bottomOfWindow4 = Math.round(scrollTop) + clientHeight === scrollHeight;

        if (bottomOfWindow || bottomOfWindow2 || bottomOfMac || bottomOfWindow3 || scrolledToEnd || bottomOfWindow4) {
          this.getPosts();
        }
      },
      pushPost(data) {
          this.posts.unshift(data);
      },
    }
}
</script>

<style scoped>
@media (max-width: 768px) {
  body {
    overflow-x: hidden;
  }
}
</style>
