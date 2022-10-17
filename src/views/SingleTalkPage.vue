<template>
  <div class="container">

    <PostBox
     :category="category" 
     :placeholder="placeholder" 
     :postedIn="postedIn" 
     @posted="pushPost"
    />

    <PostItem
     v-for="post in posts" 
     :key="post.postId" 
     :post="post" 
     :images="post.images" 
    />

  </div>
</template>

<script>
import PostBox from '../components/PostBox.vue';
import axios from 'axios';
import PostItem from '../components/PostItem.vue';
export default {
    name: "SingleTalkPage",
    components: { PostBox, PostItem },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleScroll);
      console.log(this.$route.params.talk);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    },
    async beforeRouteEnter(to, from, next) {
      const apiKey = import.meta.env.VITE_API_KEY;
      const res = await axios.get(`/post?apiKey=${apiKey}&pageNumber=1&filter=${to.params.talk}`)
      next((vm) => {
        vm.posts = res.data.posts;
        vm.pageNumber = 2;
      })
    },
    data() {
        return {
            category: 'Post',
            placeholder: 'Ask or contribute anything',
            posts: [],
            pageNumber: 1,
        }
    },
    computed: {
        postedIn() {
            return this.$route.params.talk;
        }
    },
    methods: {
        async getPosts() {
        const apiKey = import.meta.env.VITE_API_KEY;
        if (this.loading) {
          return;
        }
        this.loading = true;
        const res = await axios.get(`/post?apiKey=${apiKey}&pageNumber=$&filter=${this.$route.params.talk}{this.pageNumber}`)
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

<style>

</style>