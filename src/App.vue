<template>
  <div class="main">
        <TopBar />
    <div class="row">
      <div class="col-lg-2 col-md-1 col-sm-1">
        <SideMenu />
      </div>
      <div class="col-lg-7 col-md-8 col-sm-8">
        <router-view class="pad" />
      </div>
      <div class="col-lg-3 col-md-3 col-sm-3">
        <Suggestions class="pad" />
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
import TopBar from './components/TopBar.vue';
import Suggestions from './components/Suggestions.vue';
export default {
    name: "App",
    components: { SideMenu, TopBar, Suggestions }
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
  overflow-x: hidden;
}
p {
  font-size: 0.9rem;
}
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
</style>