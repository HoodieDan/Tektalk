<template>
  <div class="backdrop" @click.self="close" >
    <div class="select-modal">
        <div class="w-100 p-3 header sticky-top mb-2 d-flex">
            <div class="name">
                <h6 v-if="field === 'followers'"><span class="text-gradient">{{ this.$route.params.username }}'s</span> Followers</h6>
                <h6 v-else> <span class="text-gradient">{{ this.$route.params.username }}'s</span> Following</h6>
            </div>
            
            <!-- modal close button -->
            <button class="close-modal ms-auto" @click="close()">
                <i class="fa-solid fa-xmark light" />
            </button>
        </div>
        <!-- <PageLoader class="m-5" :color="color" :height="40" :width="40" v-if="loading" /> -->
        <div class="p-1">
            <ItemSkeleton v-if="loading" :height='85' :number='number' :margin='10' />
            <SingleUser v-for="user in users" :key="user.userId" :loggedInUser="loggedInUser" :user="user" v-else  />
        </div>
        <div class="text-center" v-if="!loading && users === []" >
            <h6>No {{ field }} to display</h6>
        </div>
    </div>
  </div>
</template>

<script>
import PageLoader from './PageLoader.vue';
import axios from 'axios';
import SingleUser from './SingleUser.vue';
import ItemSkeleton from './ItemSkeleton.vue';

export default {
    name: "FollowModal",
    data() {
        return {
            color: 'FFF',
            users: [],
            loading: false,
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    },
    components: { PageLoader, SingleUser, ItemSkeleton },
    props: [ 'field', 'loggedInUser', 'number' ],
    async created(){
        this.loading = true;
        const apiKey = import.meta.env.VITE_API_KEY;
        const res = await axios.get(`follow/${this.$route.params.username}?apiKey=${apiKey}&field=${this.field}`);
        if (res.status === 200) {
            this.loading = false;
        } else {
            return;
        }
        this.users = res.data.users;
    }
}
</script>

<style scoped>
*::-webkit-scrollbar {
  width: 0.3em;
}
 
*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #000;
  outline: 1px solid #000;
}
div.select-modal {
    width: 50vw;
    max-height: 70vh;
    background: #222222;
    border-radius: 5px;
    margin: auto auto;
    position: relative;
    overflow-y: initial !important;
    overflow-x: hidden;
    /* border: 1px solid #A9A9A9; */
}
div.backdrop {
    display: flex;
    justify-content: center;
    align-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
}
div.header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #000;
    /* border-bottom: 1px solid #A9A9A9; */
}
.close-modal {
    background: transparent;
    border: none;
    z-index: 100001;
}
@media (max-width: 992px) {
    div.select-modal {
        width: 80vw;
        height: auto;
        max-height: 70vh;
    }
}
@media (max-width: 575px) {
    div.select-modal {
        width: 90vw;
        max-height: 75vh;
    }
}
</style>