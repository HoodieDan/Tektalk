<template>
    <div class="container">
        <div class="search-div mb-5">
            <div class="search">
                <i class="fa-solid fa-magnifying-glass icon"></i>
                <input type="text" class="input field" placeholder="Explore" v-model="query" />
            </div>
        </div>

        <div class="history" v-if="!search_in_progress">
            <div class="post">
                <h4 class="mb-0">Search History</h4>
            </div>
        </div>

        <div class="results" v-else>
            <div class="post">
                <h4 class="mb-0">Search Results</h4>
            </div>

            <!-- tabs -->
            <div class="tabs mt-3 mb-3">
                <div class="row">
                    <!-- posts  -->
                    <div class="col-lg-3 col-md-3 col-3 b-r text-center tab" :class="{ 'active-tab': this.currentTab === 'users' }" @click="this.currentTab = 'users'">
                        <h6 class="mt-2 mb-2">Users</h6>
                    </div>

                    <!-- Contributions  -->
                    <div class="col-lg-3 col-md-3 col-3 b-r text-center tab" :class="{ 'active-tab': this.currentTab === 'talks' }" @click="this.currentTab = 'talks'">
                        <h6 class="mt-2 mb-2">Talks</h6>
                    </div>

                    <!-- Talks  -->
                    <div class="col-lg-3 col-md-3 col-3 text-center b-r tab" :class="{ 'active-tab': this.currentTab === 'posts' }" @click="this.currentTab = 'posts'">
                        <h6 class="mt-2 mb-2">Posts</h6>
                    </div>

                    <!-- Comments  -->
                    <div class="col-lg-3 col-md-3 col-3 text-center tab" :class="{ 'active-tab': this.currentTab === 'comments' }" @click="this.currentTab = 'comments'">
                        <h6 class="mt-2 mb-2">Comments</h6>
                    </div>
                </div>
            </div>

            <div>
                <div class="mt-5 mb-5" v-if="searching">
                    <PageLoader :height="20" :width="20" :color="color" />
                </div>

                <div class="search-results" v-else>
                    <PostItem v-for="post in result.posts" :key="post.id" :post="post" v-if="currentTab === 'posts'" />

                    <SingleUser :logged-in-user="currentUser" :user="user" v-for="user in result.users" :key="user.id" v-else-if="currentTab === 'users'" />

                    <Comment :comment="comment" v-for="comment in result.comments" :key="comment.id" :user="currentUser" v-else-if="currentTab === 'comments'" />

                    <SingleTalk :talk="talk" v-for="talk in result.talks" :key="talk.id" v-else-if="currentTab === 'talks'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Comment from '../components/Comment.vue';
import PageLoader from '../components/PageLoader.vue';
import PostItem from '../components/PostItem.vue';
import SingleTalk from '../components/SingleTalk.vue';
import SingleUser from '../components/SingleUser.vue';

export default {
    name: "NetworkPage",
    async beforeRouteEnter(to, from, next) {
        const apiKey = import.meta.env.VITE_API_KEY;

        let profile;
        try {
            profile = await axios.get(`/profile?apiKey=${apiKey}`);
        } catch (error) {
            // this.$toast.error('An error occured');
            return;
        }

        next((vm) => {
            vm.currentUser = profile.data;

            // check for query 
            if (to.query.q) {
                vm.query = to.query.q;
                vm.search_in_progress = true;
            }

            // vm.$route.query.category = 'posts' || 'users' || 'comments'|| 'posts' ? 'users'

            // check if searching and no category selected 
            if (!to.query.category && vm.search_in_progress) {
                vm.$router.push({
                    query: {
                        category: vm.currentTab,
                        q: to.query.q,
                    }
                });
            } else if (to.query.category) {
                vm.currentTab = to.query.category;
            } else {
                vm.currentTab = 'users';
            }
        });
    },
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;

        if (this.$route.query.q) {
            this.searching = true;

            let res;
            try {
                res = await axios.get(`/network/search?apiKey=${apiKey}&search=${this.$route.query.q}`)
            }
            catch (error) {
                this.$toast.error("An error occurred");
                this.searching = false;
                return;
            }

            this.searching = false;
            // console.log(res.data);
            this.result.posts = res.data.posts;
            this.result.users = res.data.users;
            this.result.comments = res.data.comments;
            this.result.events = res.data.events;
            this.result.talks = res.data.talks;
        }
    },
    data() {
        return {
            search_in_progress: false,
            searching: false,
            query: "",
            currentTab: "users",
            color: "FFF",
            currentUser: null,
            result: {
                posts: null,
                events: null,
                comments: null,
                talks: null,
                users: null,
            }
        };
    },
    computed: {
        queryLength() {
            return this.query.length;
        }
    },
    methods: {
        switchTab(tab) {
            this.currentTab = tab;
        }
    },
    watch: {
        currentTab(newVal) {
            if (newVal === this.$route.query.category) {
                return;
            }
            this.$router.push({
                category: newVal,
                q: this.query
            });
        },
        async query(newVal) {
            const apiKey = import.meta.env.VITE_API_KEY;
            this.searching = true;

            if (newVal === this.$route.query.q) {
                return;
            }
            this.$router.push({
                query: {
                    q: newVal,
                    category: this.currentTab,
                }
            });

            let res;
            try {
                res = await axios.get(`/network/search?apiKey=${apiKey}&search=${newVal}`)
            }
            catch (error) {
                this.$toast.error("An error occurred");
                this.searching = false;
                return;
            }

            this.searching = false;
            console.log(res.data);
            this.result.posts = res.data.posts;
            this.result.users = res.data.users;
            this.result.comments = res.data.comments;
            this.result.events = res.data.events;
            this.result.talks = res.data.talks;
        },
        async queryLength(newVal) {
            if (newVal > 0) {
                this.search_in_progress = true;
            }
            else {
                this.search_in_progress = false;
            }
        }
    },
    components: { PageLoader, PostItem, SingleUser, Comment, SingleTalk }
}
</script>

<style scoped>
div.post {
    width: 100%;
    background-color: #000;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    position: relative;
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
.tab:nth-of-type(4) {
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
.b-r {
    border-right: 2px solid #A9A9A9;
}.search i {
    position: absolute;
    bottom: -1px;
}  
.search i:hover {
    background-color: transparent !important;
}
.search {
    width: 100%;
    /* margin-bottom: 0.6rem; */
} 
.icon {
    padding-top: 12px;
    padding-left: 10px;
    min-width: 2.3rem;
    z-index: 10;
    color: #999999;
}   
.input-field {
    padding: 10px;
    text-align: center;
}
input[type='text'] {
    background: #000;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    border: none;
    border-radius: 32px;
    height: 2rem;
    text-indent: 2.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    width: 100%;
}
input:focus {
    outline-style: 1px solid linear-gradient(to right, #20BF55, #01BAEF);
}
</style>