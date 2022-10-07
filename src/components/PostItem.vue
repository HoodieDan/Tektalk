<template>
  <div class="" v-motion-pop >
    <div class="post">
        <div class="row">
            <router-link :to="{name: 'Profile', params: { username: post.username }}" class="col-lg-1 col-md-2 col-sm-2 col-2">
                <div class="circular" >
                    <img :src="post.authorImage" alt="handsome" v-if="post.authorImage">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </div>
            </router-link>
            <div class="col-lg-11 col-md-10 col-sm-10 col-10">
                <div>
                    <router-link :to="{ name: 'Post', params: { postID: post.postId } }" class="no-underline d-block" >
                        <div class="user-details">
                            <div class="d-flex align-items-center">
                                <h6 class="mb-0 light" :class="{ 'me-2': !post.isVerified }">{{ post.name }}</h6>
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
                            <p>{{ post.postBody }}</p>
                        </div>
                    </router-link>
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
                    </div>
                </div>
            </div>
        </div>
        <div class="function-icons">
            <!-- comment lol -->
            <router-link :to="{ name: 'Post', params: { postID: post.postId } }" class="svg-box no-underline d-flex">
                <svg
                    width="16px"
                    height="16px"
                    fill="#A9A9A9"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="
                        svg r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi
                    "
                    >
                    <g>
                        <path
                        d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"
                        />
                    </g>
                </svg>
                <p class="subtext">{{ post.commentCount }}</p>
            </router-link>
            <!-- Like  -->
            <div class="svg-box">
                <svg
                    width="16px"
                    height="16px"
                    fill="#A9A9A9"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="
                        svg r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi
                    "
                    >
                    <g>
                        <path
                        d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
                        />
                    </g>
                </svg>
                <p class="subtext">{{ post.likeCount }}</p>
            </div>
            <!-- Share  -->
            <div class="svg-box">
                <svg
                    width="16px"
                    height="16px"
                    fill="#A9A9A9"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="
                        r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi
                    "
                    >
                    <g>
                        <path
                        d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"
                        />
                        <path
                        d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"
                        />
                    </g>
                </svg>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { postStore } from '../stores/post';

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
                console.log(time);
            }
            if (time === currentTime) {
                return 'now'
            } else if (day === dayPosted) {
                return time;
            } else {
                return dayAndMonth;
            }
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
    justify-content: space-between;
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
@media (max-width: 992px) {
    .function-icons {
        margin-left: 20%;
    }
}
</style>