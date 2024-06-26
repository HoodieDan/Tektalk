<template>
  <div>
    <div class="recommended">
      <h6 class="card-head">Recommended Talks</h6>

      <div v-if="suggestedTalks.length === 0">
        <ItemSkeleton :height='35' :number='5' :margin='13' />    
      </div>
      <div class="recommendation ps-3" v-for="talk in suggestedTalks" :key="talk.id" v-else>
        <router-link :to="{ name: 'Talk', params: { talk: talk.name } }" class="no-underline light row" >
          <div class="col-2 ps-0">
            <div class="circular">
              <img :src="talk.displayUrl" alt="talk image">
            </div>
          </div>
          <div class="col-6 pe-0">
            <div class="details">
              <h6 class="talk-name">{{ talk.name }}</h6>
              <p class="subtext">{{ talk.memberCount }} members</p>
            </div>
          </div>
          <div class="col-4">
            <!-- follow button  -->
            <button class="talk-btn w-100" v-if="!talk.memberOf" :disabled="join_in_progress" v-motion-pop @click.prevent="join(talk)">
                <p class="other-talks mb-0 foll" @click.self="join(talk)" >Join</p>
            </button>
            <!-- unfollow button  -->
            <button class="talk-outline-btn w-100 h-100" :disabled="join_in_progress" v-motion-pop @click.prevent="leave(talk)" v-else >
                <p class="other-talks mb-0 foll" @click.self="leave(talk)" >Leave</p>
            </button>
          </div>
        </router-link>
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
      <p class="no-cursor">© 2024 Tektalk, Inc</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ItemSkeleton from './ItemSkeleton.vue'

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
            const apiKey = import.meta.env.VITE_API_KEY;
            let res;

            try {
              res = await axios.put(`talk/join?apiKey=${apiKey}&talkId=${talk.id}`)
            } catch (error) {
              this.$toast.error(error.response.data.message);
              talk.memberOf = false;
              return;
            }
            
            this.$toast.success('Joined Talk Successfully!');
            talk.memberOf = true;
            talk.memberCount += 1;
        },
        async leave(talk) {
            if (!localStorage.getItem('token')) {
                this.$router.push({ name: 'Auth' })
                return;
            }
            this.join_in_progress = true;
            const apiKey = import.meta.env.VITE_API_KEY;
            let res;
            
            try {
              res = await axios.patch(`talk/leave?apiKey=${apiKey}&talkId=${talk.id}`)
            } catch (error) {
              this.$toast.error(error.response.data.message);
              talk.memberOf = true;
              return;
            }
            this.$toast.success('Left Talk Successfully!');
            talk.memberOf = false;
            talk.memberCount -= 1;
        },
        redirect(talk) {
          this.$router.push({
            name: 'Talk', 
            params: { 
              talk: talk.name 
            } 
          })
        }
    },
    props: [ 'suggestedTalks' ],
    components: { ItemSkeleton }
}
</script>

<style scoped>
h6.card-head {
  margin-bottom: 1rem;
  font-size: 0.9rem;
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
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0;
  cursor: pointer;
  transition: all 0.5s;
}
.recommendation .row {
  align-items: center;
}
div.recommendation:hover {
  background-color: #191919;
  border-radius: 5px;
}
.circular {
border: 1px solid #A9A9A9;
}
.talk-btn {
padding: 0.3rem 1rem;
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
    font-size: 0.7rem;
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
  font-size: 0.6rem;
  margin-right: 0.7rem;
  color: #A9A9A9;
}
@media (max-width: 1250px) {
    div.col-2 {
      display: none;
    }
    div.col-6 {
      flex: 0 0 70%;
      max-width: 70%;
    }
    div.col-4 {
      flex: 0 0 30%;
      max-width: 30%;
    }
    .talk-btn p,
    .talk-outline-btn p {
      font-size: 0.7rem !important;
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
@media (max-width: 575px) {
  h6 {
    font-size: 1rem;
  }
}
</style>