<template>
<div class="container-sm">
    <div class="text-center w-100 mb-3">
        <h1 class="text-gradient">Tt.</h1>
        <h4>Enter the email you registered with!</h4>
    </div>
    <vee-form @submit="submit" :validation-schema="schema">
        <!-- email  -->
        <label for="email">Email:</label>
        <div class="form-item mt-2 mb-3">
            <i class="fa-regular fa-envelope icon"></i>
            <vee-field id="email" type="email" name="email" class="input field" placeholder="Email" />
        </div>
        <ErrorMessage class="error mb-2 text-gradient" name="email"></ErrorMessage>

        <!-- submit button  -->
        <button type="submit" class="talk-btn w-100 mb-2 mt-5">
            <!-- show loader if logging user in and show button text if not  -->
            <PageLoader :width="30" :height="30" :color="color" v-if="email_in_submission" v-motion-pop />
            <h5 class="light mt-2 mb-2" v-motion-pop v-else>Submit!</h5>
        </button>

        <!-- email error message  -->
        <p class="alert p-0" v-if="email_show_alert">{{ email_alert_message }}</p>
        <p class="text-gradient" v-if="show_success_message">{{ success_message }}</p>
    </vee-form>
</div>
</template>

<script>
import axios from 'axios';
import PageLoader from '../components/PageLoader.vue';

export default {
    name: "ForgotPassword",
    data() {
        return {
            schema: {
                email: "required|min:11|max:100|email",
            },
            email_in_submission: false,
            email_show_alert: false,
            email_alert_message: "",
            success_message: '',
            show_success_message: false,
            color: 'FFF'
        };
    },
    methods: {
        async submit(values) {
            const apiKey = import.meta.env.VITE_API_KEY;
            this.email_in_submission = true;
            this.email_show_alert = false;
            try {
                await axios.get(`get-token?email=${values.email}&apiKey=${apiKey}`)
            }
            catch (error) {
                console.log(error.response.data.status);
                console.log(error);
                this.email_in_submission = false;
                this.email_show_alert = true;
                if (error.response.data.status === 422) {
                    this.email_alert_message = "Email could not be found!";
                } else {
                    this.email_alert_message = "An error occured, please try again later.";
                }
                return;
            }

            this.email_in_submission = false;
            this.show_success_message = true;
            this.success_message = 'Reset email sent!'
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