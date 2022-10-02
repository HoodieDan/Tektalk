<template>
  <div class="container">
    <div class="profile-container w-100">
        <div class="backdrop-image w-100">
            <img src="https://pbs.twimg.com/profile_banners/823925912798371841/1648839079/1500x500" alt="backdrop image" class="img-fluid">
        </div>
        <div class="cover">
            <div class="circular">
                <img src="../assets/images/me.jpg" alt="handsome">
            </div>
        </div>
        <div class="row info">
            <div class="name-and-username col-7">
                <h4 class="name mb-0">Drew</h4>
                <p class="username">@Hoodiedan</p>
            </div>
            <div class="follow col-5">
                <div class="talk-btn">
                    <p class="other-talks mb-0">Follow</p>
                </div>
            </div>
            <div class="stack">
                <i class="fa-solid fa-code"></i>
                <p class="mb-0">Frontend Developer</p>
            </div>
            <div class="location">
                <i class="fa-solid fa-earth-africa"></i>
                <p class="mb-0">Nigeria</p>
            </div>
            <div class="bio mt-3">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic enim assumenda 
                    recusandae atque minus ipsa quidem expedita eligendi, modi accusamus consequuntur 
                    rerum? Aspernatur officia explicabo id quo? Earum, harum quidem?</p>
            </div>
            <div class="row mt-4">
                <div class="col-6 b-r text-center foll">
                    <h6>500</h6>
                    <p class="dark mb-0">Followers</p>
                </div>
                <div class="col-6 text-center foll">
                    <h6>2</h6>
                    <p class="dark mb-0">Following</p>
                </div>
            </div>
        </div>
    </div>
    <div class="tabs mt-3 mb-3">
        <div class="row">
            <div class="col-lg-4 col-md-4 col-3 b-r text-center tab" :class="{ 'active-tab': isActive('Posts') }" @click="this.currentTab = 'Posts'">
                <h6 class="mt-2 mb-2">Posts</h6>
            </div>
            <div class="col-lg-4 col-md-4 col-6 b-r text-center tab" :class="{ 'active-tab': isActive('Contributions') }" @click="this.currentTab = 'Contributions'">
                <h6 class="mt-2 mb-2">Contributions</h6>
            </div>
            <div class="col-lg-4 col-md-4 col-3 text-center tab" :class="{ 'active-tab': isActive('Talks') }" @click="this.currentTab = 'Talks'">
                <h6 class="mt-2 mb-2">Talks</h6>
            </div>
        </div>
    </div>
    <PostItem />
  </div>
</template>

<script>
import PostItem from '../components/PostItem.vue';
export default {
    created() {
        const { tab } = this.$route.query;

        this.tab = tab === 'Posts' || tab === 'Contributions' || tab === 'Talks' ? tab : 'Posts';
    },
    data() {
        return {
            currentTab: 'Posts'
        }
    },
    methods: {
        isActive(tab) {
            if (this.currentTab === tab) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {
        currentTab(newVal) {
            if (newVal === this.$route.query.tab) {
                return
            }
            this.$router.push({
                query: {
                    tab: newVal,
                }
            })
        }
    },
    components: { PostItem }
}
</script>

<style scoped>
div.profile-container {
    border-radius: 5px;
    background-color: #000;
    position: relative;
}
div.backdrop-image {
    border-bottom: 3px solid #e7e9ea;
}
div.backdrop-image img {
    width: 100%;
    object-fit: cover;
    height: 200px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
div.cover {
    height: 120px;
}
div.circular {
    width: 200px;
    height: 200px;
    border: 3px solid #e7e9ea;
    position: relative;
    left: 50px;
    bottom: 100px;
    cursor: default;
}
div.info {
    padding: 1.5rem 50px;
}
.name {
    font-weight: 600;
}
.username {
    font-weight: 500;
    background: linear-gradient(to right, #20BF55, #01BAEF);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    cursor: pointer;
}
.stack, .location {
    display: flex;
    color: #A9A9A9;
    align-items: center;
}
.fa-solid {
    background-color: transparent;
    color: #A9A9A9;
    cursor: default;
}
.b-r {
    border-right: 2px solid #A9A9A9;
}
.foll {
    display: flex;
    flex-direction: column;
    justify-items: center;
    cursor: pointer;
    padding-top: 5px;
    padding-bottom: 5px;
    transition: all 0.5s;
}
.foll:hover {
    background-color: #191919;
}
.tabs {
    background-color: #000;
    border-radius: 5px;
    padding: 0.7rem 2rem;
}
.tab {
    cursor: pointer;
    transition: all 0.5s;
}
.tab:nth-of-type(1) {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.tab:nth-of-type(3) {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.tab:hover {
    background-color: #191919;
}
.active-tab {
    background-color: #191919;
}
@media (max-width: 575px) {
    .container {
        padding-left: 0;
        padding-right: 0;
    }
    .info {
        margin-right: 0;
        margin-left: 0;
    }
}
</style>