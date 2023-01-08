<template>
  <div class="container" >
    <ProfileSkeleton v-if='profile === null' />
    <div class="profile-container w-100" v-else >
        <!-- backdrop image  -->
        <div class="backdrop-image w-100">
            <div v-if="profile.backdropUrl !== null">
                <img
                 :src="profile.backdropUrl" 
                 alt="backdrop image" 
                 class="img-fluid" 
                 @click="openImage(profile.backdropUrl)" 
                >
            </div>
        </div>
        <div class="cover">
            <!-- display image  -->
            <div class="circular" v-motion-pop >
                <img
                 :src="profile.displayUrl" 
                 :alt="profile.name" 
                 v-if="profile.displayUrl !== null" 
                 @click="openImage(profile.displayUrl)" 
                >
                <img
                 src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png"
                 :alt="profile.name"
                 @click="openImage('https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png')" 
                 v-else
                >
            </div>
        </div>
        <div class="row info">

            <!-- name, verification badge and username  -->
            <div class="name-and-username col-7">
                <div class="d-flex align-items-center">
                    <h4 class="name mb-0"  v-motion-pop >{{ profile.name }}</h4>
                    <div class="badge" v-if="profile.verified" v-motion-pop >
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
                    <p class="subtext mb-0 ms-2" v-if="profile.isFollowedBy && loggedInUser !== null" >Follows you</p>
                </div>
                <p class="username" v-motion-pop >@{{ profile.username }}</p>
            </div>
            <div class="follow col-5" v-if="loggedInUser !== null" >
                <!-- follow button  -->
                <button class="talk-btn w-100" v-if="profile.username !== loggedInUser.username && profile.isFollowing === false" :disabled="follow_in_progress" v-motion-pop @click="follow">
                    <p class="other-talks mb-0" v-if="!follow_in_progress" >Follow</p>
                    <PageLoader :color="color" :height="20" :width="20" v-motion-pop v-else />
                </button>
                <!-- unfollow button  -->
                <button class="talk-outline-btn w-100" v-if="profile.username !== loggedInUser.username && profile.isFollowing === true" :disabled="follow_in_progress" v-motion-pop @click="unfollow">
                    <p class="other-talks mb-0" v-if="!follow_in_progress" >Unfollow</p>
                    <PageLoader :color="color" :height="20" :width="20" v-motion-pop v-else />
                </button>
                <!-- edit profile button -->
                <router-link :to="{ name: 'EditProfile' }" class="no-underline light talk-btn" v-motion-pop v-if="profile.username === loggedInUser.username">
                    <p class="mb-0 other-talks"><i class="light fa-solid fa-pen-nib"></i><span>Edit Profile</span></p>
                </router-link>
            </div>

            <!-- stack -->
            <div class="stack" v-motion-pop >
                <i class="fa-solid fa-code"></i>
                <p class="mb-0">{{ profile.stack }}</p>
            </div>

            <!-- location  -->
            <div class="location" v-motion-pop >
                <i class="fa-solid fa-location-dot"></i>
                <p class="mb-0">{{ profile.location }}</p>
            </div>

            <!-- email  -->
            <div class="location" v-motion-pop >
                <i class="fa-regular fa-envelope normal-fa"></i>
                <a :href="'mailto:' + profile.email" class="mb-0 dark no-underline">{{ profile.email }}</a>
            </div>

            <!-- user bio  -->
            <div class="bio mt-3" v-if="profile.bio !== 'null'" v-motion-pop >
                <p>{{ profile.bio }}</p>
            </div>

            <!-- followers and following  -->
            <div class="row mt-4" v-motion-pop >
                <div class="col-6 b-r text-center foll" @click="openFollowModal('followers', profile.followersCount)" >
                    <h6>{{ profile.followersCount }}</h6>
                    <p class="dark mb-0">Followers</p>
                </div>
                <div class="col-6 text-center foll" @click="openFollowModal('following', profile.followingCount)">
                    <h6>{{ profile.followingCount }}</h6>
                    <p class="dark mb-0">Following</p>
                </div>
            </div>
        </div>
    </div>

    <!-- tabs  -->
    <div class="tabs mt-3 mb-3">
        <div class="row">
            <!-- posts  -->
            <div class="col-lg-4 col-md-4 col-3 b-r text-center tab" :class="{ 'active-tab': this.$route.query.tab === 'Posts' }" @click="this.currentTab = 'Posts'">
                <h6 class="mt-2 mb-2">Posts</h6>
            </div>

            <!-- Contributions  -->
            <div class="col-lg-4 col-md-4 col-6 b-r text-center tab" :class="{ 'active-tab': this.$route.query.tab === 'Contributions' }" @click="this.currentTab = 'Contributions'">
                <h6 class="mt-2 mb-2">Contributions</h6>
            </div>

            <!-- Talks  -->
            <div class="col-lg-4 col-md-4 col-3 text-center tab" :class="{ 'active-tab': this.$route.query.tab === 'Talks' }" @click="this.currentTab = 'Talks'">
                <h6 class="mt-2 mb-2">Talks</h6>
            </div>
        </div>
    </div>
    <div v-if="((loggedInUser !== null) && (profile !== null))">
        <div v-if="profile.username === loggedInUser.username">
            <PostBox 
                :placeholder="placeholder" 
                v-if="currentTab === 'Posts'" 
                :category="category"
                :postedIn="postedIn"
                @posted="pushPost"
            />
        </div>
    </div>
    <!-- user's posts -->
    <!-- <h5 v-if="noPosts" >No posts to dispay.</h5> -->
    <div
        v-if="currentTab === 'Posts' || currentTab === 'Contributions'"
    >
        <PostItem
            v-for="post in posts" 
            :key="post.postId" 
            :post="post" 
            :images="post.images" 
        />
    </div>
    <div v-else>
        <div v-for="talk in talks" :key="talk.id" class="mb-2">
            <SingleTalk :talk="talk" @leave="removeTalk" />
        </div>
    </div>
    <PageLoader :color="color" :height="20" :width="20" class="mt-2 mb-2" v-if="posts_loading" />
    <FollowModal
     v-if="followModalOpen"
     @close="followModalOpen = false"
     :field="field"
     :number='number'
     :loggedInUser="loggedInUser"
     v-motion-pop
    />

    <div v-if="posts || talks">
        <div v-if="(posts.length == 0 || talks.length == 0) && !posts_loading" class="no-results">
            <p class="mb-0">No {{ currentTab }} to display.</p>
        </div>
    </div>
  </div>
</template>

<script>
import PostItem from '../components/PostItem.vue';
import PostBox from '../components/PostBox.vue';
import PageLoader from '../components/PageLoader.vue'
import FollowModal from '../components/FollowModal.vue'
import ProfileSkeleton from '../components/ProfileSkeleton.vue'
import axios from 'axios'
import { postStore } from '../stores/post';
import { authStore } from '../stores/auth';
import SingleTalk from '../components/SingleTalk.vue';

export default {
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;
        const auth = authStore();
        const { tab } = this.$route.query;

        if (tab !== 'Posts' || tab !== 'Contributions' || tab !== 'Talks') {
            this.$router.push({
                query: {
                    tab: 'Posts',
                }
            })
        }

        let user_profile;
        try {
            user_profile = await axios.get(`/profile/username/${this.$route.params.username}?apiKey=${apiKey}`);
        } catch (error) {    
            if (error.message === 'User not found') {
                this.$router.push({ name: 'Error' });
                // this.$router.push({ name: 'Error' });
            }
        }

        let posts;
        let talks;
        let profile = null;

        if (localStorage.getItem('token')) {
            try {
                profile = await axios.get(`/profile?apiKey=${apiKey}`);
            } catch (error) {
                if (error.message === 'Unable to verify token') {
                    auth.signOut()
                    localStorage.clear()
                    return;
                }
                return;
            }
            this.loggedInUser = profile.data;
        }

        if (user_profile) {
            if (user_profile.status === 200) {
                if (this.$route.query.tab === 'Contributions') {
                    try {
                        posts = await axios.get(`/post/feed?apiKey=${apiKey}&feed=false&pageNumber=1&username=${this.$route.params.username}`);
                    } catch (error) {
                        this.$toast.error('An error occurred while loading Contributions');
                        return;
                    }
                    this.posts_loading = false;
                } else if (this.$route.query.tab === 'Talks') {
                    try {
                        talks = await axios.get(`/talk/username/${this.$route.params.username}?apiKey=${apiKey}`);
                    } catch (error) {
                        this.$toast.error('An error occurred while loading Talks');
                        return;
                    }
                    this.posts_loading = false;
                } else {
                    try {
                        posts = await axios.get(`/post/feed?apiKey=${apiKey}&feed=true&pageNumber=1&username=${this.$route.params.username}`);
                    } catch (error) {
                        this.$toast.error('An error occurred while loading Contributions');
                        return;
                    }
                    this.posts_loading = false;
                }
            }

            if (this.currentTab === 'Talks') {
                this.talks = talks.data.userTalks;
            } else {
                this.posts = posts.data.posts;
            }
            
            if (this.currentTab === 'Contributions') {
                this.contributionPageNumber = 2;
            } else if (this.currentTab === 'Posts') {
                this.postPageNumber = 2;
            }

            this.profile = user_profile.data;
        }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    },
    data() {
        return {
            profile: null,
            loggedInUser: null,
            currentTab: 'Posts',
            placeholder: 'Post something in your Feed?',
            posts: null,
            contributionPageNumber: 1,
            postPageNumber: 1,
            talkPageNumber: 1,
            category: 'Post',
            postedIn: 'Feed',
            color: 'FFF',
            follow_in_progress: false,
            following: false,
            posts_loading: false,
            followModalOpen: false,
            field: '',
            number: 0,
            talks: null,
        }
    },
    methods: {
        isActive(tab) {
            if (this.currentTab === tab) {
                return true
            } else {
                return false
            }
        },
        openImage(image) {
            const post = postStore();

            post.viewImage(image)
        },
        pushPost(data) {
            this.posts.unshift(data);
        },
        async getMorePosts() {
            if (this.posts_loading) {
                return;
            }
            if (this.posts) {
                if (this.posts.length < 25) {
                    return;
                }
            }
            const apiKey = import.meta.env.VITE_API_KEY;
            this.posts_loading = true;
            if (this.currentTab === 'Talks') {
                return;
                // const talks = await axios.get(`talk/username/${this.$route.params.username}?apiKey=${apiKey}`);
            } else if (this.currentTab === 'Contributions') {
                // if (this.posts % 25 !== 0) {
                //     this.posts_loading = false;
                //     return;
                // }
                const posts = await axios.get(`/post/feed?apiKey=${apiKey}&feed=false&pageNumber=${this.contributionPageNumber}&username=${this.$route.params.username}`);

                if (posts.data.posts.length !== 0) {
                    this.posts_loading = false;
                    posts.data.posts.forEach((post) => {
                    this.posts.push(post);
                    })
                    this.contributionPageNumber += 1;
                } else {
                    this.posts_loading = false;
                    window.removeEventListener('scroll', this.handleScroll);
                }
            } else {
                // if (this.posts % 25 !== 0) {
                //     this.posts_loading = false;
                //     return;
                // }
                const posts = await axios.get(`/post/feed?apiKey=${apiKey}&feed=true&pageNumber=${this.postPageNumber}&username=${this.$route.params.username}`);

                if (posts.data.posts.length !== 0) {
                    this.posts_loading = false;
                    posts.data.posts.forEach((post) => {
                    this.posts.push(post);
                    })
                    this.postPageNumber += 1;
                } else {
                    this.posts_loading = false;
                    window.removeEventListener('scroll', this.handleScroll);
                }
            }
        },
        async handleScroll() {
            const apiKey = import.meta.env.VITE_API_KEY;
            // different ways to make sure infinite scroll works
            const { scrollTop, offsetHeight, clientHeight, scrollHeight } = document.documentElement;
            const { innerHeight } = window;
            const bottomOfWindow2 = Math.round(scrollTop) + innerHeight === offsetHeight;
            const bottomOfWindow = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight;
            const bottomOfMac = (window.innerHeight + Math.ceil(window.pageYOffset + 1)) >= document.body.offsetHeight;
            const bottomOfWindow3 = (window.innerHeight + window.scrollY) >= document.body.scrollHeight;
            const scrolledToEnd = scrollHeight - Math.round(scrollTop) === clientHeight;
            const bottomOfWindow4 = Math.round(scrollTop) + clientHeight === scrollHeight;

            if (bottomOfWindow || bottomOfWindow2 || bottomOfMac || bottomOfWindow3 || scrolledToEnd || bottomOfWindow4) {

                // const res = await axios.get(`/post?apiKey=${apiKey}&pageNumber=${this.pageNumber}`)

                // if (res.data.posts === []) {
                //     this.posts.push(res.data.posts);
                //     this.pageNumber += 1;
                // }

                this.getMorePosts();
            }

        },
        async follow() {
            const apiKey = import.meta.env.VITE_API_KEY;
            if (this.loggedInUser === null) {
                this.$router.push({ name: 'Auth' })
                return;
            }
            this.follow_in_progress = true;
            let followed;
            try {
                followed =  await axios.put(`/follow?apiKey=${apiKey}&userId=${this.profile.userId}`)
            } catch (error) {
                this.follow_in_progress = false;
                this.$toast.error(error.response.data.message);
                return;
            }
            this.follow_in_progress = false;
            // check if following then update button content to following 
            this.profile.isFollowing = true;
            this.profile.followersCount += 1;
            this.$toast.success('Followed successfully');
        },
        async unfollow() {
            const apiKey = import.meta.env.VITE_API_KEY;
            // if (this.loggedInUser === null) {
            //     this.$router.push({ name: 'Auth' })
            //     return;
            // }
            this.follow_in_progress = true;
            let unfollowed;

    	    try {
                unfollowed =  await axios.patch(`/unfollow?apiKey=${apiKey}&userId=${this.profile.userId}`);
            } catch (error) {
                this.follow_in_progress = false;
                this.$toast.error(error.response.data.message);
                return;
            }
            this.follow_in_progress = false;
            // check if following then update button content to following 
            this.profile.isFollowing = false;
            this.profile.followersCount -= 1;
            this.$toast.success('Unfollowed successfully');
        },
        async getProfile() {
            if (this.$route.name !== 'Profile') {
                return;
            }
            this.posts_loading = true;
            const apiKey = import.meta.env.VITE_API_KEY;
            let user_profile;
            try {
                user_profile = await axios.get(`/profile/username/${this.$route.params.username}?apiKey=${apiKey}`);
            } catch (error) {    
                if (error.response.data.message === 'User not found') {
                    this.$router.push({ name: 'Error' });
                    // this.$router.push({ name: 'Error' });
                }
            }
            let posts;
            let talks

            if (this.$route.query.tab === 'Contributions') {
                try {
                    posts = await axios.get(`/post/feed?apiKey=${apiKey}&feed=false&pageNumber=1&username=${this.$route.params.username}`);
                } catch (error) {
                    this.$toast.error('An error occurred while loading Contributions');
                    return;
                }
                this.posts_loading = false;
            } else if (this.$route.query.tab === 'Talks') {
                try {
                    talks = await axios.get(`/talk/username/${this.$route.params.username}?apiKey=${apiKey}`);
                } catch (error) {
                    this.$toast.error('An error occurred while loading Talks');
                    return;
                }
                this.posts_loading = false;
            } else {
                try {
                    posts = await axios.get(`/post/feed?apiKey=${apiKey}&feed=true&pageNumber=1&username=${this.$route.params.username}`);
                } catch (error) {
                    this.$toast.error('An error occurred while loading Contributions');
                    return;
                }
                this.posts_loading = false;
            }

            this.profile = user_profile.data;
            if (this.$route.query.tab === 'Talks') {
                this.talks = talks.data.userTalks;
            } else {
                this.posts = posts.data.posts;
            }
        }, 
        openFollowModal(field, count) {
            this.field = field;
            this.number = count;
            this.followModalOpen = true;
        },
        removeTalk(talk) {
            const found = this.talks.find((item) => {
            return item.name === talk.name
            })
            const index = this.talks.indexOf(found);
            this.talks.splice(index, 1);
        },
    },
    watch: {
        currentTab(newVal) {
            if (newVal === this.$route.query.tab) {
                return;
            }
            this.$router.push({
                query: {
                    tab: newVal,
                }
            })
        },
        currentRoute(){
            this.followModalOpen = false;
            this.currentTab = 'Posts';
            this.profile = null;
            this.posts = null;
            this.talks = null;
            this.getProfile();
        },
        thisTab() {
            this.followModalOpen = false;
            this.posts = [];
            this.talks = [];
            this.getProfile();
        }
    },
    computed: {
        currentRoute() {
            return this.$route.params.username;
        },
        activeTab() {
            return this.$route.query.tab;
        },
        thisTab() {
            return this.$route.query.tab
        },
        showPostBox() {
            return 
        },
        noPosts() {
            return ((this.posts == []) && this.posts_loading === false);
        }
    },
    // beforeRouteLeave (to, from, next) {
    //     if (to.name !== 'Profile') {
    //         // this.$router.replace('/')
    //         this.$router.replace({ query: {} });
    //     }
    //     next();
    // },
    components: { PostItem, PostBox, PageLoader, FollowModal, SingleTalk, ProfileSkeleton },
}
</script>

<style scoped>
div.profile-container {
    border-radius: 5px;
    background-color: #000;
    position: relative;
}
div.backdrop-image {
    border-bottom: 3px solid #e7e9ea;
    min-height: 200px;
}
div.backdrop-image img {
    width: 100%;
    object-fit: cover;
    height: 200px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
}
div.cover {
    height: 120px;
}
div.circular {
    width: 200px;
    height: 200px;
    border: 3px solid #e7e9ea;
    position: relative;
    left: 50px;
    bottom: 100px;
    cursor: default;
}
div.info {
    padding: 1.5rem 50px;
}
.name {
    font-weight: 600;
}
.username {
    font-weight: 500;
    background: linear-gradient(to right, #20BF55, #01BAEF);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    cursor: pointer;
}
.circular img {
    cursor: pointer;
}
.stack, .location {
    display: flex;
    color: #A9A9A9;
    align-items: center;
}
.fa-solid {
    background-color: transparent;
    color: #A9A9A9;
    cursor: default;
}
.b-r {
    border-right: 2px solid #A9A9A9;
}
.foll {
    display: flex;
    flex-direction: column;
    justify-items: center;
    cursor: pointer;
    padding-top: 5px;
    padding-bottom: 5px;
    transition: all 0.5s;
}
.foll:hover {
    background-color: #191919;
}
a.dark.no-underline:hover {
    color: #A9A9A9;
    text-decoration: underline;
    text-decoration-color: #20BF55;
}
.tabs {
    background-color: #000;
    border-radius: 5px;
    padding: 0.7rem 2rem;
}
.tab {
    cursor: pointer;
    transition: all 0.5s;
}
.tab:nth-of-type(1) {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.tab:nth-of-type(3) {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.tab:hover {
    background-color: #191919;
    color: #20BF55;
}
.active-tab {
    background-color: #191919;
    color: #20BF55;
}
button.talk-btn {
    height: 2rem;
}
@media (max-width: 575px) {
    .container {
        padding-left: 0;
        padding-right: 0;
    }
    .info {
        margin-right: 0;
        margin-left: 0;
    }
    div.info {
        padding: 1.5rem 30px;
    }
}
@media (max-width: 400px) {
    .circular {
        left: 30px;
    }
    .other-talks span {
        display: none;
    }
}
</style>