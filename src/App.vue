<template>
  <div class="container-fluid main-fluid">
    <TopBar  v-show="!emptyScreen" :currentUser="user" />
    <BottomMenu  v-if="!emptyScreen" />
    <div class="row main-row">
      <div class="col-lg-2 col-md-1 side-menu">
        <SideMenu  v-if="!emptyScreen" />
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
        <Suggestions class="pad"  v-if="!emptyScreen"/>
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

export default {
    name: "App",
    async created() {
      const apiKey = import.meta.env.VITE_API_KEY;

      const auth = authStore();
      const uid = localStorage.getItem('uid');
      this.uid = uid;
      
      const token = localStorage.getItem('token');

      if (token) {
        auth.loggedIn();
        const profile = await axios.get(`/profile?apiKey=${apiKey}`)
        this.user = profile.data;
        // auth.getCurrentUser();

        // this.user = auth.user;
      }
    },
    data() {
      return {
        user: null,
        uid: null,
        showImage: false,
      }
    },
    computed: {
      emptyScreen() {
        return this.$route.name === 'Auth' || this.$route.name === 'SignUp' ||
        this.$route.name === 'SignIn'
      },
      ImageModalOpen() {
        const post = postStore();

        return post.ImageModalIsOpen
      }
    },
    watch: {
      ImageModalOpen() {
        this.showImage = !this.showImage;
      }
    },
    components: { SideMenu, TopBar, Suggestions, BottomMenu, ImageModal }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
  position: relative;
}

*::-webkit-scrollbar {
  width: 0.3em;
}
 
*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #01BAEF;
  outline: 1px solid #01BAEF;
}
body {
  background-color: #222222;
  color: #FFF;
  font-family: 'Space Grotesk', sans-serif;
  /* overflow-x: hidden; */
}
p {
  font-size: 0.9rem;
}
/* div.col-lg-3.col-md-3.col-sm-3 {
  padding: 0;
} */
.subtext {
  font-size: 0.7rem;
  color: #A9A9A9;
}
.pad {
  padding-top: 6rem;
}
.circular {
    width: 40px;
    height: 40px;
    background-color: #000000;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
}
.circular img {
    /* max-width: 100%;
    max-height: 100%; */
    width: 100%;
    height: 100%;
    /* position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%); */
    object-fit: cover;
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