<template>
  <div class="top-bar">
    <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-6 search-div">
            <div class="search">
                <i class="fa-solid fa-magnifying-glass icon"></i>
                <input type="text" class="input field" placeholder="Explore" v-model="query" />
            </div>
        </div>
        <div class="col-lg-2 col-md-2 col-0"></div>
        <div class="col-lg-2 col-md-2 col-sm-6 d-flex icons">
            <i class="fai fa-regular fa-paper-plane"></i>
            <i class="fai fa-regular fa-bell"></i>
            <!-- <i class="fa-regular fa-bell-slash"></i> -->
            <router-link to="/" class="circular">
                <img src="../assets/images/me.jpg" alt="user profile image">
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'TopBar',
    data() {
        return {
            query: ''
        }
    }
}
</script>

<style scoped>
.top-bar {
   position: fixed;
   width: 100vw;
   padding: 1rem 1rem 1rem 16.67%;
   background-color: #000;
}
.row {
    margin: 0;
}
.search-div {
    display: flex;
    align-items: center;
}
.search i {
    position: absolute;
    bottom: -1px;
}  
.search {
    width: 100%;
    /* margin-bottom: 0.6rem; */
} 
.icon {
    padding: 10px;
    min-width: 2.3rem;
    z-index: 10;
    color: #999999;
}   
.input-field {
    padding: 10px;
    text-align: center;
}
input[type='text'] {
    background: #222222;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    border: none;
    border-radius: 32px;
    height: 2rem;
    padding-left: 2.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    width: 100%;
}
input:focus {
    outline-style: 1px solid linear-gradient(to right, #20BF55, #01BAEF);
}
.icons {
    justify-content: space-between;
    align-items: center;
}
.fai {
    cursor: pointer;
    transition: all 0.5s;
}
.fai:hover {
    color: #01BAEF;
}
.circular {
    width: 40px;
    height: 40px;
    background-color: #000000;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
}
.circular img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
</style>