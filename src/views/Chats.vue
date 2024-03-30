<template>
    <div class="container">
        <div class="head no-results mb-4">
            <h3>Chats</h3>
        </div>
        <PageLoader :color="color" :height="20" :width="20" v-if="chats === null" class="mt-5" />

        <div v-if="chats">
            <div class="no-results mt-3 mb-3" v-if="chats.length == 0">
                <p class="mb-0">No chats to display...</p>
            </div>
        </div>

        <SingleChat v-for="chat in chats" :key="chat.id" @click="seen" :chat="chat" />
    </div>
</template>

<script>
import axios from 'axios';
import PageLoader from '../components/PageLoader.vue';
import SingleChat from '../components/SingleChat.vue';

export default {
    name: ' Chats',
    data() {
        return {
            chats: null,
            color: 'FFF',
            loading: false,
        }
    },
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;
        let res;

        try {
            res = await axios.get(`/chats?apiKey=${apiKey}`)
        } catch (error) {
            console.log(error);
        }

        // if (localStorage.getItem('chats')) {
        //     this.chat = JSON.parse(localStorage.getItem('chats'))
        // } else {
        //     this.chats = res.data.chats;
        //     localStorage.setItem('chats', JSON.stringify(res.data.chats));
        // }
        this.chats = res.data.chats;
    },
    methods: {
        seen() {
            return;
        }
    },
    components: { PageLoader, SingleChat }
}
</script>

<style scoped>
@media (max-width: 768px) {
    .head {
        display: none;
    }
}
</style>