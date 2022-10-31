<template>
  <div class="" v-motion-slide-bottom >
    <div class="post">
        <router-link :to="{ name: 'Post', params: { postID: post.postId } }" class="no-underline d-block" >
            <div class="row">
                <div class="col-lg-1 col-md-2 col-sm-2 col-2" >
                    <router-link :to="{name: 'Profile', params: { username: post.username }}">
                        <div class="circular" >
                            <img :src="post.authorImage" alt="handsome" v-if="post.authorImage">
                            <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                        </div>
                    </router-link>
                </div>
                <div class="col-lg-11 col-md-10 col-sm-10 col-10">
                    <div>
                        <div class="user-details">
                            <div class="d-flex align-items-center">
                                <router-link :to="{ name: 'Profile', params: { username: post.username } }" class="mb-0 light no-underline" :class="{ 'me-2': !post.isVerified }">{{ post.name }}</router-link>
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
                                <!-- add margin start when not verified -->
                                <h6 class="mb-0 light no-underline"> · <span class="ms-1 subtext">{{ timePosted }}</span></h6>
                            </div>
                            <p class="subtext username">@{{ post.username }}</p>
                        </div>
                        <div class="user-post light">
                            <p class="w-100 body-wrapper"><span v-for="(item, i) in postArray" :key="i" v-cloak >
                                <router-link :to="{ name: 'Profile', params: { username: shavedItem(item).slice(1) } }" class="text-gradient no-underline me-1" v-if="isTag(item)" >
                                    <!-- <span>{{ item }}</span> -->
                                    {{ shavedItem(item) }} 
                                </router-link>
                                <a :href="item" target="__blank" class="active" v-else-if="isLink(item)" >link</a>
                                <span class="me-1" v-else >{{ item }} </span>
                            </span></p>
                        </div>
                        <div v-if="noOfImages !== 0">
                            <div
                            class="row pt-2 pb-3 pe-3 ps-2 img-wrapper"
                            >
                                <div :class="{ 'col-12 ps-0': noOfImages === 1, 'col-6 pe-1': noOfImages > 1 }">
                                    <img
                                        :src="images[0]" 
                                        alt="" 
                                        class="br-5 p-0 user-img"
                                        :class="{ 'br-right': noOfImages > 1 }"
                                        @click.prevent.self="openImage(images[0])"
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
                                        @click.prevent.self="openImage(images[1])"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
        <div class="function-icons">
            <!-- comment lol -->
            <router-link :to="{ name: 'Post', params: { postID: post.postId } }" class="svg-box no-underline d-flex pe-4">
                <i class="fa-regular fa-comment pt-0 pb-0 ps-0 pe-2 dark"></i>
                <p class="subtext">{{ post.commentCount }}</p>
            </router-link>
            <!-- Like  -->
            <div class="svg-box pe-4" @click="likeOrUnlike(post.isLiked, post.postId)" >
                <i class="fa-regular fa-heart pt-0 pb-0 ps-0 pe-2 dark" v-motion-pop v-if="!post.isLiked"></i>
                <i class="fa-solid fa-heart pt-0 pb-0 ps-0 pe-2 liked" v-motion-pop v-else ></i>
                <p class="subtext" :class="{ 'liked': post.isLiked }" >{{ post.likeCount }}</p>
            </div>
            <!-- Share  -->
            <div v-if="webShareApiSupported" >
                <div class="svg-box pe-4" @click="shareViaWebShare(post)" >
                    <i class="fa-solid fa-share-nodes dark p-0"></i>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { postStore } from '../stores/post';
import axios from 'axios';

export default {
    name: 'PostItem',
    data() {
        return {
        }
    },
    methods: {
        openImage(image) {
            const post = postStore();

            post.viewImage(image)
        },
        async like(Id) {
            this.post.likeCount += 1;
            this.post.isLiked = true;
            const apiKey = import.meta.env.VITE_API_KEY;
            const like = await axios.put(`/like?apiKey=${apiKey}&postId=${Id}`);
        },
        async unlike(Id) {
            this.post.likeCount -= 1;
            this.post.isLiked = false;
            const apiKey = import.meta.env.VITE_API_KEY;
            const unlike = await axios.patch(`/unlike?apiKey=${apiKey}&postId=${Id}`);
        },
        likeOrUnlike(isLiked, Id) {
            if (isLiked) {
                this.unlike(Id)
            } else {
                this.like(Id)
            }
        },
        async shareViaWebShare(post) {
            // const blob = await (await fetch(post.authorImage)).blob();
            // const filesArray = [
            //     new File(
            //     [blob],
            //     'animation.png',
            //     {
            //         type: blob.type,
            //         lastModified: new Date().getTime()
            //     }
            //     )
            // ];
            navigator.share({
                title: `Post by @${post.username}`,
                text: `${post.postBody}`,
                url: `/post/${post.postId}`,
                // files: filesArray
            })
        },
        isTag(item) {
            let link = /@/;
            return link.test(item);
        },
        isLink(item) {
            let link = /https/
            return link.test(item);
        },
        shavedItem(item) {
            return item.split(/[-\s!$%^&*()+|~=`{}\[\]:";.<>?.\/]/)[0];
        }
    },
    computed: {
        noOfImages() {
            if (this.images) {
                return this.images.length;
            } else {
                return 0
            }
        },
        timePosted() {
            const date = new Date().toString();
            const currentTime = date.slice(16,21);
            const day = date.slice(4,15);
            const dayPosted = this.post.postDate.slice(4,15);
            const dayAndMonth = this.post.postDate.slice(4, 11)

            let time;

            if (this.post.postDate) {
                time = this.post.postDate.slice(16,21);
            }
            if (time === currentTime) {
                return 'now'
            } else if (day === dayPosted) {
                return time;
            } else {
                return dayAndMonth;
            }
        },
        webShareApiSupported() {
            return navigator.share
        },
        mentionsLength() {
            return this.post.mentions.length > 0
        },
        postArray() {
            return this.post.postBody.split(/[-\s^&*()+|~`\[\]";<>]/);
        }
    },
    props: ['post', 'images'],
}
</script>

<style scoped>
p {
    margin-bottom: 0.5rem;
}
div.post {
    width: 100%;
    background-color: #000;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    cursor: pointer;
}
.post:hover {
    background-color: #191919;
}
.liked {
    color: #01BAEF;
    fill: #01BAEF;
}
.circular {
    border: 1px solid #A9A9A9;
}
.username {
    font-weight: 500;
    background: linear-gradient(to right, #20BF55, #01BAEF);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    cursor: pointer;
}
.user-details {
    display: inline-block;
}
.user-details h6 {
    cursor: pointer;
    transition: all 0.5s;
}
.user-details h6:hover {
    text-decoration: underline;
}
.function-icons {
    display: flex;
    /* justify-content: space-between; */
    margin-left: 8.33%;
}
div.svg-box {
    display: flex;
    cursor: pointer;
    margin-bottom: 0;
}
div.svg-box:nth-of-type(3) {
    margin-right: 1rem;
}
.svg-box svg {
    margin-right: 0.5rem;
    border-radius: 50%;
    transition: all 0.5s;
}
.svg-box svg:hover {
    fill: #01BAEF;
}
h6 span.subtext {
    font-size: 0.7rem;
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
.fa-regular,
.fa-solid {
    transition: none;
}
.fa-solid:hover,
.fa-regular:hover {
    background-color: transparent;
}
.mentions {
    border-top: 1px solid #222222;
}
@media (max-width: 992px) {
    .function-icons {
        margin-left: 20%;
    }
}
</style>