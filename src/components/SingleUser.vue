<template>
<div class="container p-0">
    <div class="user">
        <div class="row w-100">
            <router-link :to="{name: 'Profile', params: { username: user.username }}" class="col-2">
                <div class="circular" >
                    <img :src="user.displayUrl" alt="handsome" v-if="user.displayUrl">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </div>
            </router-link>
            <router-link :to="{name: 'Profile', params: { username: user.username }}" class="col-7 no-underline">
                <div class="user-details">
                    <div class="d-flex align-items-center">
                        <router-link :to="{name: 'Profile', params: { username: user.username }}" class="mb-0 light no-underline light" :class="{ 'me-2': !user.isVerified }">{{ user.name }}</router-link>
                        <div class="badge" v-if="user.verified">
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
                        <p class="subtext mb-0 ms-2" v-if="user.isFollowedBy && loggedInUser !== null" >Follows you</p>
                    </div>
                    <p class="subtext text-gradient">@{{ user.username }}</p>
                </div>
            </router-link>
            <div class="col-3" v-if="loggedInUser !== null" >
                <!-- follow button  -->
                <button class="talk-btn w-100" v-if="user.username !== loggedInUser.username && user.isFollowing === false" :disabled="follow_in_progress" v-motion-pop @click="follow(user.userId)">
                    <p class="other-talks mb-0 foll" v-if="!follow_in_progress" >Follow</p>
                    <PageLoader :color="color" :height="20" :width="20" v-motion-pop v-if="follow_in_progress" />
                </button>
                <!-- unfollow button  -->
                <button class="talk-outline-btn w-100" v-if="user.username !== loggedInUser.username && user.isFollowing === true" :disabled="follow_in_progress" v-motion-pop @click="unfollow(user.userId)">
                    <p class="other-talks mb-0 foll" v-if="!follow_in_progress" >Unfollow</p>
                    <PageLoader :color="color" :height="20" :width="20" v-motion-pop v-else />
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import PageLoader from '../components/PageLoader.vue';
import axios from 'axios';

export default {
    name: 'user',
    data() {
        return {
            follow_in_progress: false,
            color: 'FFF',
        }
    },
    methods: {
        async follow(Id) {
            const apiKey = import.meta.env.VITE_API_KEY;
            if (this.loggedInUser === null) {
                this.$router.push({ name: 'Auth' })
                return;
            }
            this.follow_in_progress = true;
            const followed =  await axios.put(`/follow?apiKey=${apiKey}&userId=${Id}`)
            
            if (followed.status === 200) {
                this.follow_in_progress = false;
                // check if following then update button content to following 
                this.user.isFollowing = true;
            } else {
                this.follow_in_progress = false;
                return;
            }
        },
        async unfollow(Id) {
            const apiKey = import.meta.env.VITE_API_KEY;
            this.follow_in_progress = true;
            const unfollowed =  await axios.patch(`/unfollow?apiKey=${apiKey}&userId=${Id}`);

            if (unfollowed.status === 200) {
                this.follow_in_progress = false;
                // check if following then update button content to following 
                this.user.isFollowing = false;
            } else {
                this.follow_in_progress = false;
                return;
            }
        },
    },
    computed: {
    },
    props: ['user', 'loggedInUser'],
    components: { PageLoader },
}
</script>

<style scoped>
div.user {
    width: 100%;
    background-color: #000;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    cursor: pointer;
}
.user:hover {
    background-color: #191919;
}
.circular {
    border: 1px solid #A9A9A9;
}
.talk-btn {
    height: 2rem;
}
@media (max-width: 500px) {
    .foll {
        font-size: 0.7rem;
    }
}
</style>