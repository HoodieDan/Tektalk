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
                 src="../assets/images/avatar.webp"
                 :alt="profile.name"
                 @click="openImage('/src/assets/images/avatar.webp')" 
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
            <div class="stack mb-2" v-motion-pop >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="currentColor" class="bi bi-code-slash me-2" viewBox="0 0 16 16">
                    <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>
                </svg>
                <p class="mb-0">{{ profile.stack }}</p>
            </div>

            <!-- location  -->
            <div class="location mb-2" v-motion-pop >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-geo-alt me-2" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
                <p class="mb-0">{{ profile.location }}</p>
            </div>

            <!-- email  -->
            <div class="location" v-motion-pop >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope-at me-2" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                    <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                </svg>
                <a :href="'mailto:' + profile.email" class="mb-0 dark no-underline">{{ profile.email }}</a>
            </div>

            <!-- user bio  -->
            <div class="bio mt-3" v-if="profile.bio !== 'null'" v-motion-pop >
                <p>{{ profile.bio }}</p>
            </div>

            <div class="others mt-3">
                <router-link :to="{ name: 'Chat', params: { id: profile.userId } }" class="circle" v-if="(profile.username !== loggedInUser.username) && (loggedInUser !== null)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16">
                        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                    </svg>
                </router-link>
                
                <a :href="profile.socials.github" target="_blank" class="circle" v-if="profile.socials.github">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg>
                </a>

                <a :href="profile.socials.twitter" target="_blank" class="circle" v-if="profile.socials.twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                    </svg>
                </a>
                
                <a :href="profile.socials.linkedIn" target="_blank" class="circle" v-if="profile.socials.linkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                    </svg>
                </a>
                
                <a :href="profile.socials.instagram" target="_blank" class="circle" v-if="profile.socials.instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                    </svg>
                </a>
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

    <div class="pb-5" v-if="posts && (currentTab === 'Posts' || currentTab === 'Contributions')">
        <div v-if="(posts.length == 0) && !posts_loading" class="no-results mb-5">
            <p class="mb-0">No {{ currentTab }} to display.</p>
        </div>
    </div>

    <div v-if="talks && currentTab === 'Talks'">
        <div v-if="talks.length == 0 && !posts_loading" class="no-results">
            <p class="mb-0">No talks to display.</p>
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

            this.loggedInUser = auth.user;
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
                if (this.posts.length % 25 !== 0) {
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
                    if (this.posts) {
                        this.posts.push(...posts.data.posts)
                    }
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
                this.$toast.error(error.response.data.errors[0].msg);
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
svg {
    transition: all 0.5s ease;
}
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
div.others {
    display: flex;
    justify-content: center;
}
.circle {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    width: 2rem;
    height: 2rem;
    outline: 1px solid #FFF;
    color: #A9A9A9;
    border-radius: 50%;
    margin-right: 1rem;
    transition: all 0.5s ease;
}
.circle:hover {
    outline-color: #01BAEF;
}
.stack .fa-solid,
.location .fa-solid,
.location .fa-regular {
    padding-left: 0;
}
p.subtext.mb-0.ms-2 {
    text-align: center;
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
    background-clip: text;
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
@media (max-width: 768px) {
    div.info {
        padding: 1.5rem 30px;
        margin-right: 0;
        margin-left: 0;
    }
    h4.name {
        font-size: 1.2rem;
    }
    p.username {
        font-size: 0.8rem;
    }
    .stack p,
    .location p,
    .location a {
        font-size: 0.8rem;
    }
}
@media (max-width: 575px) {
    .container {
        padding-left: 0;
        padding-right: 0;
    }
}
@media (max-width: 400px) {
    div.info {
        padding: 1.5rem 0.5rem;
    }
    .circular {
        left: 30px;
    }
    .other-talks span {
        display: none;
    }
}
</style>