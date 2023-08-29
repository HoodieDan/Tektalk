<template>
<div class="container p-0">
    <div class="user" @click="selectUser(chat)">
        <div class="row w-100">
            <router-link :to="{name: 'Profile', params: { username: chat.username }}" class="col-2">
                <div class="circular" >
                    <img :src="chat.displayUrl" alt="handsome" v-if="chat.displayUrl">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </div>
            </router-link>
            <router-link :to="{name: 'Chat', params: { id: chat.id }}" class="col-10 chat-link no-underline row">
                <div class="user-details col-lg-11 col-10">
                    <div class="d-flex align-items-center">
                        <router-link :to="{name: 'Chat', params: { id: chat.id }}" class="mb-0 light no-underline light name me-2">{{ chat.name }}</router-link>
                        <div class="badge ps-0" v-if="chat.isVerified">
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
                        <p class="mb-0 time" :class="{ 'unseen': chat.unread }"> · {{ timePosted }}</p>
                    </div>
                    <!-- <p class="subtext text-gradient">@{{ user.username }}</p> -->
                    <p class="last mb-0" :class="{ 'unseen': chat.unread > 0 }">
                        <!-- <i class="fa-solid fa-envelope-circle-check"></i> -->
                        <i class="fa-solid fa-check no-hover" v-if="chat.status == 'sender'"></i>
                        {{ trimmedText }}
                        <span v-if="textlength">...</span>
                        <span v-if="imageWithNoCaption">image</span>
                    </p>
                </div>

                <div class="col-lg-1 col-2">
                    <div class="dot" v-if="chat.unread > 0" >
                        <p class="subtext mb-0 unread">{{ chat.unread }}</p>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import PageLoader from '../components/PageLoader.vue';
import axios from 'axios';
import { authStore } from '../stores/auth';
import { chatStore } from '../stores/chat';

export default {
    name: 'user',
    data() {
        return {
            loggedInUser: null,
            color: 'FFF',
        }
    },
    mounted() {
        const auth = authStore();
        this.loggedInUser = auth.user;
    },
    methods: {
        selectUser(user) {
            const chat = chatStore();
            chat.setUser({
                ...user
            })
        }
    },
    computed: {
        timePosted() {
            const date = new Date().toString();
            const currentTime = date.slice(16,21);
            const day = date.slice(4,15);
            const dayPosted = this.chat.time.slice(4,15);
            const dayAndMonth = this.chat.time.slice(4, 11)

            let time;

            if (this.chat.time) {
                time = this.chat.time.slice(16,21);
            }
            if (time === currentTime) {
                return 'now'
            } else if (day === dayPosted) {
                return time;
            } else {
                return dayAndMonth;
            }
        },
        imageWithNoCaption() {
            return (this.chat.imagesUrl.length > 0) && (this.chat.text.length === 0)
        },
        trimmedText() {
            const width = window.innerWidth;
            if (width > 1365) {
                return this.chat.text.slice(0, 60);
            } else if (width > 1140) {
                return this.chat.text.slice(0, 50);
            } else if (width > 768) {
                return this.chat.text.slice(0, 40);
            } else if (width > 468) {
                return this.chat.text.slice(0, 30);
            } else {
                return this.chat.text.slice(0, 22)
            }
        },
        textlength() {
            const width = window.innerWidth;
            if (width > 1365) {
                return this.chat.text.length > 60;
            } else if (width > 1140) {
                return this.chat.text.length > 50;
            } else if (width > 992) {
                return this.chat.text.length > 40;
            } else if (width > 400) {
                return this.chat.text.length > 30;
            } else {
                return this.chat.text.length > 22;
            }
        }
    },
    props: ['chat'],
    components: { PageLoader },
}
</script>

<style scoped>
div.user {
    width: 100%;
    background-color: #000;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    cursor: pointer;
}
.user:hover {
    background-color: #191919;
}
.circular {
    border: 1px solid #A9A9A9;
}
.last {
    color: #7c7c7c;
}
p.time {
    color: #7c7c7c;
    font-size: 0.8rem;
}
.no-hover {
    background-color: transparent;
}
.unseen {
    color: #FFF !important;
}
.chat-link {
    position: relative;
}
.fa-check, .fa-envelope-circle-check {
    padding: 0 0.5rem 0 0;
}
.dot {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: #01BAEF;
    /* position: absolute;
    right: 0;
    bottom: 0.4rem; */
    display: flex;
    justify-content: center;
    align-items: center;
    left: 1rem;
    top: 1rem;
    padding: 0.6rem;
    z-index: 10;
    aspect-ratio: 1/1;
}
.unread {
    color: #000;
    font-weight: 700;
    padding: 0.3rem;
}
@media (max-width: 500px) {
    .button-div {
        padding-left: 0;
    }
    .name {
        font-size: 0.8rem;
    }
    .subtext {
        font-size: 0.6rem;
    }
    .foll {
        font-size: 0.6rem;
    }
}
</style>