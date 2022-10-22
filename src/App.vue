<template>
  <div class="container-fluid main-fluid">
    <vue-headful
        title="Tektalk"
        description="TekTalk is a social network aimed for tech driven individuals to
          be able to meet like minded individuals for whatever reason it may be. It is made for but not limited to techies. Tektalk
          also welcomes everyone, guests included."
    />
    <PreLoader v-if="!showPage" />
    <TopBar  v-if="!$route.meta.hideNavbar" :currentUser="user" @read="read" />
    <BottomMenu  v-if="!$route.meta.hideNavbar" />
    <div class="row main-row">
      <div class="col-lg-2 col-md-1 side-menu">
        <SideMenu :popularTalks="popularTalks" v-if="!$route.meta.hideNavbar" />
      </div>
      <div class="col-lg-7 col-md-11 pad middle">
        <router-view v-slot="{ Component }" >
          <transition name="fade" mode="out-in">
            <component :is="Component" ></component>
          </transition>
        </router-view>
        <ImageModal v-if="showImage" v-motion-pop />
      </div>
      <div class="col-lg-3 col-0">
        <Suggestions class="pad"  v-if="!$route.meta.hideNavbar"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SideMenu from './components/SideMenu.vue';
import TopBar from './components/TopBar.vue';
import Suggestions from './components/Suggestions.vue';
import BottomMenu from './components/BottomMenu.vue';
import { authStore } from './stores/auth';
import ImageModal from './components/ImageModal.vue';
import { postStore } from './stores/post';
import PreLoader from './components/PreLoader.vue';

export default {
    name: "App",
    async created() {
      const apiKey = import.meta.env.VITE_API_KEY;

      const res = await axios.get(`talk/suggested-popular?apiKey=${apiKey}`)
      this.suggestedTalks = res.data.suggestedTalks;
      this.popularTalks = res.data.popularTalks;
      console.log(res.popularTalks);

      const auth = authStore();
      const uid = localStorage.getItem('uid');
      this.uid = uid;
      
      const token = localStorage.getItem('token');

      if (token) {
        auth.loggedIn();
        const profile = await axios.get(`/profile?apiKey=${apiKey}`)
        this.user = profile.data;
      }

      setTimeout(()=> {
        this.showPage = true;
      }, 3000)
    },
    data() {
      return {
        user: null,
        uid: null,
        showImage: false,
        showPage: false,
        suggestedTalks: [],
        popularTalks: [],
      }
    },
    methods: {
      read() {
        this.user.unreadNotifications = false;
      }
    },
    computed: {
      emptyScreen() {
        return this.$route.name === 'Auth' || this.$route.name === 'SignUp' ||
        this.$route.name === 'SignIn' || this.$route.name === 'ForgotPassword' || 
        this.$route.name === 'ResetPassword'
      },
      ImageModalOpen() {
        const post = postStore();

        return post.ImageModalIsOpen
      },
      currentRoute() {
        return this.$route.from === 'Notifications';
      }
    },
    watch: {
      ImageModalOpen() {
        this.showImage = !this.showImage;
      },
      // currentRoute() {
      //   if (this.user.unreadNotifications) {
      //     this.user.unreadNotifications = false;
      //   }
      // }
    },
    components: { SideMenu, TopBar, Suggestions, BottomMenu, ImageModal, PreLoader },
}
</script>

<style scoped>
.transparent {
  opacity: 0;
}
.fade-in {
  animation: fade-in 0.5s linear forwards;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@media (max-width: 768px) {
  .side-menu {
    display: none;
  }
  .main-fluid {
    padding-left: 0;
  }
  /* .main-row {
    margin-right: 0;
  } */
  .middle {
    width: 100%;
  }
}
@media (max-width: 575px) {
    .container {
        padding-left: 0;
        padding-right: 0;
    }
    .row > * {
        padding-left: 1rem;
        padding-right: 0.25rem;
    }
    .pad {
      padding-top: 5rem;
    }
}
</style>