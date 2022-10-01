<template>
<div class="menu">
        <div class="nav-group">
            <div class="logo-group d-flex">
                <h3 class="logo-text">Tt</h3>
                <h3 class="logo">TekTalk.</h3>
            </div>
            <div class="top-nav">
                <div class="link home">
                    <router-link to="/" class="navi active"><i class="fa fa-solid fa-house"></i><span>Home</span></router-link>
                </div>
                <div class="link dashboard">
                    <router-link to="/" class="navi"><i class="fa fa-solid fa-chart-line"></i><span>Talks</span></router-link>
                </div>
                <div class="link calendar">
                    <router-link to="/" class="navi"><i class="fa fa-regular fa-address-book"></i><span>Events</span></router-link>
                </div>
                <div class="link settings">
                    <router-link to="/" class="navi"><i class="fa fa-solid fa-gear"></i><span>Settings</span></router-link>
                </div>
            </div>
            <div class="mid">
                <h6 class="mb-3 head">Popular Talks</h6>
                <div class="talk">
                    <router-link to="/" class="talk-group"><span>Frontend</span></router-link>
                    <p class="members">5k members</p>
                </div>
                <div class="talk">
                    <router-link to="/" class="talk-group"><span>Backend</span></router-link>
                    <p class="members">5k members</p>
                </div>
                <div class="talk">
                    <router-link to="/" class="talk-group"><span>FullStack</span></router-link>
                    <p class="members">5k members</p>
                </div>
                <!-- <div class="talk">
                    <router-link to="/" class="talk-group"><span>DevOps</span></router-link>
                    <p class="members">5k members</p>
                </div> -->
                <div class="talk-btn">
                    <router-link to="/" class="other-talks">Other talks</router-link>
                </div>
            </div>
            <div class="bottom-nav">
                <div class="link sign-out">
                    <p class="navi"><i class="fa fa-solid fa-right-from-bracket"></i><span>Sign Out</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideMenu',
}
</script>

<style>
h6 {
    font-weight: 600;
}
.menu {
    height: 100vh;
    width: 16.67%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #000;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    font-weight: 300;
    padding: 1rem 2rem 0;
    z-index: 1001;
    /* border-right: #e7e9ea 1px solid; */
}
.logo-group {
    align-items: flex-end;
    font-family: 'Poppins', sans-serif;
    /* border-bottom: 1px solid #222222; */
}
.logo-text {
    font-weight: 700;
    background: linear-gradient(to right, #20BF55, #01BAEF);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    width: 2.3rem;
    height: auto;
    margin-bottom: 0;
}
.logo {
    font-weight: 700;
    font-size: 1rem;
    color: #e7e9ea;
}
.nav-group {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.fa {
    margin-right: 0.5rem;
}
.link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0.5rem auto;
    cursor: pointer;
    transition: all 0.5s;
}
.link:hover, .navi:hover, .talk-group:hover {
    color: #01BAEF;
}
.active {
    color: #01BAEF !important;
}
.navi {
    font-weight: 600;
    font-size: 0.8rem;
    text-decoration: none;
    color: #e7e9ea;
    margin-bottom: 0.9rem;
    transition: all 0.5s;
}
.talk-group {
    font-size: 0.8rem;
    text-decoration: none;
    color: #e7e9ea;
    margin-bottom: 0.7rem;
    transition: all 0.5s;
}
.members {
    font-size: 0.7rem;
    color: #A9A9A9;
}
.head {
    font-size: 0.9rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #222222;
}
.sign-out {
    padding-top: 0.5rem;
    border-top: 1px solid #222222;
    align-self: center !important;
}
.talk-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #20BF55, #01BAEF);
    height: 2rem;
    border-radius: 32px;
    cursor: pointer;
    transition: all 0.5s;
}
.talk-btn:hover {
    background-position:200px; 
}
.other-talks {
    text-decoration: none;
    color: #e7e9ea;
    font-size: 0.8rem;
    font-weight: 600;
}
.other-talks:hover {
    color: #e7e9ea;
}
</style>