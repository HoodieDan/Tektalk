<template>
    <div class="container">
        <div class="search-div mb-5">
            <div class="search">
                <i class="fa-solid fa-magnifying-glass icon"></i>
                <input type="text" class="input field" placeholder="Explore" @blur="saveSearch" v-model="query" />
            </div>
        </div>

        <div class="history" v-if="!search_in_progress">
            <div class="post mb-3">
                <h4 class="mb-0">Search History</h4>
            </div>

            <div>

                <div v-if="!getting_history">
                    <SingleHistoryItem v-for="historyItem in history" :key="historyItem.searchId" :history-item="historyItem" @del="deleteHistoryItem" @search="searchAgain" />
                </div>

                <div class="mt-5 mb-5" v-else>
                    <PageLoader :height="20" :width="20" :color="color" />
                </div>

            </div>

            <div v-if="history">
                <div class="no-results mt-3 mb-3" v-if="history.length == 0 && !getting_history">
                    <p class="mb-0">No search history...</p>
                </div>
            </div>

        </div>

        <div class="results" v-else>
            <div class="post">
                <h4 class="mb-0">Search Results</h4>
            </div>

            <!-- tabs -->
            <div class="tabs mt-3 mb-1">
                <div class="row">
                    <!-- posts  -->
                    <div class="col-4 b-r text-center tab" :class="{ 'active-tab': this.currentTab === 'users' }" @click="this.currentTab = 'users'">
                        <h6 class="mt-2 mb-2 tab-text">Users</h6>
                    </div>

                    <!-- Contributions  -->
                    <div class="col-4 b-r text-center tab" :class="{ 'active-tab': this.currentTab === 'talks' }" @click="this.currentTab = 'talks'">
                        <h6 class="mt-2 mb-2 tab-text">Talks</h6>
                    </div>

                    <!-- Talks  -->
                    <div class="col-4 text-center tab" :class="{ 'active-tab': this.currentTab === 'posts' }" @click="this.currentTab = 'posts'">
                        <h6 class="mt-2 mb-2 tab-text">Posts</h6>
                    </div>
                    
                </div>

            </div>

            <div class="tabs mb-3 mt-3">
                <div class="row">
                    <!-- Comments  -->
                    <div class="col-6 text-center tab b-r" :class="{ 'active-tab': this.currentTab === 'comments' }" @click="this.currentTab = 'comments'">
                        <h6 class="mt-2 mb-2 tab-text">Comments</h6>
                    </div>

                    <div class="col-6 tab text-center" :class="{ 'active-tab': this.currentTab === 'events' }" @click="this.currentTab = 'events'">
                        <h6 class="mt-2 mb-2 tab-text">Events</h6>
                    </div>
                </div>
            </div>

            <div>
                <div v-if="result[thisCategory]">
                    <div class="no-results mt-3 mb-3" v-if="result[thisCategory].length == 0">
                        <p class="mb-0">No results for {{ thisCategory }}...</p>
                    </div>
                </div>

                <div class="mt-5 mb-5" v-if="searching">
                    <PageLoader :height="20" :width="20" :color="color" />
                </div>

                <div class="search-results" v-else>
                    <PostItem v-for="post in result.posts" :key="post.id" :post="post" v-if="currentTab === 'posts'" />

                    <SingleUser :logged-in-user="currentUser" :user="user" v-for="user in result.users" :key="user.id" v-else-if="currentTab === 'users'" />

                    <Comment :comment="comment" v-for="comment in result.comments" :key="comment.id" :user="currentUser" v-else-if="currentTab === 'comments'" />

                    <SingleTalk :talk="talk" v-for="talk in result.talks" :key="talk.id" v-else-if="currentTab === 'talks'" class="mb-2" />

                    <SingleEvent :event="event" v-for="event in result.events" :key="event.id" v-else-if="currentTab === 'events'" class="mb-2" />
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
import SingleEvent from '../components/SingleEvent.vue';
import SingleTalk from '../components/SingleTalk.vue';
import SingleUser from '../components/SingleUser.vue';
import SingleHistoryItem from '../components/SearchHistoryItem.vue';

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

        this.getting_history = true;

        let his;

        try {
            his = await axios.get(`/network/search-history?apiKey=${apiKey}`)
        } catch (error) {
            this.$toast.error('An error occured while getting search history.')
            this.getting_history = false;
            return;
        }
        this.getting_history = false;
        this.history = his.data.searchHistory;

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
            getting_history: false,
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
            },
            history: null,
        };
    },
    computed: {
        queryLength() {
            return this.query.length;
        },
        thisCategory() {
            return this.$route.query.category;
        }
    },
    methods: {
        switchTab(tab) {
            this.currentTab = tab;
        },
        deleteHistoryItem(item) {
            const found = this.history.find((his) => {
                return his.searchId === item.searchId;
            })

            const i = this.history.indexOf(found)

            const x = this.history.splice(i, 1)[0];
        },
        searchAgain(item) {
            this.query = item.search;

            const found = this.history.find((his) => {
                return his.searchId === item.searchId;
            })

            const i = this.history.indexOf(found)

            const x = this.history.splice(i, 1)[0];

            this.history.unshift(x)
        },
        async saveSearch() {
            const apiKey = import.meta.env.VITE_API_KEY;

            let res;

            try {
                res = await axios.post(`/network/save-search?apiKey=${apiKey}`, {
                    'search': this.query,
                })
            } catch (error) {
                return;
            }

            this.history.unshift({
                'search': this.query,
                'searchId': res.data.searchId,
            });
        }
    },
    watch: {
        currentTab(newVal) {
            if (newVal === this.$route.query.category) {
                return;
            }
            this.$router.push({
                query: {
                    category: newVal,
                    q: this.query
                }
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
            // console.log(res.data);
            this.result.posts = res.data.posts;
            this.result.users = res.data.users;
            this.result.comments = res.data.comments;
            this.result.events = res.data.events;
            this.result.talks = res.data.talks;
        },
        async queryLength(newVal) {
            if (newVal > 0) {
                this.search_in_progress = true;
            } else {
                this.search_in_progress = false;
            }
        }
    },
    components: { PageLoader, PostItem, SingleUser, Comment, SingleTalk, SingleEvent, SingleHistoryItem }
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
.tab:nth-of-type(3) {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.tab:nth-of-type(5) {
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
@media (max-width: 390px) {
    .tab-text {
        font-size: small;
    }
    .tabs {
        padding: 0.7rem 1rem;
    }
}
</style>