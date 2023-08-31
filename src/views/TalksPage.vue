<template>
  <div class="container">
    <div class="no-results">
      <h5 class="ms-2" >Your Talks</h5>
    </div>
    <div v-for="talk in userTalks" :key="talk.id" class="mb-2">
      <SingleTalk :talk="talk" v-if="userTalks !== []" @leave="removeTalk" />
    </div>

    <div v-if="userTalks">
      <div class="no-results mt-3 mb-3" v-if="userTalks.length == 0">
        <p class="mb-0">No talks to display...</p>
      </div>
    </div>

    <div class="mt-5 no-results" >
      <h5 class="ms-2" >Other Talks</h5>
    </div>
    <div v-for="talk in allTalks" :key="talk.id" class="mb-2" >
      <SingleTalk :talk="talk" @join="pushTalk" />
    </div>
  </div>
</template>

<script>
import SingleTalk from '../components/SingleTalk.vue';
import axios from 'axios';
import { authStore } from '../stores/auth'

export default {
    name: 'TalksPage',
    components: { SingleTalk },
    async beforeRouteEnter(to, from, next) {
      const apiKey = import.meta.env.VITE_API_KEY;
      const res = await axios.get(`talk?apiKey=${apiKey}`)
      next((vm) => {
        vm.allTalks = res.data.allTalks;
        vm.userTalks = res.data.userTalks;
      });
    },
    async created() {
        const auth = authStore();
        this.currentUser = auth.user;
    },
    data() {
      return {
        userTalks: [],
        allTalks: [],
        currentUser: null,
      }
    },
    methods: {
      pushTalk(talk) {
        const found = this.allTalks.find((item) => {
          return item.name === talk.name
        })
        const index = this.allTalks.indexOf(found);
        this.allTalks.splice(index, 1);
        this.userTalks.push(talk);

        if (found.users.length < 5) {
          found.users.push({
            username: this.currentUser.username,
            displayUrl: this.currentUser.displayUrl,
          })
        }
      },
      removeTalk(talk) {
        const found = this.userTalks.find((item) => {
          return item.name === talk.name
        })
        const index = this.userTalks.indexOf(found);
        this.userTalks.splice(index, 1);
        this.allTalks.unshift(talk);
        const user = found.users.find((user)=> {
            return user.username === this.currentUser.username;
        })

        if (user) {
          const i = found.users.indexOf(user)

          found.users.splice(i, 1)
        }
      }
    },
    computed: {
      noTalks() {
        return this.userTalks === [];
      }
    }
}
</script>

<style scoped>
*{
  overflow-x: hidden;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}
*::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
}
</style>