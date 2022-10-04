<template>
  <div class="container" v-if="profile !== null">
    <div class="profile-container w-100">
        <!-- backdrop image  -->
        <div class="backdrop-image w-100">
            <div v-if="profile.backdropUrl !== null">
                <img :src="profile.backdropUrl" alt="backdrop image" class="img-fluid">
            </div>
        </div>
        <div class="cover">
            <!-- display image  -->
            <div class="circular" v-if="profile.displayUrl !== null">
                <img :src="profile.displayUrl" :alt="profile.name" v-if="profile.displayUrl !== null">
                <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
            </div>
        </div>
        <div class="row info">

            <!-- name, verification badge and username  -->
            <div class="name-and-username col-7">
                <div class="d-flex align-items-center">
                    <h4 class="name mb-0">{{ profile.name }}</h4>
                    <div class="badge" v-if="profile.verified">
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
                <p class="username">@{{ profile.username }}</p>
            </div>
            <div class="follow col-5" v-if="loggedInUser !== null">
                <!-- follow button  -->
                <div class="talk-btn" v-if="profile.username !== loggedInUser.username">
                    <p class="other-talks mb-0">Follow</p>
                </div>
                <!-- edit profile button -->
                <div class="talk-btn" v-else>
                    <p class="mb-0 other-talks"><i class="light fa-solid fa-pen-nib"></i><span>Edit Profile</span></p>
                </div>
            </div>

            <!-- stack -->
            <div class="stack">
                <i class="fa-solid fa-code"></i>
                <p class="mb-0">{{ profile.stack }}</p>
            </div>

            <!-- location  -->
            <div class="location">
                <i class="fa-solid fa-earth-africa"></i>
                <p class="mb-0">{{ profile.location }}</p>
            </div>

            <!-- email  -->
            <div class="location">
                <i class="fa-regular fa-envelope normal-fa"></i>
                <p class="mb-0">{{ profile.email }}</p>
            </div>

            <!-- user bio  -->
            <div class="bio mt-3">
                <p>{{ profile.bio }}</p>
            </div>

            <!-- followers and following  -->
            <div class="row mt-4">
                <div class="col-6 b-r text-center foll">
                    <h6>{{ profile.followersCount }}</h6>
                    <p class="dark mb-0">Followers</p>
                </div>
                <div class="col-6 text-center foll">
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
            <div class="col-lg-4 col-md-4 col-3 b-r text-center tab" :class="{ 'active-tab': isActive('Posts') }" @click="this.currentTab = 'Posts'">
                <h6 class="mt-2 mb-2">Posts</h6>
            </div>

            <!-- Contributions  -->
            <div class="col-lg-4 col-md-4 col-6 b-r text-center tab" :class="{ 'active-tab': isActive('Contributions') }" @click="this.currentTab = 'Contributions'">
                <h6 class="mt-2 mb-2">Contributions</h6>
            </div>

            <!-- Talks  -->
            <div class="col-lg-4 col-md-4 col-3 text-center tab" :class="{ 'active-tab': isActive('Talks') }" @click="this.currentTab = 'Talks'">
                <h6 class="mt-2 mb-2">Talks</h6>
            </div>
        </div>
    </div>
    <PostBox :placeholder="placeholder" v-if="currentTab === 'Posts'" />
    <PostItem />
  </div>
</template>

<script>
import PostItem from '../components/PostItem.vue';
import PostBox from '../components/PostBox.vue';
import axios from 'axios'

export default {
    async beforeRouteEnter(to, from, next) {
        const apiKey = import.meta.env.VITE_API_KEY;
        const user_profile = await axios.get(`/profile/${to.params.username}?apiKey=${apiKey}`);
        let profile = null;
        if (localStorage.getItem('token')) {
            profile = await axios.get(`/profile?apiKey=${apiKey}`)
        }            
        next((vm) => {
            const { tab } = vm.$route.query;

            vm.tab = tab === 'Posts' || tab === 'Contributions' || tab === 'Talks' ? tab : 'Posts';

            vm.profile = user_profile.data;
        
            if (localStorage.getItem('token')) {
                vm.loggedInUser = profile.data;
            }
        })

    },
    Updated(to, from) {
        console.log('Update');
    },
    data() {
        return {
            profile: null,
            loggedInUser: null,
            currentTab: 'Posts',
            placeholder: 'Post something in your Feed?',
        }
    },
    methods: {
        isActive(tab) {
            if (this.currentTab === tab) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {
        currentTab(newVal) {
            if (newVal === this.$route.query.tab) {
                return
            }
            this.$router.push({
                query: {
                    tab: newVal,
                }
            })
        },
        $route(){
            window.location.reload();
        }
    },
    components: { PostItem, PostBox },
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
@media (max-width: 575px) {
    .container {
        padding-left: 0;
        padding-right: 0;
    }
    .info {
        margin-right: 0;
        margin-left: 0;
    }
}
@media (max-width: 400px) {
    .circular {
        left: 30px;
    }
    div.info {
        padding: 1.5rem 30px;
    }
}
</style>