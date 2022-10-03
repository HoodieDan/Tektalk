<template>
  <div class="container-fluid main-fluid">
    <TopBar  v-show="!emptyScreen" />
    <BottomMenu  v-if="!emptyScreen" />
    <div class="row">
      <div class="col-lg-2 col-md-1 side-menu">
        <SideMenu  v-if="!emptyScreen" />
      </div>
      <div class="col-lg-7 col-md-11">
        <router-view class="pad" v-slot="{ Component }" >
          <transition name="fade" mode="out-in">
            <component :is="Component" ></component>
          </transition>
        </router-view>
      </div>
      <div class="col-lg-3 col-0">
        <Suggestions class="pad"  v-if="!emptyScreen"/>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
import TopBar from './components/TopBar.vue';
import Suggestions from './components/Suggestions.vue';
import BottomMenu from './components/BottomMenu.vue';
export default {
    name: "App",
    computed: {
      emptyScreen() {
        return this.$route.name === 'Auth' || this.$route.name === 'SignUp' ||
        this.$route.name === 'SignIn'
      }
    },
    components: { SideMenu, TopBar, Suggestions, BottomMenu }
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
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
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