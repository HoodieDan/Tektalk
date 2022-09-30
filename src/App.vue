<template>
  <div class="main">
        <TopBar />
    <div class="row">
      <div class="col-lg-2 col-md-1 col-sm-1">
        <SideMenu />
      </div>
      <div class="col-lg-10 col-md-11 col-sm-11">
        <router-view class="pad" />
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
import TopBar from './components/TopBar.vue';
export default {
    name: "App",
    components: { SideMenu, TopBar }
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
body {
  background-color: #222222;
  color: #FFF;
  font-family: 'Space Grotesk', sans-serif;
}
.pad {
  padding-top: 6rem;
}
</style>