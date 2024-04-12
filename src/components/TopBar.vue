<template>
  <div class="top-bar fade-in fixed-top">
    <!-- desktop topbar  -->
    <div class="row desktop container-fluid">
        <div class="col-lg-2 col-md-2">
            <div class="logo-group d-flex">
                <h3 class="logo-text">Tt</h3>
                <h3 class="logo">TekTalk.</h3>
            </div>
        </div>
        <div class="col-lg-8 col-md-6 col-sm-6 search-div">
            <div class="search">
                <i class="fa-solid fa-magnifying-glass icon"></i>
                <input type="text" class="input field" placeholder="Find User" v-model="query" />
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6 ms-auto" v-if="currentUser === null" >
            <div class="d-flex justify-content-around align-items-center me-0 pe-0">
                <ImageSkeleton :width='25' :height='25' />
                <ImageSkeleton :width='25' :height='25' />
                <ImageSkeleton :width='40' :height='40' />
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6 ms-auto" v-else >
            <div class="d-flex icons">
                <router-link :to="{ name: 'Chats'}" class="light no-underline pe-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16" v-if="(currentRoute !== 'Chats')">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16" v-else>
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                    </svg>
                </router-link>
                <router-link :to="{ name: 'Notifications' }" class="light no-underline pe-4 right-border" @click="read" >
                    <div class="dot" v-if="currentUser.unreadNotifications === true" ></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16" v-if="currentRoute !== 'Notifications'">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16" v-else>
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
                    </svg>
                </router-link>
                <router-link :to="{name: 'Profile', params: { username: currentUser.username }}" class="circular ms-4">
                    <img :src="currentUser.displayUrl" alt="user.name" v-if="currentUser.displayUrl">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </router-link>
            </div>
        </div>
    </div>

    <!-- mobile top bar -->
    <div class="row mobile fade-in" v-if="currentRoute !== 'Chat'">
        <router-link :to="{name: 'Home'}" class="col-2 no-underline d-flex align-items-center">
            <h3 class="logo-text mb-0">Tt</h3>
        </router-link>
        <div class="col-5 d-flex align-items-center route">
            <h6 class="mb-0">{{ currentRoute }}</h6>
        </div>
        <div class="col-3 d-flex mobile-icons right-border" v-if="currentUser !== null">
            <router-link :to="{ name: 'Chats' }" class="light no-underline pe-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send fai" viewBox="0 0 16 16" v-if="currentRoute !== 'Chats'">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16" v-else>
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                </svg>
            </router-link>
            <router-link :to="{ name: 'Notifications' }" class="light no-underline" @click="read" >
                <div class="dot" v-if="currentUser.unreadNotifications === true" ></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell fai" viewBox="0 0 16 16" v-if="currentRoute !== 'Notifications'">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16" v-else>
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
                </svg>
            </router-link>
        </div>
        <div class="col-5 ms-auto" v-if="loggedIn === false">
            <router-link :to="{ name: 'Auth' }" class="talk-btn no-underline light fade-in-pro">
                <p class="mb-0 navi no-hover"><i class="fa fa-solid fa-arrow-right-to-bracket light"></i> <span>Log In</span></p>
            </router-link>
        </div>
        <div class="col-5 d-flex justify-content-between align-items-center" v-if="((currentUser === null) && (loggedIn === true))">
            <ImageSkeleton :width='25' :height='25' />
            <ImageSkeleton :width='25' :height='25' />
            <ImageSkeleton :width='30' :height='30' />
        </div>
        <div class="col-2" v-if="currentUser !== null" >
            <router-link :to="{name: 'Profile', params: { username: currentUser.username }}">
                <div class="circular">
                    <img :src="currentUser.displayUrl" alt="gorgeous" v-if="currentUser.displayUrl">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </div>
            </router-link>
        </div>
    </div>
    <div class="row fade-in mobile" v-else>
        <div class="col-2">
            <i class="fa-solid fa-arrow-left" @click="goBack"></i>
        </div>
        <div class="col-3" v-if="chat !== null">
            <router-link :to="{name: 'Profile', params: { username: chat.username }}">
                <div class="circular">
                    <img :src="chat.displayUrl" alt="gorgeous" v-if="chat.displayUrl">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </div>
            </router-link>
        </div>
        <div class="col-7" v-if="chat !== null">
            <div class="user-details">
                    <div class="d-flex align-items-center">
                        <router-link :to="{name: 'Profile', params: { username: chat.username }}" class="mb-0 light no-underline light name" :class="{ 'me-2': !chat.isVerified }">{{ chat.name }}</router-link>
                        <div class="badge" v-if="chat.isVerified">
                            <svg
                                width="17px"
                                height="17px"
                                fill="#d9d9d9"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                aria-label="Verification badge"
                                class="
                                r-jwli3a
                                r-4qtqp9
                                r-yyyyoo
                                r-1xvli5t
                                r-9cviqr
                                r-f9ja8p
                                r-og9te1
                                r-bnwqim
                                r-1plcrui
                                r-lrvibr
                                "
                            >
                                <g>
                                <path
                                    d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
                                />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <p class="subtext text-gradient mb-0">@{{ chat.username }}</p>
                </div>
        </div>
    </div>
  </div>
</template>

<script>
import ImageSkeleton from './ImageSkeleton.vue';
import { authStore } from '../stores/auth.js'
import { chatStore } from '../stores/chat'
import axios from 'axios';

export default {
    name: 'TopBar',
    mounted() {
        if (localStorage.getItem('token')) {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }
    },
    data() {
        return {
            query: '',
            loggedIn: null,
            chat: null,
            prevRoute: null,
        }
    },
    methods: {
        changeSound() {
            this.sound = !this.sound
        },
        read() {
            this.$emit('read');
        },
        goBack() {
            this.$router.push(this.prevRoute);
        }
    },
    computed: {
        currentRoute() {
            return this.$route.name;
        },
        chatRoute() {
            return this.$route.params.id;
        }
    },
    watch: {
        async currentRoute(newVal) {
            const chatt = chatStore();
            const apikey = import.meta.env.VITE_API_KEY;
            let res;

            if (newVal == 'Chat') {
                this.prevRoute = chatt.prevRoute;
                if (chatt.user) {
                    this.chat = JSON.parse(JSON.stringify(chatt.user));
                } else {
                    try {
                        res = await axios.get(`profile/id/${this.$route.params.id}?apiKey=${apikey}`)
                    } catch (error) {
                        return;
                    }

                    this.chat = {
                        ...res.data,
                        'isVerified': res.data.verified,
                    }
                }
            }
        }
    },
    props: ['currentUser'],
    components: { ImageSkeleton }
}
</script>

<style scoped>
/* .circular {
    border: 1px solid #A9A9A9;
} */
.container-fluid.row.desktop {
    margin-left: 0;
    padding-left: 0;
    position: relative;
}
.container.row.desktop .col-lg-2:nth-of-type(1) {
    position: relative;
    right: 6rem;
}
.logo-group {
    align-items: center;
    font-family: 'Poppins', sans-serif;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    height: 100%;
}
.logo {
    margin-bottom: -0.1rem;
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
.route {
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
div.no-underline.light {
    position: relative;
}
.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #20BF55;
    position: absolute;
    z-index: 10;
}
svg:hover {
    fill: #FFF;
    color: #FFF;
}
h4 {
    font-weight: 700;
}
.top-bar {
   /* position: fixed; */
   width: 100%;
   padding: 1rem 1rem 1rem 0;
   background-color: #000;
   /* z-index: 1000; */
   display: flex;
   justify-content: center;
}
.desktop.container,
.col-sm-6.ms-auto {
    padding-right: 0;
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
    justify-content: flex-end;
    align-items: center;
}
.right-border {
    border-right: 1px solid rgba(255, 255, 255, 0.3);
}
.fai {
    transition: all .3s ease;
}
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
    align-items: center;
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
        display: block;
    }
    .col-10 h4, 
    .logo-text {
        font-weight: 700;
    }
    .circular {
        width: 30px;
        height: 30px;
    }
    .circular {
        width: 2.5rem;
        height: 2.5rem;
    }
}
@media (max-width: 500px) {
    .name {
        font-size: 0.8rem;
        margin-right: 0 !important;
    }
    .subtext {
        font-size: 0.6rem;
    }
}
@media (max-width: 300px) {
    .navi.no-hover span {
        display: none;
    }
}
</style>