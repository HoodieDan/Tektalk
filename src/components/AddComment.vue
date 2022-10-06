<template>
  <div class="">
    <div class="post-box">
        <div class="row">
            <router-link :to="{name: 'Profile', params: { username: user.username }}" class="col-lg-1 col-md-1 col-sm-2 col-2">
                <div class="circular">
                    <img :src="user.displayUrl" alt="handsome" v-if="user.displayUrl !== null" >
                    <img
                        src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png"
                        alt="profile image" 
                        v-else
                    >
                </div>
            </router-link>
            <div class="col-lg-11 col-md-11 col-sm-10 col-10 form">
                <div class="row w-100">
                    <div class="col-8 ">
                        <textarea name="status" id="status" :class="{ 'stop-typing': tooLong }" rows="2" placeholder="Drop a comment?"
                        v-model="status"></textarea>
                    </div>
                    <div class="col-4 buttons">
                        <button class="talk-btn" @click="comment()" :disabled="loading" >
                            <p class="other-talks" v-if="loading" >Share</p>
                            <PageLoader :color="color" :height="20" :width="20" v-motion-pop v-else />
                        </button>
                    </div>
                </div>
                <p class="subtext text-gradient" v-if="comment_message !== ''" >{{ comment_message }}</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import PageLoader from '../components/PageLoader.vue'
import axios from 'axios';

export default {
    name: 'AddComment',
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;
        
        const profile = await axios.get(`/profile?apiKey=${apiKey}`)
        this.user = profile.data;
    },
    data() {
        return {
            status: '',
            user: null,
            color: 'FFF',
            loading: false,
            commentBody: '',
            comment_message: ''
        }
    },
    computed: {
        tooLong() {
            return this.status.length >= 140
        }
    },
    methods: {
        async comment() {
            this.loading = true;
            const apiKey = import.meta.env.VITE_API_KEY;
        
            if (this.commentBody.length > 0) {
                const comment = await axios.post(`/comment?apiKey=${apiKey}`, {
                    postId: this.postId,
                    body: this.commentBody
                });

                if (comment.data.status === 200) {
                    this.comment_message = 'Comment Posted!';
                    this.loading = false;
                } else {
                    this.comment_message = 'An error occured, please try again later!';
                    this.loading = false;
                }
            } else {
                this.loading = false;
                return;
            }
        }
    },
    props: ['postId'],
    components: { PageLoader }
}
</script>

<style scoped>
div.post-box {
    width: 100%;
    background-color: #000;
    padding: 1.5rem 1rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
}
div.form {
    display: flex;
    align-items: center;
}
div.form > *, div.buttons > * {
    margin-right: 0.5rem;
}
textarea {
    background: transparent;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    border: none;
    width: 100%;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    resize: none;
}
textarea:focus {
    outline-style: none;
}
.stop-typing {
    pointer-events: none;
}
.talk-btn {
  padding: 0.5rem 2rem;
}
.other-talks {
  margin: 0;
}
div.attached {
    display: flex;
    align-items: center;
}
</style>