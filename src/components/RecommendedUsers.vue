<template>
<div class="recommended">
    <h6 class="card-head">Recommended Users</h6>

    <div v-if="suggested === null">
        <ItemSkeleton :height='35' :number='5' :margin='13' />    
    </div>
    <div class="recommendation" v-for="user in suggested" :key="user.userId" v-else >
        <router-link class="row no-underline light" :to="{ name: 'Profile', params: { username: user.username } }" >
            <div class="col-2">
                <!-- user display image  -->
                <div class="circular">
                    <img :src="user.displayUrl" alt="handsome" v-if="user.displayUrl !== null" >
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </div>
            </div>
            <div class="details col-6 pe-0 ps-3">
                <!-- name and username  -->
                <h6 class="talk-name">{{ user.name }}</h6>
                <p class="subtext">@{{ user.username }}</p>
            </div>
            <div class="col-4 ps-0" >
                <!-- follow button  -->
                <button class="talk-btn w-100" v-if="!user.isFollowing" :disabled="follow_in_progress" v-motion-pop @click.prevent="follow(user)">
                    <p class="other-talks mb-0 foll" >Follow</p>
                </button>
                <!-- unfollow button  -->
                <button class="talk-outline-btn w-100 h-100" :disabled="follow_in_progress" v-motion-pop @click.prevent="unfollow(user)" v-else >
                    <p class="other-talks mb-0 foll" >Unfollow</p>
                </button>
            </div>
        </router-link>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import ItemSkeleton from './ItemSkeleton.vue';
export default {
    name: 'RecommendedUsers',
    data() {
        return {
            follow_in_progress: false,
            color: 'FFF',
        }
    },
    methods: {
        // follow recommended user 
        async follow(user) {
            const apiKey = import.meta.env.VITE_API_KEY;
            if (this.loggedInUser === null) {
                this.$router.push({ name: 'Auth' })
                return;
            }
            user.isFollowing = true;
            this.follow_in_progress = true;
            let followed;

            try {
                followed =  await axios.put(`/follow?apiKey=${apiKey}&userId=${user.userId}`)
            } catch (error) {
                this.$toast.error(error.response.data.message);
                return;
            }
            this.$toast.success('Followed Successfully!')
            // check if following then update button content to following 
            user.isFollowing = true;
        },
        // unfollow user 
        async unfollow(user) {
            const apiKey = import.meta.env.VITE_API_KEY;
            user.isFollowing = false;
            this.follow_in_progress = true;
            let unfollowed;
            try {
                unfollowed =  await axios.patch(`/unfollow?apiKey=${apiKey}&userId=${user.userId}`);
            } catch (error) {
                this.$toast.error(error.response.data.message);
                return;
            }
            this.$toast.success('Unfollowed Successfully!')
            // check if following then update button content to following 
            user.isFollowing = false;
        },
    },
    props: [ 'suggested' ],
    components: { ItemSkeleton },
}
</script>

<style scoped>
h6.card-head {
margin-bottom: 1rem;
}
div.recommended {
    height: auto;
    width : 100%;
    background-color: #000;
    border-radius: 5px;
    padding: 1.5rem 1rem;
    margin-bottom: 2rem;
}
div.recommendation {
/* display: flex; */
width: 100%;
align-items: center;
/* justify-content: space-between; */
margin-bottom: 0.5rem;
cursor: pointer;
transition: all 0.5s;
}
div.recommendation:hover {
  background-color: #191919;
}
.circular {
border: 1px solid #A9A9A9;
}
.talk-btn {
padding: 0.5rem 1rem;
}
.other-talks {
margin: 0;
}
.subtext {
margin: 0;
}
.talk-name {
    margin-bottom: 0.1rem;
    font-size: 0.9rem;
}
.foll {
    font-size: 0.7rem;
}
@media (max-width: 1250px) {
    div.col-2 {
        display: none;
    }
    div.col-6 {
        flex: 0 0 50%;
        max-width: 50%;
    }
    div.col-4 {
        flex: 0 0 50%;
        max-width: 50%;
    }
}
@media (max-width: 992px) {
  div.recommended {
    display: none;
  }
}
</style>