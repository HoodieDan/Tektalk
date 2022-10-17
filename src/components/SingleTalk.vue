<template>
  <div class="talk w-100 container">
    <div class="row">
        <div class="image col-4">
            <img :src="talk.displayUrl" alt="talk image">
        </div>
        <div class="text col-8 pt-1 pb-1">
            <h6 class="text-gradient" >{{ talk.name }}</h6>
            <p class="mb-2"	>{{ talk.description }}</p>
            <div class="row">
                <div class="col-lg-12 col-6 d-flex justify-content-between">
                    <div class="circular mb-2" v-for="(image, i) in talk.usersDisplayUrl" :key="i">
                        <img :src="image" alt="member image">
                    </div>
                </div>
                <div class="col-lg-12 col-6">
                    <button class="talk-btn w-100 light" v-if="!talk.memberOf" v-motion-pop >
                        <p class="mb-0" >Join</p>
                    </button>
                    <button class="talk-outline-btn light w-100" v-motion-pop v-else >
                        <p class="mb-0" >Leave</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'SingleTalk',
    props: ['talk']
}
</script>

<style scoped>
div.talk {
    background-color: #000;
    border-radius: 5px;
    padding: 0.5rem;
}
/* div.image {
    width: 100%;
    height: 100%;
} */
.image img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    /* max-height: 400px; */
}
div.circular {
    width: 25px;
    height: 25px;
}
div.text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
@media (max-width: 575px) {
    /* .row > * {
        padding-right: 1rem;
    } */
    /* .mb-2 {
        margin-right: 0.25rem;
    } */
}
</style>