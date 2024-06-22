<template>
    <div class="menu fade-in">
        <div class="nav-group">
            <!-- <div class="logo-group d-flex">
                <h3 class="logo-text">Tt</h3>
                <h3 class="logo">TekTalk.</h3>
            </div> -->
            <div class="top-nav">
                <div class="link home">
                    <router-link to="/" class="navi" :class="{ 'active': currentRoute === 'Home' }" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-earmark-text me-3 ms-1" viewBox="0 0 16 16">
                            <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                            <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                        </svg>
                        <span>Feed</span>
                    </router-link>
                </div>
                <div class="link dashboard">
                    <router-link :to="{ name: 'Talks' }" class="navi" :class="{ 'active': currentRoute === 'Talks' }" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-laptop me-3 ms-1" viewBox="0 0 16 16">
                            <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5"/>
                        </svg>
                        <span>Talks</span>
                    </router-link>
                </div>
                <div class="link calendar">
                    <router-link :to="{ name: 'Network' }" class="navi" :class="{ 'active': currentRoute === 'Network' }" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-people me-3 ms-1" viewBox="0 0 16 16">
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                        </svg>
                        <span>Network</span>
                    </router-link>
                </div>
                <div class="link calendar">
                    <router-link :to="{ name: 'Events' }" class="navi" :class="{ 'active': currentRoute === 'Events' }" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-calendar2-event me-3 ms-1" viewBox="0 0 16 16">
                            <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
                            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        <span>Events</span>
                    </router-link>
                </div>
                <div class="link settings">
                    <router-link :to="{ name: 'Settings' }" class="navi" :class="{ 'active': currentRoute === 'Settings' }" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-gear me-3 ms-1" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                        </svg>
                        <span>Settings</span>
                    </router-link>
                </div>
            </div>
            <div class="mid">
                <h5 class="mb-2 head">Popular Talks</h5>
                <div v-if="popularTalks.length === 0">
                    <ItemSkeleton :height='30' :number='5' :margin='13' />    
                </div>
                <div class="talk" v-for="talk in popularTalks" :key="talk.id" v-else >
                    <div class="img-wrap">
                        <div class="circular me-2">
                            <img :src="talk.displayUrl" alt="talk image">
                        </div>
                    </div>
                    <div class="talk-name">
                        <router-link :to="{ name: 'Talk', params: { talk: talk.name } }" class="talk-group"><span>{{ talk.name }}</span></router-link>
                        <p class="members mb-1">{{ talk.memberCount }} members</p>
                    </div>
                </div>
                <div class="talk-btn mt-4">
                    <router-link :to="{ name: 'Talks' }" class="other-talks">Other talks</router-link>
                </div>
            </div>

            <div class="bottom-nav">
                <div class="link sign-out" @click.prevent="signOut" v-if="loggedIn">
                    <p class="navi">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-right me-2 ms-1" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                        </svg>
                        <span>Sign Out</span>
                    </p>
                </div>
                <router-link :to="{ name: 'Auth' }" class="talk-btn no-underline light mb-2 mt-2" v-else>
                    <p class="mb-0 navi no-hover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-left me-2 ms-1" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                        </svg>
                        <span>Log In</span>
                    </p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { authStore } from '../stores/auth';
import ItemSkeleton from './ItemSkeleton.vue';

export default {
    name: 'SideMenu',
    created() {
            
        if (localStorage.getItem('token')) {
            this.loggedIn = true;
        }
    },
    data() {
        return {
            loggedIn: false,
        }
    },
    methods: {
        signOut() {
            const auth = authStore();
            auth.signOut();
            localStorage.clear()

            this.$router.push({ name: 'Auth' })
        }
    },
    computed: {
        currentRoute() {
            return this.$route.name;
        }
    },
    components: { ItemSkeleton },
    props: [ 'popularTalks' ]
}
</script>

<style scoped>
h6 {
    font-weight: 600;
}
.menu {
    height: 100vh;
    /* min-height: 600px; */
    /* width: 16.67%;
    position: fixed; */
    position: sticky;
    left: 0;
    top: 0;
    background-color: #000;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    font-weight: 300;
    padding-bottom: 0;
    /* z-index: 1001; */
    /* overflow-y: initial !important;
    overflow-x: hidden; */
}
.nav-group {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    overflow-y: scroll;
}
.nav-group::-webkit-scrollbar {
    display: none;
}
.top-nav {
    margin-top: 5.5rem;
    padding-left: 1.5rem;
    /* margin-bottom: 2.5rem; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.mid {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.bottom-nav {
    margin-top: 2.5rem;
    border-top: 1px solid #222222;
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem 0 1.5rem;
}
/* .bottom-nav.link {
    margin: 0 auto;
} */
.fa {
    margin-right: 0.5rem;
}
.link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    margin-bottom: 1.5rem;
    transition: all 0.5s;
}
.link:hover, .navi:hover, .talk-group:hover {
    color: #01BAEF;
}
.navi {
    font-weight: 600;
    font-size: 0.8rem;
    text-decoration: none;
    color: #e7e9ea;
    transition: all 0.5s;
    display: flex;
    align-items: center;
}
.sign-out .navi {
    align-items: flex-end;
}
.talk-group {
    font-size: 0.7rem;
    text-decoration: none;
    color: #e7e9ea;
    margin-bottom: 0.7rem;
    transition: all 0.5s;
}
.talk {
    display: flex;
    margin-top: 0.3rem;
}
.img-wrap {
    display: flex;
    align-items: center;
}
.circular {
    border: 1px solid #A9A9A9;
    width: 25px;
    height: 25px;
}
.members {
    font-size: 0.7rem;
    color: #A9A9A9;
}
.head {
    font-size: 0.9rem;
    color: #FFF;
}

.sign-out {
    align-self: center !important;
    margin-bottom: 0
}
.talk-btn.no-underline {
    height: auto;
}
@media (max-width: 992px) {
    .menu {
        padding: 0.7rem 0.7rem 0;
    }
    div.talk-name,
    .head,
    .talk-btn {
        display: none;
    }
    .logo-group {
        padding-left: 1rem;
    }
    .talk {
        margin: 1rem auto;
    }
    .navi span {
        display: none;
    }
    .top-nav,
    .bottom-nav,
    .mid {
        display: flex;
        flex-direction: column;
        justify-items: center;
        padding-left: 0;
        padding-right: 0;
        align-items: center;
    }
    .bottom-nav {
        padding: 1rem 0;
    }
    .fa {
        width: 2rem;
    }
    h3.logo {
        display: none;
    }
    .navi {
        margin-bottom: auto;
    }
}
/* @media (max-height: 650px) {
    .logo-group {
        align-items: flex-end;
    }
    .logo-text {
        position: relative;
        top: 0.5rem;
    }
    .logo {
        padding-bottom: 0.1rem;
    }
    .mid {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    p {
        margin-bottom: 0.5rem;
    }
    p.members {
        display: none;
    }
} */
/* @media (min-height: 900px) {
    .mid > * {
        margin-bottom: 1rem;
    }
} */
</style>