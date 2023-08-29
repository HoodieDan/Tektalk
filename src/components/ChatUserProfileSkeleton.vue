<template>
    <div class="profile-container w-100">
        <!-- backdrop image  -->
        <div class="backdrop-image w-100">
        </div>
        <div class="cover">
            <!-- display image  -->
            <div class="circular" >
                <ImageSkeleton :width='200' :height='200' />
            </div>
        </div>
        <div class="row info">

            <!-- name, verification badge and username  -->
            <div class="name-and-username">
                <div class="d-flex align-items-center">
                    <h4 class="name mb-0"></h4>
                    <div class="badge">
                        <ImageSkeleton :width='17' :height='17' />
                    </div>
                    <!-- <p class="subtext mb-0 ms-2" v-if="profile.isFollowedBy && loggedInUser !== null" >Follows you</p> -->
                </div>
                <p class="username"></p>
            </div>

            <!-- stack -->
            <div class="stack" >
                <i class="fa-solid fa-code"></i>
                <p class="mb-0"></p>
            </div>

            <!-- location  -->
            <div class="location" >
                <i class="fa-solid fa-location-dot"></i>
                <p class="mb-0"></p>
            </div>

            <!-- email  -->
            <div class="location" >
                <i class="fa-regular fa-envelope normal-fa"></i>
                <p class="mb-0 dark no-underline"></p>
            </div>

            <!-- user bio  -->
            <div class="bio mt-3" >
                <p></p>
                <p></p>
                <p></p>
            </div>
        </div>
    </div>
</template>

<script>
import ImageSkeleton from './ImageSkeleton.vue'

export default {
    components: { ImageSkeleton }
}
</script>

<style scoped>
@keyframes pulse-bg {
  0% {
    background-color: #1B1B1B;
  }
  50% {
    background-color: #28282B;
  }
  100% {
    background-color: #1B1B1B;
  }
}
div.backdrop-image {
    background-color: #1B1B1B;
    min-height: 100px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    animation: pulse-bg 1s infinite;
}
div.backdrop-image img {
    width: 100%;
    object-fit: cover;
    height: 100px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
}
div.cover {
    height: 50px;
}
div.circular {
    width: 100px;
    height: 100px;
    border: 3px solid #e7e9ea;
    position: relative;
    left: 50px;
    bottom: 50px;
    cursor: default;
}
div.info {
    padding: 1rem 50px;
}
.name {
    content: ' ';
    background-color: #1B1B1B;
    animation: pulse-bg 1s infinite;
    width: 75%;
    height: 2.5rem;
    margin-bottom: 1rem;
}
.username {
    content: ' ';
    background-color: #1B1B1B;
    animation: pulse-bg 1s infinite;
    width: 55%;
    height: 1.8rem;
    margin-top: 1rem;
}
.circular img {
    cursor: pointer;
}
.stack, .location {
    display: flex;
    align-items: center;
}
.stack p, .location p {
    content: ' ';
    background-color: #1B1B1B;
    animation: pulse-bg 1s infinite;
    width: 75%;
    height: 1rem;
    margin: 0.7rem 0;
}
.bio p {
    content: ' ';
    background-color: #1B1B1B;
    animation: pulse-bg 1s infinite;
    width: 100%;
    height: 1rem;
}
.fa-solid {
    background-color: transparent;
    color: #A9A9A9;
    cursor: default;
}
.b-r {
    border-right: 2px solid #A9A9A9;
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
@media (max-width: 400px) {
    .circular {
        left: 30px;
    }
    div.info {
        padding: 1.5rem 30px;
    }
    .other-talks span {
        display: none;
    }
}
</style>