<template>
  <div class="container-sm">
    <div class="text-center w-100 mb-3">
        <h1 class="text-gradient no-underline">Tt.</h1>
        <h4>Welcome back to Tektalk!</h4>
    </div>
    <vee-form @submit="login" :validation-schema="loginSchema">
        <!-- email  -->
        <label for="email">Email:</label>
        <div class="form-item mt-2 mb-3">
            <i class="fa-regular fa-envelope icon"></i>
            <vee-field id="email" type="email" name="email" class="input field" placeholder="Email" />
        </div>
        <ErrorMessage class="error mb-2 text-gradient" name="email"></ErrorMessage>

        <!-- password  -->
        <label for="paswword">Password:</label>
        <div class="form-item mt-2 mb-3">
            <i class="fa-solid fa-lock icon"></i>
            <vee-field id="password" type="password" name="password" class="input field" placeholder="Password" />
        </div>
        <ErrorMessage class="error-message mb-2 text-gradient" name="password"></ErrorMessage>

        <!-- login button  -->
        <button type="submit" class="talk-btn w-100 mb-2 mt-5">
            <!-- show loader if logging user in and show button text if not  -->
            <PageLoader :width="20" :height="20" :color="color" v-if="login_in_submission" v-motion-pop />
            <h5 class="light mt-2 mb-2" v-motion-pop v-else>Sign In!</h5>
        </button>

        <!-- redirect to signup  -->
        <p class="subtext mb-2">Already have an account? <router-link :to="{ name: 'SignUp' }" class="text-gradient">Sign up</router-link></p>
        <router-link :to="{ name: 'ForgotPassword' }" class="subtext text-gradient" >Forgot Password?</router-link>
    </vee-form>
  </div>
</template>

<script>
import { authStore } from '../stores/auth'
import PageLoader from '../components/PageLoader.vue';

export default {
    name: "SignIn",
    data() {
        return {
            loginSchema: {
                email: "required|min:11|max:100|email",
                password: "required|min:8|max:30",
            },
            login_in_submission: false,
            color: 'FFF'
        };
    },
    methods: {
        async login(values) {
            const auth = authStore();
            this.login_in_submission = true;
            try {
                await auth.login(values);
            }
            catch (error) {
                this.$toast.error(error.response.data.message);
                console.log(error);
                this.login_in_submission = false;
                return;
            }
            this.$toast.success('Login Successful');
            window.location.reload();
            this.login_in_submission = false;
            // this.$router.push({ name: 'Home' });
        }
    },
    beforeRouteEnter(to, from, next) {
        const token = localStorage.getItem("token");
        if (token) {
            next({ name: "Home" });
        }
        else {
            next();
        }
    },
    components: { PageLoader }
}
</script>

<style scoped>
.form-item i {
    position: absolute;
    bottom: -1px;
}  
.form-item i:hover {
    background-color: transparent !important;
}
.form-item {
    width: 100%;
    /* margin-bottom: 0.6rem; */
} 
.icon {
    padding-top: 12px;
    padding-left: 10px;
    min-width: 2.3rem;
    z-index: 10;
    color: #999999;
}   
.input-field {
    padding: 10px;
    text-align: center;
}
input, select {
    background: #222222;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    border: 1px solid #e7e9ea;
    border-radius: 32px;
    height: 2rem;
    padding-left: 2.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    width: 100%;
}
.talk-btn {
    height: 2.5rem;
}
@media (max-width: 768px) {
    input, select {
        height: 2.5rem;
    }
    .icon {
        padding-top: 8px;
        padding-left: 15px;
    }
}
</style>