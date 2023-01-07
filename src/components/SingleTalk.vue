<template>
    <div class="talk w-100 pb-0">
        <router-link :to="{ name: 'Talk', params: { talk: talk.name } }" class="light no-underline">
            <div class="row p-2">
                <div class="image col-4">
                    <img :src="talk.displayUrl" alt="talk image">
                </div>
                <div class="text col-8 pt-1 pb-1">
                    <h6 class="text-gradient" >{{ talk.name }}</h6>
                    <p class="mb-2"	>{{ talk.description }}</p>
                    <div class="row">
                        <div class="col-lg-12 col-6 d-flex">
                            <router-link :to="{ name: 'Profile', params: { username: user.username } }" class="circular mb-2" v-for="(user, i) in talk.users" :key="i">
                                <img :src="user.displayUrl" alt="member image" v-if="user.displayUrl !== null">
                                <img
                                    src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" 
                                    alt="profile image" 
                                    v-else
                                >
                            </router-link>
                        </div>
                        <div class="col-lg-12 col-6">
                            <button class="talk-btn w-100 light" v-if="!talk.memberOf" @click.self.prevent="join(talk)" :disabled="loading" v-motion-pop >
                                <p class="mb-0" v-if="!loading" @click.self.prevent="join(talk)" v-motion-pop >Join</p>
                                <PageLoader :color="color" :height="15" :width="15" v-motion-pop v-else />
                            </button>
                            <button class="talk-outline-btn light w-100" @click.self.prevent="leave(talk)" :disabled="loading" v-motion-pop v-else >
                                <p class="mb-0" v-if="!loading" @click.self.prevent="leave(talk)" v-motion-pop >Leave</p>
                                <PageLoader :color="color" :height="15" :width="15" v-motion-pop v-else />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios';
import PageLoader from './PageLoader.vue';
export default {
    name: "SingleTalk",
    props: ["talk"],
    data() {
        return {
            color: "FFF",
            loading: false,
        };
    },
    methods: {
        async join(talk) {
            if (!localStorage.getItem('token')) {
                this.$router.push({ name: 'Auth' })
                return;
            }
            this.loading = true;
            const apiKey = import.meta.env.VITE_API_KEY;
            let res;

            try {
                res = await axios.put(`talk/join?apiKey=${apiKey}&talkId=${talk.id}`)
            } catch (error) {
                this.loading = false;
                this.talk.memberOf = true;
                this.$toast.error(error.message);
                return;
            }
            this.loading = false;
            this.talk.memberOf = true;
            this.$toast.success(res.data.message);
            this.$emit('join', talk);
        },
        async leave(talk) {
            if (!localStorage.getItem('token')) {
                this.$router.push({ name: 'Auth' })
                return;
            }
            this.loading = true;
            const apiKey = import.meta.env.VITE_API_KEY;
            let res;

            try {
                res = await axios.patch(`talk/leave?apiKey=${apiKey}&talkId=${talk.id}`)
            } catch (error) {
                this.loading = false;
                this.talk.memberOf = true;
                this.$toast.error(error.response.data.message);
                return;
            }
            this.loading = false;
            this.talk.memberOf = false;
            this.$toast.success(res.data.message);
            this.$emit('leave', talk);
        }
    },
    components: { PageLoader }
}
</script>

<style scoped>
div.talk {
    background-color: #000;
    border-radius: 5px;
}
.talk:hover {
    background-color: #191919;
}
/* div.image {
    width: 100%;
    height: 100%;
} */
.image img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    /* max-height: 400px; */
}
div.circular {
    width: 25px;
    height: 25px;
}
div.text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.talk-btn,
.talk-outline-btn {
    height: 2rem;
}
@media (max-width: 575px) {
    /* .row > * {
        padding-right: 1rem;
    } */
    /* .mb-2 {
        margin-right: 0.25rem;
    } */
}
</style>