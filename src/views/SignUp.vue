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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle icon" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
            <vee-field name="name" id="name" type="text" class="input field" placeholder="Name" />
        </div>
        <ErrorMessage class="error mb-2 alert" name="name"></ErrorMessage>

        <!-- username  -->
        <label for="username">Username:</label>
        <div class="form-item mt-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-at icon" viewBox="0 0 16 16">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914"/>
            </svg>
            <vee-field name="username" id="username" type="text" class="input field" placeholder="Username" />
        </div>
        <ErrorMessage class="error mb-2 alert" name="username"></ErrorMessage>

        <!-- email  -->
        <label for="email">Email:</label>
        <div class="form-item mt-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at icon" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
            </svg>
            <vee-field name="email" id="email" type="email" class="input field" placeholder="Email" />
        </div>
        <ErrorMessage class="error mb-2 alert" name="email"></ErrorMessage>

        <!-- location  -->
        <label for="location">Location:</label>
        <div class="form-item mt-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt icon" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            </svg>
            <vee-field name="location" id="location" type="text" class="input field" placeholder="Location" />
        </div>
        <ErrorMessage class="error mb-2 alert" name="location"></ErrorMessage>

        <!-- stack  -->
        <label for="name">Area of Expertise:</label>
        <div class="form-item mt-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash icon" viewBox="0 0 16 16">
                <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>
            </svg>
            <vee-field as="select" name="stack" id="stack" class="input field" placeholder="Email" >
                <option value="Frontend Development" >Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
                <option value="Fullstack Development">Fullstack Development</option>
                <option value="DevOps">DevOps</option>
                <option value="Design">UI/UX Design</option>
                <option value="Guest">Product Design</option>
                <option value="ML/AI">Mobile Development</option>
                <option value="ML/AI">Data Analysis</option>
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
        <ErrorMessage class="error mb-2 alert" name="stack"></ErrorMessage>

        <!-- password  -->
        <label for="paswword">Password:</label>
        <div class="form-item mt-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock icon" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
            </svg>
            <vee-field name="password" id="password" :type="type1" class="input field" placeholder="Password" />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#01BAEF" class="bi bi-eye view" viewBox="0 0 16 16" @click="toggleShowPassword(1)" v-motion-pop v-if="!showPassword1">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#01BAEF" class="bi bi-eye-slash view" viewBox="0 0 16 16" @click="toggleShowPassword(1)" v-motion-pop v-else>
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
            </svg>
        </div>
        <ErrorMessage class="error mb-2 alert" name="password"></ErrorMessage>

        <!-- confirm password  -->
        <label for="confirm_password">Confirm Password:</label>
        <div class="form-item mt-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock icon" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
            </svg>
            <vee-field name="confirm_password" id="confirm_password" :type="type2" class="input field" placeholder="Confirm Password" />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#01BAEF" class="bi bi-eye view" viewBox="0 0 16 16" @click="toggleShowPassword(2)" v-motion-pop v-if="!showPassword2">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#01BAEF" class="bi bi-eye-slash view" viewBox="0 0 16 16" @click="toggleShowPassword(2)" v-motion-pop v-else>
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
            </svg>
        </div>
        <ErrorMessage class="error mb-2 alert" name="confirm_password"></ErrorMessage>

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
                username: "required|min:1|max:25|alpha_num",
                password: "required|min:8|max:30",
                confirm_password: "passwords_mismatch:@password",
                location: "required|min:3",
                stack: "required",
            },
            reg_in_submission: false,
            color: 'FFF',
            showPassword1: false,
            showPassword2: false,
            type1: 'password',
            type2: 'password',
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
        },
        toggleShowPassword(num) {
            if (num === 1) {
                this.showPassword1 = !this.showPassword1;
                if (this.type1 === 'password') {
                this.type1 = 'text';
                } else {
                    this.type1 = 'password';
                }
            } else {
                this.showPassword2 = !this.showPassword2;
                if (this.type2 === 'password') {
                this.type2 = 'text';
                } else {
                    this.type2 = 'password';
                }
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
    text-indent: 2.5rem;
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