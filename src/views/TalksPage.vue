<template>
  <div class="container">
    <h5 class="ms-2" >Your Talks</h5>
    <div v-for="talk in userTalks" :key="talk.id" class="mb-2">
      <SingleTalk :talk="talk" v-if="userTalks !== []" @leave="removeTalk" />
    </div>
    <h6 class="mt-3 mb-3 text-gradient" v-if="noTalks" >No talks to show.</h6>

    <div class="mt-4" >
      <h5 class="ms-2" >Other Talks</h5>
    </div>
    <div v-for="talk in allTalks" :key="talk.id" class="mb-2">
      <SingleTalk :talk="talk" @join="pushTalk" />
    </div>
  </div>
</template>

<script>
import SingleTalk from '../components/SingleTalk.vue';
import axios from 'axios';
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
    data() {
      return {
        userTalks: [],
        allTalks: [],
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
      },
      removeTalk(talk) {
        const found = this.userTalks.find((item) => {
          return item.name === talk.name
        })
        const index = this.userTalks.indexOf(found);
        this.userTalks.splice(index, 1);
        this.allTalks.unshift(talk);
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