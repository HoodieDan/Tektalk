<template>
  <div class="bottom-menu">
    <div class="route">
        <router-link :to="{ name: 'Home' }"><i class="fa fa-solid fa-house"></i></router-link>
    </div>
    <div class="route">
        <router-link :to="{ name: 'Talks' }"><i class="fa fa-solid fa-chart-line"></i></router-link>
    </div>
    <div class="route">
        <router-link :to="{ name: 'Home' }"><i class="fa fa-regular fa-address-book"></i></router-link>
    </div>
    <div class="route">
        <router-link :to="{ name: 'Settings' }"><i class="fa fa-solid fa-gear"></i></router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bottom-menu {
   position: fixed;
   width: 100%;
   padding-top: 0.5rem;
   padding-bottom: 0.5rem;
   background-color: #000;
   z-index: 1000;
   bottom: 0;
   display: flex;
   justify-content: space-evenly;
}
.fa {
    color: #e7e9ea;
}
@media (min-width: 769px) {
    .bottom-menu {
        display: none;
    }
}
</style>