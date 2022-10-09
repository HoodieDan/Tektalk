<template>
<div class="recommended">
    <h6 class="card-head">Recommended Users</h6>

    <div class="recommendation" v-for="list in first_list" :key="list">
    <div class="circular">
        <img src="../assets/images/me.jpg" alt="handsome">
    </div>
    <div class="details">
        <h6 class="talk-name">Drew</h6>
        <p class="subtext">{{list}}k followers</p>
    </div>
    <div class="talk-btn">
        <p class="other-talks">Follow</p>
    </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'RecommendedUsers',
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
border-radius: 32px;
cursor: pointer;
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
@media (max-width: 1100px) {
    div.circular {
        display: none;
    }
}
@media (max-width: 992px) {
  div.recommended {
    display: none;
  }
}
</style>