<template>
  <div class="top-bar fade-in">
    <!-- desktop topbar  -->
    <div class="row desktop">
        <div class="col-lg-8 col-md-8 col-sm-6 search-div">
            <div class="search">
                <i class="fa-solid fa-magnifying-glass icon"></i>
                <input type="text" class="input field" placeholder="Explore" v-model="query" />
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6 ms-auto" v-if="currentUser !== null" >
            <div class="d-flex icons">
                <i class="fai fa-regular fa-paper-plane"></i>
                <i class="fai fa-regular fa-bell"></i>
                <router-link :to="{name: 'Profile', params: { username: currentUser.username }}" class="circular">
                    <img :src="currentUser.displayUrl" alt="user.name" v-if="currentUser.displayUrl">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </router-link>
            </div>
        </div>
    </div>

    <!-- mobile top bar -->
    <div class="row mobile fade-in">
        <router-link :to="{name: 'Home'}" class="col-2 no-underline d-flex align-items-center">
            <h3 class="logo-text mb-0">Tt</h3>
        </router-link>
        <div class="col-5 d-flex align-items-center">
            <h4 class="mb-0">{{this.$route.name}}</h4>
        </div>
        <div class="col-3 d-flex mobile-icons" v-if="currentUser !== null">
            <i class="fai fa-regular fa-paper-plane"></i>
            <i class="fai fa-regular fa-bell"></i>
        </div>
        <div class="col-5 ms-auto" v-else>
            <router-link :to="{ name: 'Auth' }" class="talk-btn no-underline light fade-in-pro">
                <p class="mb-0 navi no-hover"><i class="fa fa-solid fa-arrow-right-to-bracket light"></i> <span>Log In</span></p>
            </router-link>
        </div>
        <div class="col-2" v-if="currentUser !== null">
            <router-link :to="{name: 'Profile', params: { username: currentUser.username }}">
                <div class="circular">
                    <img :src="currentUser.displayUrl" alt="gorgeous" v-if="currentUser.displayUrl">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </div>
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'TopBar',
    // mounted() {
    //     this.getUser()
    // },
    data() {
        return {
            // currentUser: null,
            query: ''
        }
    },
    methods: {
        changeSound() {
            this.sound = !this.sound
        },
        // async getUser() {
        //     const apiKey = import.meta.env.VITE_API_KEY;

        //     if (localStorage.getItem('token')) {
        //         const profile = await axios.get(`/profile?apiKey=${apiKey}`)
        //         this.currentUser = profile.data;
        //     } else {
        //         return;
        //     }
        // }
    },
    props: ['currentUser']
}
</script>

<style scoped>
h4 {
    font-weight: 700;
}
.top-bar {
   position: fixed;
   width: 100%;
   padding: 1rem 1rem 1rem 16.67%;
   background-color: #000;
   z-index: 1000;
}
.row {
    margin: 0;
}
.search-div {
    display: flex;
    align-items: center;
}
.search i {
    position: absolute;
    bottom: -1px;
}  
.search i:hover {
    background-color: transparent !important;
}
.search {
    width: 100%;
    /* margin-bottom: 0.6rem; */
} 
.icon {
    padding-top: 12px;
    padding-left: 10px;
    min-width: 2.3rem;
    z-index: 10;
    color: #999999;
}   
.input-field {
    padding: 10px;
    text-align: center;
}
input[type='text'] {
    background: #222222;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    border: none;
    border-radius: 32px;
    height: 2rem;
    padding-left: 2.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    width: 100%;
}
input:focus {
    outline-style: 1px solid linear-gradient(to right, #20BF55, #01BAEF);
}
.icons {
    justify-content: space-between;
    align-items: center;
}
/* .fai {
    cursor: pointer;
    transition: all 0.5s;
} */
.fai:hover {
    color: #01BAEF;
}
.mobile {
    display: none;
}
.mobile > * {
    display: none;
}
.col-2.no-underline {
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.logo-text {
    animation: right-slide 1s cubic-bezier(0.645,0.045,0.355,1) forwards;
}
.mobile-icons {
    justify-content: space-evenly;
}
.navi {
    font-weight: 700;
}
@media (min-width: 992px) {
    .desktop {
      display: flex !important;
    }
}
@media (max-width: 768px) {
    .desktop {
        display: none;
    }
    .mobile {
        display: flex !important;
    }
    .mobile > * {
        display: block;
    }
    .top-bar {
        padding: 1rem;
        backdrop-filter: blur(100px);
    }
    .col-10 h4, 
    .logo-text {
        font-weight: 700;
    }
    .circular {
        width: 30px;
        height: 30px;
    }
}
@media (max-width: 300px) {
    .navi.no-hover span {
        display: none;
    }
}
</style>