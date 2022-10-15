<template>
  <div class="talk w-100">
    <div class="row">
        <div class="image col-4">
            <img src="../assets/images/me.jpg" alt="talk image">
        </div>
        <div class="text col-8 pt-1 pb-1">
            <h6 class="text-gradient" >Frontend (Vue)</h6>
            <p class="mb-2"	>The talk for Frontend web developers using the VueJS and NuxtJS frameworks.</p>
            <div class="row">
                <div class="col-lg-12 col-6 d-flex justify-content-between">
                    <div class="circular mb-2">
                        <img src="../assets/images/me.jpg" alt="member image">
                    </div>
                    <div class="circular mb-2">
                        <img src="../assets/images/me.jpg" alt="member image">
                    </div>
                    <div class="circular mb-2">
                        <img src="../assets/images/me.jpg" alt="member image">
                    </div>
                    <div class="circular mb-2">
                        <img src="../assets/images/me.jpg" alt="member image">
                    </div>
                    <div class="circular mb-2">
                        <img src="../assets/images/me.jpg" alt="member image">
                    </div>
                </div>
                <div class="col-lg-12 col-6">
                    <router-link :to="{ name: 'Home' }" class="talk-btn no-underline light" >
                        <p class="mb-0">View</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'SingleTalk',
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
</style>