<template>
  <div class="container">
    <div class="post" v-if="post">
        <div class="row">
            <div class="col-3">
                <router-link :to="{name: 'Profile', params: { username: post.username }}">
                    <div class="circular">
                        <img :src="post.authorImage" alt="gorgeous" v-if="post.authorImage">
                        <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                    </div>
                </router-link>
            </div>
            <div class="col-9">
                <div class="name-and-username">
                    <div class="d-flex align-items-center">
                    <h4 class="name mb-0">{{ post.name }}</h4>
                    <div class="badge" v-if="post.isVerified">
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
                    <p class="text-gradient">@{{ post.username }}</p>
                    <p class="mb-2">Posted in <span class="text-gradient">{{ post.postedIn }}</span></p>
                    <!-- <p class="dark">{{ timePosted }} · {{ datePosted }}</p> -->
                </div>
            </div>
            <div class="user-post light mt-3">
                <p>{{ post.postBody }}</p>
                <!-- <div v-if="noOfImages !== 0">
                    <div
                        class="row pt-2 pb-3 pe-3 ps-2 img-wrapper"
                    >
                        <div :class="{ 'col-12': noOfImages === 1, 'col-6 pe-1': noOfImages > 1 }">
                            <img
                                :src="images[0]" 
                                alt="" 
                                class="br-5 p-0 user-img"
                                :class="{ 'br-right': noOfImages > 1 }"
                                @click="openImage(images[0])"
                            >
                        </div>
                        <div
                            class="col-6 ps-1" 
                            v-if="noOfImages > 1"
                        >
                            <img
                                :src="images[1]" 
                                alt="" 
                                class="br-5 p-0 user-img br-left"
                                @click="openImage(images[1])"
                            >
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="col-auto">
                <p>{{ post.commentCount }} <span class="subtext">comments</span></p>
            </div>
            <div class="col-auto">
                <p>{{ post.likeCount }} <span class="subtext">likes</span></p>
            </div>
        </div>
    </div>

    <!-- Like and Share Buttons -->
    <div class="like-and-share row">
        <div class="like col-6 text-center">
            <h6>Like</h6>
        </div>
        <div class="share col-6 text-center">
            <h6>Share</h6>
        </div>
    </div>

    <!-- comment box  -->
    <div>
        <AddComment />
    </div>
  </div>
</template>

<script>
import AddComment from '../components/AddComment.vue';
import axios from 'axios';

export default {
    name: "PostDetails",
    components: { AddComment },
    // mounted() {
    //     console.log(this.post);
    // },
    data() {
        return {
            post: null,
        }
    },
    computed: {
        timePosted() {
            return this.post.postDate.slice(16,21);
        },
        datePosted() {
            return this.post.postDate.slice(4,15);
        },
        noOfImages() {
            return this.post.images.length;
        },
    },
    methods: {
        getComments() {
            return;
        }
    },
    async mounted() {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`/post/postId/${this.$route.params.postID}?apiKey=${apiKey}`);
        console.log(response.data.post[0]);

        this.post = response.data.post[0];

        // next ((vm) => {
        //     if (!response.data.post) {
        //         vm.$router.push({ name: 'home' });
        //         return;
        //     }
        //     vm.post = response.data.post[0];

        //     console.log(vm.post);
        //     // lodash function 
        //     // this.userData = cloneDeep(response.data)
        // });
    }
}
</script>

<style scoped>
div.post {
    width: 100%;
    background-color: #000;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    cursor: pointer;
}
div.circular {
    width: 100px;
    height: 100px;
}
div.like-and-share {
    width: 100%;
    background-color: #000;
    border-radius: 5px;
    padding: 1rem 1.5rem;
    margin: 0 0 0.5rem 0;
}
.like {
    border-right: 3px solid #A9A9A9;
    cursor: pointer;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    transition: all 0.5s;
}
.share {
    cursor: pointer;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-top-right-radius: 5px;
    transition: all 0.5s;
    border-bottom-right-radius: 5px;
}
.like:hover,
.share:hover {
    background-color: #191919;
    color: #01BAEF;
}
.img-fluid.col-6 {
    border-radius: 5px;
}
img.user-img {
    object-fit: cover !important;
    height: 100%;
    width: 100%;
    z-index: 10;
    max-height: 400px;
}
.user-img:hover {
    filter: opacity(0.8) drop-shadow(0 0 0 #000);
}
.col-6 {
    padding: 0;
}
.br-right {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.br-left {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
@media (max-width: 575px) {
    div.circular {
        width: 65px;
        height: 65px;
    }
}
@media (max-width: 310px) {
    div.circular {
        width: 45px;
        height: 45px;
    }
}
</style>