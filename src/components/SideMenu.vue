<template>
    <div class="menu fade-in">
        <div class="nav-group">
            <div class="logo-group d-flex">
                <h3 class="logo-text">Tt</h3>
                <h3 class="logo">TekTalk.</h3>
            </div>
            <div class="top-nav">
                <div class="link home">
                    <router-link to="/" class="navi" :class="{ 'active': currentRoute === 'Home' }" ><i class="fa fa-solid fa-house"></i><span>Home</span></router-link>
                </div>
                <div class="link dashboard">
                    <router-link :to="{ name: 'Talks' }" class="navi" :class="{ 'active': currentRoute === 'Talks' }" ><i class="fa fa-solid fa-chart-line"></i><span>Talks</span></router-link>
                </div>
                <div class="link calendar">
                    <router-link :to="{ name: 'Network' }" class="navi" :class="{ 'active': currentRoute === 'Network' }" ><i class="fa fa-solid fa-users"></i><span>Network</span></router-link>
                </div>
                <div class="link calendar">
                    <router-link :to="{ name: 'Events' }" class="navi" :class="{ 'active': currentRoute === 'Events' }" ><i class="fa fa-regular fa-address-book"></i><span>Events</span></router-link>
                </div>
                <div class="link settings">
                    <router-link :to="{ name: 'Settings' }" class="navi" :class="{ 'active': currentRoute === 'Settings' }" ><i class="fa fa-solid fa-gear"></i><span>Settings</span></router-link>
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
                <div class="talk-btn mt-3">
                    <router-link :to="{ name: 'Talks' }" class="other-talks">Other talks</router-link>
                </div>
            </div>
            <div class="bottom-nav">
                <div class="link sign-out" @click.prevent="signOut" v-if="loggedIn">
                    <p class="navi"><i class="fa fa-solid fa-arrow-right-from-bracket"></i><span>Sign Out</span></p>
                </div>
                <router-link :to="{ name: 'Auth' }" class="talk-btn no-underline light mb-2 mt-2" v-else>
                    <p class="mb-0 navi no-hover"><i class="fa fa-solid fa-arrow-right-to-bracket light"></i> <span>Log In</span></p>
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
    z-index: 1001;
    overflow-y: initial !important;
    overflow-x: hidden;
}
.nav-group {
    overflow-y: auto;
}
.logo-group {
    align-items: center;
    font-family: 'Poppins', sans-serif;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    height: 10%;
    /* padding-bottom: 1rem; */
    padding-left: 1.5rem;
}
.logo {
    margin-bottom: -0.3rem;
}
.logo,
.logo-text {
    animation: right-slide 0.5s cubic-bezier(0.645,0.045,0.355,1) forwards;
}
.logo {
    font-weight: 700;
    font-size: 1rem;
    color: #e7e9ea;
}
.nav-group {
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
}
.top-nav {
    height: 30%;
    padding-left: 1.5rem;
    /* margin-bottom: 2.5rem; */
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.mid {
    height: 50%;
    padding-left: 1.5rem;
    padding-right: 2rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.bottom-nav {
    margin-top: 0.5rem;
    height: 10%;
    border-top: 1px solid #222222;
    display: flex;
    align-items: center;
    padding-left: 1.5rem;
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
    margin-bottom: 0.5rem;
    transition: all 0.5s;
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
    .mid {
        border-top: 1px solid #222222;
        padding-left: 0;
        align-items: center;
        padding-right: 0;
        margin-top: 1rem;
    }
    div.top-nav {
        padding-left: 0;
        align-items: center;
        margin-top: 1rem;
    }
    .talk {
        margin: 1rem auto;
    }
    .navi span {
        display: none;
    }
    .top-nav,
    .bottom-nav {
        display: flex;
        flex-direction: column;
        justify-items: center;
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
@media (max-height: 650px) {
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
}
@media (min-height: 900px) {
    .mid > * {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
}
</style>