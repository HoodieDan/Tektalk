<template>
  <div class="container">
    <Head>
        <title>Tektalk - Post by {{ post.name }}</title>

        
        <meta property="og:title" :content="'Tektalk post by '+ post.name">
        <meta property="og:description" :content="post.postBody">
        <meta property="og:image" :content="post.authorImage">

        
        <meta name="twitter:title" :content="'Tektalk post by '+ post.name">
        <meta name="twitter:description" :content="post.postBody">
        <meta name="twitter:image" :content="post.authorImage">
        <meta name="twitter:card" content="summary_large_image">
    </Head>
    <div class="post" v-if="!loading">
        <!-- delete post -->
        <div class="delete" v-if="user !== null">
            <!-- <i class="fa-solid fa-trash delete dark" v-if="canDelete && !deleting" @click="deletePost" ></i> -->
            <i class="fa-regular fa-trash-can delete dark" v-if="canDelete && !deleting" @click="deletePost"></i>
        </div>
        <div class="loader-div" v-if="deleting">
            <page-loader :color="color" :height="20" :width="20" />
        </div>

        <!-- ERROR MESSAGE  -->
        <p class="alert p-0" v-if="show_alert">{{ delete_alert }}</p>

        <div class="row">
            <div class="col-3">
                <!-- user display url  -->
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
                        <router-link :to="{ name: 'Profile', params: { username: post.username } }" class="mb-0 light no-underline name" :class="{ 'me-2': !post.isVerified }">{{ post.name }}</router-link>
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
                    <router-link :to="{ name: 'Profile', params: { username: post.username } }" class="text-gradient subtext">@{{ post.username }}</router-link>
                    <p class="mb-2" v-if="post.postedIn !== 'Feed'">Posted in <router-link :to="{ name: 'Talk', params: { talk: post.postedIn } }" class="text-gradient">{{ post.postedIn }}</router-link></p>
                    <p class="mb-2" v-else>Posted in <span class="text-gradient">Feed</span></p>
                    <p class="dark">{{ timePosted }} · {{ datePosted }} · GMT</p>
                </div>
            </div>
            <div class="user-post light mt-3">
                <p class="body-wrapper" v-if="post.postBody"><span v-for="(item, i) in postArray" :key="i" v-cloak >
                    <router-link :to="{ name: 'Profile', params: { username: shavedItem(item).slice(1) } }" class="text-gradient no-underline me-1" v-if="isTag(item)" >
                        <!-- <span>{{ item }}</span> -->
                        {{ shavedItem(item) }} 
                    </router-link>
                    <a :href="item" target="__blank" class="active" v-else-if="isLink(item)" >{{ item }}</a>
                    <span class="me-1" v-else >{{ item }} </span>
                </span></p>
                <div v-if="noOfImages !== 0">
                    <div
                        class="row pt-2 pb-3 pe-3 ps-2 img-wrapper"
                    >
                        <div :class="{ 'col-12 ps-0': noOfImages === 1, 'col-6 pe-1': noOfImages > 1 }">
                            <img
                                :src="post.images[0]" 
                                alt="" 
                                class="br-5 p-0 user-img"
                                :class="{ 'br-right': noOfImages > 1 }"
                                @click="openImage(post.images[0])"
                            >
                        </div>
                        <div
                            class="col-6 ps-1" 
                            v-if="noOfImages > 1"
                        >
                            <img
                                :src="post.images[1]" 
                                alt="" 
                                class="br-5 p-0 user-img br-left"
                                @click="openImage(post.images[1])"
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-auto d-flex">
                <p class="me-2" v-motion-pop >{{ post.commentCount }}</p>
                <span class="subtext pt-1">comments</span>
            </div>
            <!-- link to get likers -->
            <div class="col-auto d-flex likes" @click="openLikeModal(post.likeCount)" >
                <p class="me-2" v-motion-pop >{{ post.likeCount }}</p>
                <span class="subtext pt-1">likes</span>
            </div>
        </div>
    </div>

    <PageLoader class="mb-5 mt-5" :width="20" :color="color" :height="20" v-else />

    <!-- Like and Share Buttons -->
    <div class="like-and-share row" >
        <div class="like col-6 text-center" :class="{ 'is-liked': post.isLiked }" @click="likeOrUnlike(post.isLiked)">
            <h6 class="mt-2" v-if="!post.isLiked" v-motion-pop ><i class="fa-solid fa-heart"></i>Like</h6>
            <h6 class="mt-2" v-motion-pop v-else ><i class="fa-solid fa-heart"></i>Liked</h6>
        </div>
        <div class="share col-6 text-center" @click="shareViaWebShare" >
            <h6 class="mt-2" ><i class="fa-solid fa-share-nodes"></i>Share</h6>
        </div>
    </div>

    <!-- comment box  -->
    <div v-if="loggedIn">
        <AddComment @increase-comment="addOne" v-motion-pop />
    </div>

    <div class="post no-pointer" v-if="comments !== []">
        <h4 class="mb-0">Comments</h4>
    </div>

    <page-loader class="mt-5 mb-5" :color="color" :height="40" :width="40" v-if="getting_comments" />

    <div v-if="comments !== null" >
        <Comment v-for="comment in comments" :key="comment.commentId" :comment="comment" :user="user" @delete="removeFromArray" v-motion-pop />
    </div>
    <div>
        <LikersModal
         :loggedInUser="user" 
         v-if="likeModalOpen" 
         @close="likeModalOpen = false"
         :number='number'
         v-motion-pop
         />
    </div>
  </div>
</template>

<script>
import AddComment from '../components/AddComment.vue';
import { postStore } from '../stores/post';
import { authStore } from '../stores/auth';
import axios from 'axios';
import PageLoader from '../components/PageLoader.vue';
import Comment from '../components/Comment.vue';
import LikersModal from '../components/LikersModal.vue'
import { Head } from '@vueuse/head'

export default {
    name: "PostDetails",
    components: { AddComment, PageLoader, Comment, LikersModal, Head },
    data() {
        return {
            post: {},
            loading: true,
            color: 'FFF',
            loggedIn: false,
            comments: null,
            user: null,
            likeModalOpen: false,
            deleting: false,
            delete_alert: '',
            show_alert: false,
            getting_comments: false,
            number: 0,
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
        sortedComments() {
            return this.comments.slice().sort((a, b) => {
                if (this.sort === '1') {
                return new Date(b.datePosted) - new Date(a.datePosted);
                }

                return new Date(a.datePosted) - new Date(b.datePosted);
            });
        },
        canDelete() {
            return ((this.post.username === this.user.username) || 
            (this.user.username === 'HoodieDan') || 
            (this.user.username === 'ndujekwu'))
        },
        webShareApiSupported() {
            return navigator.share
        },
        mentionsLength() {
            return this.post.mentions.length > 0
        },
        postArray() {
            return this.post.postBody.split(/[-\s^*+|~`\[\]]/);
        },
    },
    methods: {
        async getComments() {
            this.comments = [];
            this.getting_comments = true;
            const apiKey = import.meta.env.VITE_API_KEY;
            let comment;
            try {
                comment = await axios.get(`/comment/?apiKey=${apiKey}&postId=${this.$route.params.postID}`);
            } catch (error) {
                this.$toast.error('An error occured while loading comments')
                return;
            }
            this.comments = comment.data.comments;
            this.getting_comments = false;
        },
        openImage(image) {
            const post = postStore();

            post.viewImage(image)
        },
        addOne(comment, id, mentions) {
            this.post.commentCount += 1;
            this.comments.unshift({
                authorId: this.user.userId,
                authorImage: this.user.displayUrl,
                commentBody: comment,
                commentDate: new Date().toString(),
                commentId: id,
                isVerified: this.user.verified,
                name: this.user.name,
                postId: this.$route.params.postID,
                username: this.user.username,
                mentions: mentions,
            })
        },
        async like() {
            this.post.likeCount += 1;
            this.post.isLiked = true;
            const apiKey = import.meta.env.VITE_API_KEY;
            const like = await axios.put(`/like?apiKey=${apiKey}&postId=${this.$route.params.postID}`);

        },
        async unlike() {
            this.post.likeCount -= 1;
            this.post.isLiked = false;
            const apiKey = import.meta.env.VITE_API_KEY;
            const unlike = await axios.patch(`/unlike?apiKey=${apiKey}&postId=${this.$route.params.postID}`);
        },
        likeOrUnlike(isLiked) {
            if (isLiked) {
                this.unlike()
            } else {
                this.like()
            }
        },
        openLikeModal(count) {
            this.number = count;
            this.likeModalOpen = true;
        },
        removeFromArray(Id) {
            const deletedComment = this.comments.find((comment) => {
                return comment.commentId === Id;
            })
            const index = this.comments.indexOf(deletedComment);
            this.comments.splice(index, 1);
            this.post.commentCount -= 1;
        },
        async deletePost() {
            if (window.confirm('Delete Post?')) {
                this.deleting = true;
                this.show_alert = false;
                const apiKey = import.meta.env.VITE_API_KEY;
                try {
                    await axios.delete(`post?apiKey=${apiKey}&postId=${this.$route.params.postID}`);
                } catch (error) {
                    this.show_alert = true;
                    this.delete_alert = 'an error occured, please try again later'
                    return;
                }
                this.$router.back();
            }
        },
        async shareViaWebShare() {
            // const blob = await (await fetch(this.post.authorImage)).blob();
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
                title: `Post by @${this.post.username}`,
                text: `${this.post.postBody}`,
                url: `${this.$route.path}`,
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
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;
        const auth = authStore();
        const response = await axios.get(`/post/postId/${this.$route.params.postID}?apiKey=${apiKey}`);
        
        if (auth.user) {
            this.user = auth.user;
        }

        if (response.status !== 200) {
            this.$router.push({ name: home })
        }

        this.post = response.data.post[0];
        this.loading = false;

        // if (localStorage.getItem('token')) {
        //     this.loggedIn = true;
        // }
        this.loggedIn = auth.userLoggedIn;
        this.getComments();
    },
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
.delete:hover {
    color: #01BAEF;
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
.is-liked {
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
.mentions {
    border-top: 1px solid #222222;
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
.likes {
    transition: all 0.5s;
}
.likes:hover {
    color: #01BAEF;
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