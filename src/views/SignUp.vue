<template>
  <div class="container-sm">
    <div class="text-center w-100">
        <h1 class="text-gradient no-underline">Tt.</h1>
        <h3>Welcome to Tektalk!</h3>
    </div>
    <!-- registeration form  -->
    <vee-form @submit="register" :validation-schema="schema">

        <!-- name  -->
        <label for="name">Name:</label>
        <div class="form-item mt-2 mb-3">
            <i class="fa-solid fa-signature icon"></i>
            <vee-field name="name" id="name" type="text" class="input field" placeholder="Name" />
        </div>
        <ErrorMessage class="error mb-2 text-gradient" name="name"></ErrorMessage>

        <!-- username  -->
        <label for="username">Username:</label>
        <div class="form-item mt-2 mb-3">
            <i class="fa-solid fa-at icon"></i>
            <vee-field name="username" id="username" type="text" class="input field" placeholder="Username" />
        </div>
        <ErrorMessage class="error mb-2 text-gradient" name="username"></ErrorMessage>

        <!-- email  -->
        <label for="email">Email:</label>
        <div class="form-item mt-2 mb-3">
            <i class="fa-regular fa-envelope icon"></i>
            <vee-field name="email" id="email" type="email" class="input field" placeholder="Email" />
        </div>
        <ErrorMessage class="error mb-2 text-gradient" name="email"></ErrorMessage>

        <!-- location  -->
        <label for="location">Location:</label>
        <div class="form-item mt-2 mb-3">
            <i class="fa-solid fa-location-crosshairs icon"></i>
            <vee-field name="location" id="location" type="text" class="input field" placeholder="Location" />
        </div>
        <ErrorMessage class="error mb-2 text-gradient" name="location"></ErrorMessage>

        <!-- stack  -->
        <label for="name">Area of Expertise:</label>
        <div class="form-item mt-2 mb-3">
            <i class="fa-solid fa-code icon"></i>
            <vee-field as="select" name="stack" id="stack" class="input field" placeholder="Email" >
                <option value="Frontend Development" >Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
                <option value="Fullstack Development">Fullstack Development</option>
                <option value="DevOps">DevOps</option>
                <option value="Design">UI/UX Design</option>
                <option value="Guest">Product Design</option>
                <option value="ML/AI">ML/AI</option>
                <option value="Data Science">Data Science</option>
                <option value="App Development">App Development</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Game Development">Game Development</option>
                <option value="CyberSecurity">CyberSecurity</option>
                <option value="Technical Writing">Technical Writing</option>
                <option value="Guest">Guest</option>
                <option value="I do not want to put myself in a box">I do not want to put myself in a box</option>
                <option value="I am yet to decide">I am yet to decide</option>
                <option value="I don't know, man">I don't know, man</option>
            </vee-field>
        </div>
        <ErrorMessage class="error mb-2 text-gradient" name="stack"></ErrorMessage>

        <!-- password  -->
        <label for="paswword">Password:</label>
        <div class="form-item mt-2 mb-3">
            <i class="fa-solid fa-lock icon"></i>
            <vee-field name="password" id="password" type="password" class="input field" placeholder="Password" />
        </div>
        <ErrorMessage class="error mb-2 text-gradient" name="password"></ErrorMessage>

        <!-- confirm password  -->
        <label for="confirm_password">Confirm Password:</label>
        <div class="form-item mt-2 mb-3">
            <i class="fa-solid fa-lock icon"></i>
            <vee-field name="confirm_password" id="confirm_password" type="password" class="input field" placeholder="Confirm Password" />
        </div>
        <ErrorMessage class="error mb-2 text-gradient" name="confirm_password"></ErrorMessage>

        <!-- register button  -->
        <button type="submit" class="talk-btn w-100 mb-2 mt-5" :disabled="reg_in_submission">
            <PageLoader :color="color" :height="20" :width="20" v-motion-pop v-if="reg_in_submission" />
            <h5 class="light mt-2 mb-2" v-motion-pop v-else>Register!</h5>
        </button>

        <!-- redirect to login  -->
        <p class="subtext">Already have an account? <router-link :to="{ name: 'SignIn' }" class="text-gradient">Sign in</router-link></p>
    </vee-form>
  </div>
</template>

<script>
import { authStore } from '../stores/auth'
import PageLoader from '../components/PageLoader.vue';

export default {
    name: "SignUp",
    data() {
        return {
            schema: {
                name: "required|min:1|max:50|alpha_spaces",
                email: "required|min:11|max:100|email",
                username: "required|min:1|max:25",
                password: "required|min:8|max:30",
                confirm_password: "passwords_mismatch:@password",
                location: "required|min:3",
                stack: "required",
            },
            reg_in_submission: false,
            color: 'FFF',
        };
    },
    methods: {
        async register(values) {
            this.reg_in_submission = true;
            const auth = authStore();
            try {
                await auth.register(values);
            }
            catch (error) {
                this.reg_in_submission = false;
                console.error(error.response.data.message);

                this.$toast.error(error.response.data.errors[0].msg);
                return;
            }

            this.reg_in_submission = false;
            this.$toast.success('You have been registered Successfully!');
            window.location.reload();
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
    text-indent: 2.5rem;
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