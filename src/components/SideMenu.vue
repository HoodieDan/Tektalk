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
                    <div class="circular me-3">
                        <img src="data:image/png;base64,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" alt="">
                    </div>
                    <div class="talk-name">
                        <router-link to="/" class="talk-group"><span>Frontend</span></router-link>
                        <p class="members">5k members</p>
                    </div>
                </div>
                <div class="talk">
                    <div class="circular me-3">
                        <img src="data:image/png;base64,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" alt="">
                    </div>
                    <div class="talk-name">
                        <router-link to="/" class="talk-group"><span>Backend</span></router-link>
                        <p class="members">5k members</p>
                    </div>
                </div>
                <div class="talk">
                    <div class="circular me-3">
                        <img src="data:image/png;base64,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" alt="">
                    </div>
                    <div class="talk-name">
                        <router-link to="/" class="talk-group"><span>FullStack</span></router-link>
                        <p class="members">5k members</p>
                    </div>
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

<style scoped>
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
.talk {
    display: flex;
}
.circular {
    border: 1px solid #A9A9A9;
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
.bottom-nav {
    margin-top: 0.5rem;
    border-top: 1px solid #222222;
}
.sign-out {
    align-self: center !important;
}
@media (max-width: 992px) {
    .menu {
        width: 8.33%;
        padding: 0.7rem 0.7rem 0;
    }
    div.talk-name,
    .head,
    .talk-btn {
        display: none;
    }
    .mid {
        border-top: 1px solid #222222;
        display: flex;
        flex-direction: column;
        justify-items: center;
    }
    .talk {
        margin: 1rem auto;
    }
    .navi span {
        display: none;
    }
    .top-nav,
    .bottom-nav {
        display: flex;
        flex-direction: column;
        justify-items: center;
    }
    .fa {
        width: 2rem;
    }
}
</style>