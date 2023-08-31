<template>
  <div class="container">
    <PageLoader :color="color" :height="20" :width="20" class="mt-5 mb-5" v-motion-pop v-if="searching" />

    <div class="banner p-3 mb-2 text-center" v-if="!searching">
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
        
      <div class="content" v-if="talkDetails">
        <h5 class="bold" >Welcome to the {{ postedIn }} talk!</h5>

        <div class="desc">
          <p>{{ talkDetails.description }}</p> 
        </div>

        <p class="small text-left">No. of members: {{ talkDetails.memberCount }}</p>

        <div class="row">
          <div class="members d-flex col-12">
            <router-link :to="{ name: 'Profile', params: { username: user.username } }" class="circular mb-2" v-for="(user, i) in talkDetails.users" :key="i" v-motion-roll-right>
                <img :src="user.displayUrl" alt="member image" v-if="user.displayUrl !== null">
                <img
                    src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" 
                    alt="profile image" 
                    v-else
                >
            </router-link>
          </div>
          <!-- <div class="col-lg-0 col-6"></div> -->
          <div class="buttons col-lg-12 col-6">
            <button class="talk-btn w-100 light" v-if="!talkDetails.memberOf" @click.self.prevent="join(talkDetails)" :disabled="progress" v-motion-pop >
                <p class="mb-0" v-if="!progress" @click.self.prevent="join(talkDetails)" v-motion-pop >Join</p>
                <PageLoader :color="color" :height="15" :width="15" v-motion-pop v-else />
            </button>
            <button class="talk-outline-btn light w-100" @click.self.prevent="leave(talkDetails)" :disabled="progress" v-motion-pop v-else >
                <p class="mb-0" v-if="!progress" @click.self.prevent="leave(talkDetails)" v-motion-pop >Leave</p>
                <PageLoader :color="color" :height="15" :width="15" v-motion-pop v-else />
            </button>
          </div>
        </div>
      </div>
    </div>

    <PostBox
     :category="category" 
     :placeholder="placeholder" 
     :postedIn="postedIn" 
     @posted="pushPost"
     v-if="!searching"
    />

    <PostItem
     v-for="post in posts" 
     :key="post.postId" 
     :post="post" 
     :images="post.images" 
    />

    <PageLoader :width="20" :height="20" :color="color" v-if="loading" v-motion-pop />
  </div>
</template>

<script>
import PostBox from '../components/PostBox.vue';
import axios from 'axios';
import PostItem from '../components/PostItem.vue';
import PageLoader from '../components/PageLoader.vue';
import { authStore } from '../stores/auth'

export default {
    name: "SingleTalkPage",
    components: { PostBox, PostItem, PageLoader },
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

      let res;
      let deets;

      try {
        deets = await axios.get(`/talk/talk-name/${to.params.talk}?apiKey=${apiKey}`)
      } catch (error) {
        return;
      }

      try {
        res = await axios.get(`/post?apiKey=${apiKey}&pageNumber=1&filter=${to.params.talk}`)
      } catch (error) {
        return;
      }

      next((vm) => {
        vm.posts = res.data.posts;
        vm.pageNumber = 2;
        vm.talkDetails = deets.data.talkInfo;
      })
    },
    async created() {
        const auth = authStore();
        this.currentUser = auth.user;
    },
    data() {
        return {
            category: 'Post',
            placeholder: 'Ask or contribute anything',
            posts: [],
            pageNumber: 1,
            loading: false,
            searching: false,
            progress: false,
            color: 'FFF',
            currentUser: null,
            talkDetails: null,
        }
    },
    computed: {
        postedIn() {
            return this.$route.params.talk;
        },
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
      async join(talk) {
        if (!localStorage.getItem('token')) {
            this.$router.push({ name: 'Auth' })
            return;
        }
        this.progress = true;
        const apiKey = import.meta.env.VITE_API_KEY;
        let res;

        try {
            res = await axios.put(`talk/join?apiKey=${apiKey}&talkId=${talk.id}`)
        } catch (error) {
            this.progress = false;
            this.talkDetails.memberOf = true;
            this.$toast.error(error.message);
            return;
        }
        this.progress = false;
        this.talkDetails.memberOf = true;
        this.talkDetails.memberCount += 1;
        this.$toast.success(res.data.message);

        if (this.talkDetails.users.length < 10) {
          this.talkDetails.users.push({
            username: this.currentUser.username,
            displayUrl: this.currentUser.displayUrl,
          })
        }
      },
      async leave(talk) {
          if (!localStorage.getItem('token')) {
              this.$router.push({ name: 'Auth' })
              return;
          }
          this.progress = true;
          const apiKey = import.meta.env.VITE_API_KEY;
          let res;

          try {
              res = await axios.patch(`talk/leave?apiKey=${apiKey}&talkId=${talk.id}`)
          } catch (error) {
              this.progress = false;
              this.talkDetails.memberOf = true;
              this.$toast.error(error.response.data.message);
              return;
          }
          this.progress = false;
          this.talkDetails.memberOf = false;
          this.talkDetails.memberCount -= 1;
          this.$toast.success(res.data.message);

          const user = this.talkDetails.users.find((use) => {
            return use.username === this.currentUser.username;
          })

          const i = this.talkDetails.users.indexOf(user)

          this.talkDetails.users.splice(i, 1)
      },
      async getTalkDetails() {
        const apiKey = import.meta.env.VITE_API_KEY;
        this.posts = null;
        this.talkDetails = null;
        this.searching = true;
        let res;
        let deets;

        try {
          deets = await axios.get(`/talk/talk-name/${this.$route.params.talk}?apiKey=${apiKey}`)
        } catch (error) {
          return;
        }

        try {
          res = await axios.get(`/post?apiKey=${apiKey}&pageNumber=1&filter=${this.$route.params.talk}`)
        } catch (error) {
          this.searching = false;
          return;
        }

        this.searching = false;
        this.posts = res.data.posts;
        this.pageNumber = 2;
        this.talkDetails = deets.data.talkInfo;
      }
  },
  watch: {
    postedIn() {
      this.getTalkDetails();
    }
  }
}
</script>

<style scoped>
/* div.banner {
    background-color: #e5e5f7;
    opacity: 0.8;
    background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #e5e5f7 10px ), repeating-linear-gradient( #01BAEF, #20BF55 );
    border-radius: 5px;
} */
/* .banner {
    background-color: #e5e5f7;
    opacity: 1;
    background-image:  linear-gradient(135deg, #01BAEF 25%, transparent 25%), linear-gradient(225deg, #01BAEF 25%, transparent 25%), linear-gradient(45deg, #01BAEF 25%, transparent 25%), linear-gradient(315deg, #01BAEF 25%, #005c77 25%);
    background-position:  10px 0, 10px 0, 0 0, 0 0;
    background-size: 20px 20px;
    background-repeat: repeat;
    border-radius: 5px;
}
.banner > * {
    opacity: 1;
    color: #e5e5f7;
} */
.banner {
  max-width: 100%;
  position: relative;
  /* white-space:nowrap; */
  overflow:hidden;
  text-overflow:ellipsis;
  border-radius: 5px;
}
.bg {
  animation: slide 3s ease-in-out infinite alternate;
  background: linear-gradient(to right, #20BF55, #01BAEF);
  bottom: 0;
  left: 0;
  opacity: 0.5;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}
.bg2 {
  animation-direction: alternate-reverse;
  animation-duration: 4s;
}
.bg3 {
  animation-duration: 5s;
}
.talk-btn {
  height: 2rem;
}
@keyframes slide {
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
}
.bold {
    font-weight: 700;
}
/* .desc {
  max-width: 95%;
  overflow: visible;
  z-index: 10;
}
.desc p {
  line-break: strict;
} */
</style>