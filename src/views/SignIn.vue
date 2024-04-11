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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at icon" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
            </svg>
            <vee-field id="email" type="email" name="email" class="input field" placeholder="Email" />
        </div>
        <ErrorMessage class="error mb-2 alert" name="email"></ErrorMessage>

        <!-- password  -->
        <label for="paswword">Password:</label>
        <div class="form-item mt-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock icon" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
            </svg>
            <vee-field id="password" :type="type" name="password" class="input field" placeholder="Password" />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#01BAEF" class="bi bi-eye view" viewBox="0 0 16 16" @click="toggleShowPassword" v-motion-pop v-if="!showPassword">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#01BAEF" class="bi bi-eye-slash view" viewBox="0 0 16 16" @click="toggleShowPassword" v-motion-pop v-else>
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
            </svg>
        </div>
        <ErrorMessage class="error mb-2 alert" name="password"></ErrorMessage>

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
            color: 'FFF',
            showPassword: false,
            type: 'password',
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
        },
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
            if (this.type === 'password') {
                this.type = 'text';
            } else {
                this.type = 'password';
            }
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
    margin-top: 0.5rem;
    min-width: 2.3rem;
    z-index: 10;
    color: #999999;
    position: absolute;
}   
.view {
    margin-top: 0.5rem;
    min-width: 2.3rem;
    z-index: 10;
    color: #999999;
    position: absolute;
    right: 0;
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
.error {
    font-size: 0.9rem;
}
.talk-btn {
    height: 2.5rem;
}
@media (max-width: 768px) {
    input, select {
        height: 2.5rem;
    }
    .icon {
        margin-top: 0.7rem;
        margin-left: 0.2rem;
    }
    .view {
        margin-top: 0.7rem
    }
    .error {
        font-size: 0.8rem;
    }
    h5 {
        font-size: 1rem
    }
}
</style>