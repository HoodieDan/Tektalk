<template>
  <div class="">
    <div class="post-box" v-if="user">
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
            <vee-form
             :validation-schema="schema"
             @submit="comment"
             class="col-lg-11 col-md-11 col-sm-10 col-10 form"
            >
                <div class="row w-100">
                    <div class="col-8 ">
                        <vee-field as="textarea" name="status" id="status" rows="2" placeholder="Drop a comment?"
                        v-model="status" ref="body"></vee-field>
                        <ErrorMessage name="status" class="subtext alert p-0" ></ErrorMessage>
                    </div>
                    <div class="col-4 buttons">
                        <button type="submit" class="talk-btn w-100" :disabled="loading" >
                            <p class="other-talks" v-if="!loading" >Share</p>
                            <PageLoader :color="color" :height="20" :width="20" v-motion-pop v-else />
                        </button>
                    </div>
                </div>
            </vee-form>
            <p class="subtext text-gradient mb-0" v-if="comment_message !== ''" >{{ comment_message }}</p>
            <TagResults :loading="searching" :users="results" @tag="tag" v-if="show_tag_box" />
        </div>
    </div>
  </div>
</template>

<script>
import PageLoader from '../components/PageLoader.vue';
import { authStore } from '../stores/auth';
import axios from 'axios';
import TagResults from './TagResults.vue';

export default {
    name: 'AddComment',
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;
        
        let profile;
        try {
            profile = await axios.get(`/profile?apiKey=${apiKey}`)
        } catch (error) {
            if (error.response.data.message === 'Unable to verify token') {
                auth.signOut()
                localStorage.clear()
                return;
            }
        }
        this.user = profile.data;
    },
    data() {
        return {
            status: '',
            user: null,
            color: 'FFF',
            loading: false,
            commentBody: '',
            comment_message: '',
            show_tag_box: false,
            searching: false,
            results: null,
            schema: {
                status: 'required|min:1|max:140'
            },
            mentions: []
        }
    },
    computed: {
        isTag() {
            let link = /@/;
            const bodyArr = this.status.split(' ')

            return link.test(bodyArr[bodyArr.length - 1]);
        },
        search() {
            let link = /@/;
            const bodyArr = this.status.split(' ')

            if (link.test(bodyArr[bodyArr.length - 1])) {
                const user = bodyArr[bodyArr.length - 1]
                return user.slice(1);
            }
        }
    },
    methods: {
        async comment(values, {resetForm}) {
            const mention = values.status.match(/@\w+/g);
            if (mention) {
                mention.forEach((item) => {
                    this.mentions.push(item.slice(1))
                })
            }
            this.loading = true;
            const apiKey = import.meta.env.VITE_API_KEY;
        
            const comment = await axios.post(`/comment?apiKey=${apiKey}`, {
                postId: this.$route.params.postID,
                body: values.status
            });

            if (comment.status === 200) {
                this.comment_message = 'Comment Posted!';
                this.loading = false;
                this.$emit('increase-comment', values.status, comment.data.commentId, this.mentions)
            } else {
                this.comment_message = 'An error occured, please try again later!';
                this.loading = false;
            }

            resetForm();
        },
        tag(user) {
            const bodyArr = this.status.split(' ');
            bodyArr.pop()

            bodyArr.push(`@${user.username}`)

            this.status = bodyArr.join(' ')
            this.show_tag_box = false;
            this.$refs.body.$el.focus();
        }
    },
    watch: {
        async isTag(newVal) {
            const apiKey = import.meta.env.VITE_API_KEY;
            if (newVal === true) {
                this.show_tag_box = true;
                this.searching = true;
                const bodyArr = this.status.split(' ');
                const user = bodyArr[bodyArr.length - 1]
                const search = user.slice(1)
                let res;

                try {
                    res = await axios.get(`/tag-user?apiKey=${apiKey}&search=${search}`)
                } catch (error) {
                    console.log(error);
                }
                this.results = res.data.users;
                this.searching = false;
            } else {
                this.show_tag_box = false;
            }
        },
        async search(newVal) {
            const apiKey = import.meta.env.VITE_API_KEY;
            let res;

            try {
                res = await axios.get(`/tag-user?apiKey=${apiKey}&search=${newVal}`)
            } catch (error) {
                console.log(error);
                this.$toast.error('Something went wrong');
            }
            this.results = res.data.users;
            this.searching = false;
        }
    },
    components: { PageLoader, TagResults }
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