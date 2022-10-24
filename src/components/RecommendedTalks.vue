<template>
  <div>
    <div class="recommended">
      <h6 class="card-head">Recommended Talks</h6>

      <div class="recommendation row ms-0" v-for="talk in suggestedTalks" :key="talk.id">
        <div class="col-2">
          <div class="circular">
            <img :src="talk.displayUrl" alt="talk image">
          </div>
        </div>
        <div class="col-6 pe-0 ps-3">
          <div class="details">
            <h6 class="talk-name">{{ talk.name }}</h6>
            <p class="subtext">1k members</p>
          </div>
        </div>
        <div class="col-4 pe-0">
          <!-- follow button  -->
          <button class="talk-btn w-100" v-if="!talk.memberOf" :disabled="join_in_progress" v-motion-pop @click.prevent="join(talk)">
              <p class="other-talks mb-0 foll" >Join</p>
          </button>
          <!-- unfollow button  -->
          <button class="talk-outline-btn w-100 h-100" :disabled="join_in_progress" v-motion-pop @click.prevent="leave(talk)" v-else >
              <p class="other-talks mb-0 foll" >Leave</p>
          </button>
        </div>
      </div>
    </div>
    <!-- Policy -->
    <div class="cont">
      <p>Terms of Service</p>
      <p>Privacy Policy</p>
      <p>Cookie Policy</p>
      <p>Imprint</p>
      <p>Ads into</p>
      <p>The Team</p>
      <p>More...</p>
      <p class="no-cursor">© 2022 Tektalk, Inc</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RecommendedTalks',
    data() {
      return {
        first_list: [1,2,3,4],
        join_in_progress: false,
        color: 'FFF',
      }
    },
    methods: {
        async join(talk) {
            if (!localStorage.getItem('token')) {
                this.$router.push({ name: 'Auth' })
                return;
            }
            this.join_in_progress = true;
            const apiKey = import.meta.env.VITE_API_KEY;

            const res = await axios.put(`talk/join?apiKey=${apiKey}&talkId=${talk.id}`)
            if (res.status === 200) {
                this.join_in_progress = false;
                talk.memberOf = true;
            } else {
                this.join_in_progress = false;
                talk.memberOf = false;
            }
        },
        async leave(talk) {
            if (!localStorage.getItem('token')) {
                this.$router.push({ name: 'Auth' })
                return;
            }
            this.join_in_progress = true;
            const apiKey = import.meta.env.VITE_API_KEY;

            const res = await axios.patch(`talk/leave?apiKey=${apiKey}&talkId=${talk.id}`)
            if (res.status === 200) {
                this.join_in_progress = false;
                talk.memberOf = false;
            } else {
                this.join_in_progress = false;
                talk.memberOf = true;
            }
        }
    },
    props: [ 'suggestedTalks' ]
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
  margin-right: 0;
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
.talk-outline-btn {
  height: 2rem !important;
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
div.cont {
  width: 100%;
  padding: 16px 0;
  display: flex;
  flex-wrap: wrap;
}
.cont p {
  font-size: 0.8rem;
  margin-right: 0.7rem;
  color: #A9A9A9;
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
  div.cont {
    display: none;
  }
}
</style>