<template>
  <div>
    <PreLoader v-if="!showPage" />
    <div class="container-fluid main-fluid">
      <vue-headful
          title="Tektalk"
          description="TekTalk is a social network aimed for tech driven individuals to
            be able to meet like minded individuals for whatever reason it may be. It is made for but not limited to techies. Tektalk
            also welcomes everyone, guests included."
      />
      <TopBar  v-if="!$route.meta.hideNavbar" :currentUser="user" @read="read" />
      <BottomMenu  v-if="!$route.meta.hideNavbar" />
      <div class="row main-row">
        <!-- menu  -->
        <div class="col-lg-2 col-md-1 side-menu">
          <SideMenu :popularTalks="popularTalks" v-if="!$route.meta.hideNavbar" />
        </div>

        <!-- router view -->
        <div class="col-lg-7 col-md-11 pad middle">
          <router-view v-slot="{ Component }" >
            <transition name="fade" mode="out-in">
              <component :is="Component" ></component>
            </transition>
          </router-view>
          <ImageModal v-if="showImage" v-motion-pop />
        </div>

        <!-- Suggestions -->
        <div class="col-lg-3 col-0" v-if="thisRoute !== 'Chat'">
          <Suggestions class="pad sugg" :suggestedTalks="suggestedTalks" v-if="!$route.meta.hideNavbar"/>
        </div>
        <div v-else>
          
        </div>
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
import { socketStore } from './stores/socket';
import PreLoader from './components/PreLoader.vue';

export default {
    name: "App",
    mounted() {
      setTimeout(()=> {
        this.showPage = true;
      }, 3000)
      const auth = authStore();

      const token = localStorage.getItem('token');

      if (token) {
        auth.loggedIn();
      }
    },
    async created() {
      const apiKey = import.meta.env.VITE_API_KEY;
      const sockett = socketStore();
      let res;

      sockett.connectToSocket();  

      try {
        res = await axios.get(`talk/suggested-popular?apiKey=${apiKey}`)
        this.suggestedTalks = res.data.suggestedTalks;
        this.popularTalks = res.data.popularTalks;
      } catch (error) {
        if (error.response.data.message === 'Unable to verify token') {
          auth.signOut()
          localStorage.clear()
          this.$router.push({ name: 'Auth' });
          return;
        }
      }

      const auth = authStore();
      const uid = localStorage.getItem('uid');
      this.uid = uid;
      
      const token = localStorage.getItem('token');

      if (token) {
        // auth.loggedIn();
        let profile;
        try {
          profile = await axios.get(`/profile?apiKey=${apiKey}`)
        } catch (error) {

          this.$toast.error('An error occured. Please try again later.');

          if (error.response.data.message === 'Unable to verify token') {
            auth.signOut()
            localStorage.clear()
            this.$router.push({ name: 'Auth' });
            return;
          }
          return;
        }
        this.user = profile.data;
      }
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
      },
      thisRoute() {
        return this.$route.name;
      }
    },
    watch: {
      ImageModalOpen() {
        this.showImage = !this.showImage;
      },
    },
    components: { SideMenu, TopBar, Suggestions, BottomMenu, ImageModal, PreLoader },
}
</script>

<style scoped>
.container-fluid {
  max-width: 1366px;
}
.disappear {
  animation: disappear 1s cubic-bezier(0.645,0.045,0.355,1) 2s forwards;
}
@keyframes disappear {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
.sugg {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.side-menu {
  padding: 0;
}
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
  .sugg {
    display: none;
  }
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