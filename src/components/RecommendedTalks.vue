<template>
  <div>
    <div class="recommended">
      <h6 class="card-head">Recommended Talks</h6>

      <div class="recommendation" v-for="list in first_list" :key="list">
        <div class="circular">
          <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--a67XH0QN--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/xndmxrfhliweofif9jty.png" alt="">
        </div>
        <div class="details">
          <h6 class="talk-name">Frontend</h6>
          <p class="subtext">{{list}}k members</p>
        </div>
        <div class="talk-btn">
          <p class="other-talks">Join</p>
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
export default {
    name: 'RecommendedTalks',
    data() {
      return {
        first_list: [1,2,3,4]
      }
    }
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
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border-radius: 32px;
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
@media (max-width: 1100px) {
    div.circular {
        display: none;
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