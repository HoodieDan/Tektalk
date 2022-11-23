<template>
  <div class="bottom-menu">
    <div class="route">
        <router-link :to="{ name: 'Home' }"><i class="fa fa-solid fa-house" :class="{ 'active': currentRoute === 'Home' }" ></i></router-link>
    </div>
    <div class="route">
        <router-link :to="{ name: 'Talks' }"><i class="fa fa-solid fa-chart-line" :class="{ 'active': currentRoute === 'Talks' }" ></i></router-link>
    </div>
    <div class="route">
        <router-link :to="{ name: 'Network' }"><i class="fa fa-solid fa-users" :class="{ 'active': currentRoute === 'Network' }" ></i></router-link>
    </div>
    <div class="route">
        <router-link :to="{ name: 'Events' }"><i class="fa fa-regular fa-address-book" :class="{ 'active': currentRoute === 'Events' }" ></i></router-link>
    </div>
    <div class="route">
        <router-link :to="{ name: 'Settings' }"><i class="fa fa-solid fa-gear" :class="{ 'active': currentRoute === 'Settings' }" ></i></router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BottomMenu',
    computed: {
        currentRoute() {
            return this.$route.name;
        }
    }
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
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
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