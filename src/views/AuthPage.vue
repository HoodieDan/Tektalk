<template>
  <div class="container-sm">
    <div class="text-center w-100">
        <h1 class="text-gradient">Tt.</h1>
        <h4>Join Tektalk</h4>
    </div>
    <router-link :to="{ name: 'SignUp' }" class="no-underline" >
        <div class="talk-btn w-100 mb-2">
            <h5 class="light">Sign Up</h5>
        </div>
    </router-link>
    <div class="row">
        <div class="col-5"><hr></div>
        <div class="col-2 dark text-center">or</div>
        <div class="col-5"><hr></div>
    </div>
    <router-link :to="{ name: 'SignIn' }" class="no-underline" >
        <div class="talk-outline-btn w-100 mt-2">
            <h5 class="text-gradient">Log In</h5>
        </div>
    </router-link>
    <p class="subtext mt-4">By signing in, you agree to the <span class="text-gradient">Terms of service</span>
        and <span class="text-gradient">Privacy Policy</span>, including Cookie Use.</p>
  </div>
</template>

<script>
export default {
    name: 'AuthPage',

}
</script>

<style scoped>
h1 {
    font-weight: 700;
}
h4 {
    font-weight: 600;
}
.talk-btn {
    height: 3rem;
}
.talk-outline-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #20BF55;
    height: 3rem;
    border-radius: 32px;
    cursor: pointer;
    transition: all 0.5s;
}
.talk-outline-btn:hover {
    background: #343434;
}
</style>