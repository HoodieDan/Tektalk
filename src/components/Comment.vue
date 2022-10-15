<template>
  <div class="container p-0">
    <div class="comment" :id="comment.commentId" >
        <div class="delete" v-if="user !== null" >
            <i class="fa-solid fa-trash delete dark" v-if="canDelete && !loading" @click="deleteComment(comment.commentId)" ></i>
        </div>
        <div class="loader-div" v-if="loading">
            <page-loader :color="color" :height="20" :width="20" />
        </div>
        <div class="row">
            <router-link :to="{name: 'Profile', params: { username: comment.username }}" class="col-lg-1 col-md-2 col-sm-2 col-2">
                <div class="circular" >
                    <img :src="comment.authorImage" alt="handsome" v-if="comment.authorImage">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </div>
            </router-link>
            <div class="col-lg-11 col-md-10 col-sm-10 col-10">
                <div class="user-details">
                    <div class="d-flex align-items-center">
                        <router-link :to="{name: 'Profile', params: { username: comment.username }}" class="mb-0 light no-underline light" :class="{ 'me-2': !comment.isVerified }">{{ comment.name }}</router-link>
                        <div class="badge" v-if="comment.isVerified">
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
                        <!-- add margin start when not verified -->
                        <h6 class="mb-0 light no-underline"> · <span class="ms-1 subtext">{{ timePosted }}</span></h6>
                    </div>
                    <p class="subtext text-gradient">@{{ comment.username }}</p>
                </div>
                <div class="user-post light">
                    <p class="mb-1 body-wrapper" ><span v-for="(item, i) in postArray" :key="i" v-cloak >
                        <router-link :to="{ name: 'Profile', params: { username: shavedItem(item).slice(1) } }" class="text-gradient no-underline me-1" v-if="isTag(item)" >
                            <!-- <span>{{ item }}</span> -->
                            {{ shavedItem(item) }} 
                        </router-link>
                        <span class="me-1" v-else >{{ item }} </span>
                    </span></p>
                </div>
            </div>
        </div>
        <p class="alert p-0 m-0 subtext" v-if="show_alert" >{{ alert_message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PageLoader from './PageLoader.vue';

export default {
    name: "Comment",
    data() {
        return {
            color: 'FFF',
            loading: false,
            show_alert: false,
            alert_message: '',
        };
    },
    methods: {
        async deleteComment(commentId) {
            this.loading = true;
            const apiKey = import.meta.env.VITE_API_KEY;
            let deleted;
            try {
                deleted = await axios.delete(`comment?apiKey=${apiKey}&commentId=${commentId}`);
            } catch {
                this.loading = false;
                this.show_alert = true;
                this.alert_message = 'Could not delete comment, try again later'
                return;
            }
            this.$emit("delete", commentId);
            this.loading = false;
        },
        mentionsLength() {
            return this.comment.mentions.length > 0
        },
        isTag(item) {
            let link = /@/;
            return link.test(item);
        },
        shavedItem(item) {
            return item.split(/[-\s!$%^&*()+|~=`{}\[\]:";.<>?.\/]/)[0];
        }
    },
    computed: {
        timePosted() {
            const date = new Date().toString();
            const currentTime = date.slice(16, 21);
            const day = date.slice(4, 15);
            const dayPosted = this.comment.commentDate.slice(4, 15);
            const dayAndMonth = this.comment.commentDate.slice(4, 11);
            let time;
            if (this.comment.commentDate) {
                time = this.comment.commentDate.slice(16, 21);
            }
            if (time === currentTime) {
                return "now";
            }
            else if (day === dayPosted) {
                return time;
            }
            else {
                return dayAndMonth;
            }
        },
        canDelete() {
            return ((this.comment.username === this.user.username) || 
            (this.user.username === 'HoodieDan') || 
            (this.user.username === 'ndujekwu'))
        },
        postArray() {
            return this.comment.commentBody.split(/[-\s!$%^&*()+|~=`{}\[\]:";<>.\/]/);
        }
    },
    props: ["comment", "user"],
    components: { PageLoader }
}
</script>

<style scoped>
div.comment {
    width: 100%;
    background-color: #000;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    cursor: pointer;
    position: relative;
}
.loader-div {
    width: 25px;
    height: 25px;
    position: absolute;
    right: 1rem;
}
.delete {
    position: absolute;
    right: 1rem;
    transition: all 0.5s !important;
    z-index: 10;
}
.comment:hover {
    background-color: #191919;
}
.circular {
    border: 1px solid #A9A9A9;
}
.mentions {
    border-top: 1px solid #222222;
}
.hide {
    display: none;
}
</style>