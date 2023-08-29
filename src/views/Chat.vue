<template>
    <div class="container chat-page">
        <div class="no-message" :class="{ 'h-100': messages.length == 0 }" v-if="messages">
            <div class="mt-3 mb-3" v-if="messages.length == 0">
                <p class="mb-0">No messages to display. Send this user a message to begin a chat.</p>
            </div>
        </div>
        <div class="heading row">
            <div class="col-2 d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-arrow-left-long back" @click="goBack()"></i>
            </div>
            <div class="col-10 d-flex flex-column justify-content-center align-items-center" v-if="user !== null">
                <router-link :to="{name: 'Profile', params: { username: user.username }}">
                    <div class="circular">
                        <img :src="user.displayUrl" alt="gorgeous" v-if="user.displayUrl">
                        <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                    </div>
                </router-link>
                <div class="d-flex align-items-end pt-1">
                    <router-link :to="{name: 'Profile', params: { username: user.username }}" class="mb-0 light no-underline light name" :class="{ 'me-2': !user.isVerified }">{{ user.name }}</router-link>
                    <div class="badge" v-if="user.isVerified">
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
            </div>
        </div>
        <div ref="chatContainer" class="chat-container" :class="{ 'file-chat-container': files > 0 }">
            <PageLoader :color="color" :height="20" :width="20" v-if="loading" class="p-2" />
            <MessageComponent 
                v-for="message in messages" 
                :key="message.id" 
                :message="message" 
                :images="message.imagesUrl"
            />
            <div id="bottom-of-chat-container" class="bottom-of-chat-container"></div>
        </div>
        <div class="text-box" :class="{ 'file-text-box': files > 0 }">
            <TextBox @handle="noOfFiles" @sent="push" />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import TextBox from '../components/TextBox.vue'
import MessageComponent from '../components/Message.vue';
import { chatStore } from '../stores/chat';
import { socketStore } from '../stores/socket';
import PageLoader from '../components/PageLoader.vue';

export default {
    name: 'Chat',
    data() {
        return {
            messages: null,
            prevRoute: null,
            user: null,
            socket: null,
            connected: false,
            files: 0,
            color: 'FFF',
            loading: true,
        }
    },
    async beforeRouteEnter(to, from, next) {
        const chatt = chatStore();
        chatt.setPrevRoute(from);

        next((vm) => {
        });
    },
    async created() {
        const chatt = chatStore();
        const sockett = socketStore();
        const id = this.$route.params.id;
        const apiKey = import.meta.env.VITE_API_KEY;
        let res;
        let resp;

        if (chatt.user !== null) {
            this.user = chatt.user;
        } else {
            try {
                resp = await axios.get(`/profile/id/${id}?apiKey=${apiKey}`);
            } catch (error) {
                return;
            }
            this.user = {
                ...resp.data,
                'isVerified': resp.data.verified,
            }
        }
        this.prevRoute = chatt.prevRoute;

        try {
            res = await axios.get(`message/${id}?apiKey=${apiKey}`)
        } catch (error) {
            console.log(error);
            return;
        } finally {
            this.scrollToLastMessage();
        }
        this.loading = false;
        this.messages = res.data.messages;

        // websocket connection
        this.socket = sockett.socket;

        this.socket.emit( 'join' , { receiverId: id }, (response) => {
            console.log(response.status);
        })

        this.socket.on('onNewMessage', (event) => {
            this.messages.push(event)
        })

        this.socket.on('onDelete', (event) => {
            console.log(event);
            const deletedMessage = this.messages.find((message) => {
                return message.id === event.id;
            })
            const i = this.messages.indexOf(deletedMessage);
            this.messages.splice(1, 1);
        })

        this.scrollToLastMessage()
    },
    methods: {
        goBack() {
            this.$router.push(this.prevRoute);
        },
        sendMessage() {
            if (this.message.trim() !== '') {
                this.socket.send(this.message);
                this.message = '';
            }
        },
        isSender(text) {
            return text.status == 'sender';
        },
        scrollToLastMessage() {
            const bottom = document.querySelector('.bottom-of-chat-container');
            if (this.$refs.chatContainer) {
                this.$refs.chatContainer.scrollTop = bottom.offsetTop;
            }
        },
        noOfFiles(number) {
            this.files = number
        },
        push(message) {
            this.messages.push(message);
        }
    },
    computed: {
    },
    updated() {
        // whenever data changes and the component re-renders, this is called.
        this.$nextTick(() => this.scrollToLastMessage());
    },
    beforeRouteLeave (to, from, next) {
        const chatt = chatStore()
        chatt.setUser(null);
        next();
    },
    components: { TextBox, MessageComponent, PageLoader }
}
</script>
<style scoped>
.chat-page {
    height: 85vh;
    max-height: 85vh;
    background-color: #000;
    border-radius: 5px;
    position: relative;
    overflow-y: hidden !important;
    overflow-x: hidden;
}
.sender {
    align-self: flex-end !important;
}
.heading {
    height: 15%;
    font-weight: 600;
}
.chat-container {
    border-top: 1px solid #FFF;
    border-bottom: 1px solid #FFF;
    height: 75%;
    overflow-y: initial !important;
    overflow-x: hidden;
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
}
.file-chat-container {
    height: 40% !important;
}
.file-text-box {
    height: auto !important;
    /* position: absolute; */
}
.wrapper {
    padding-top: 0.5rem;
    padding-bottom: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.text-box {
    height: 10%;
    position: absolute;
    bottom: 0;
    width: 100%;
}
.no-message {
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
@media (min-width: 1601px) {
    .chat-page {
        height: 88vh;
        max-height: 88vh;
    }
}
@media (max-width: 768px) {
    .chat-page {
        height: 90vh;
        max-height: 90vh;
    }
    .heading {
        height: 0;
        display: none;
    }
    .chat-container {
        height: 92%;
        border-top: none;
    }
    .text-box {
        height: 8%;
    }
    .file-chat-container {
        height: 65% !important;
    }
}
@media (max-width: 400px) and (max-height: 750px) {
    .chat-container {
        height: 87%;
        border-top: none;
    }
    .text-box {
        height: 13%;
    }
}
@media (max-width: 400px) and (max-height: 500px) {
    .chat-container {
        height: 80%;
        border-top: none;
    }
    .text-box {
        height: 20%;
    }
}
</style>