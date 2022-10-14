<template>
<div class="container-sm">
    <div class="text-center w-100 mb-3">
        <h1 class="text-gradient">Tt.</h1>
        <h4>Hello {{ email }}!</h4>
    </div>
    <vee-form @submit="password" :validation-schema="passwordSchema">
        <!-- password -->
        <label for="paswword">Password:</label>
        <div class="form-item mt-2 mb-3">
            <i class="fa-solid fa-lock icon"></i>
            <vee-field id="password" type="password" name="password" class="input field" placeholder="Password" />
        </div>
        <ErrorMessage class="error-message mb-2 text-gradient d-block" name="password"></ErrorMessage>

        <!-- confirm password  -->
        <label for="confirm_password">Confirm Password:</label>
        <div class="form-item mt-2 mb-3">
            <i class="fa-solid fa-lock icon"></i>
            <vee-field name="confirm_password" id="confirm_password" type="password" class="input field" placeholder="Confirm Password" />
        </div>
        <ErrorMessage class="error mb-2 text-gradient`d-block" name="confirm_password"></ErrorMessage>

        <!-- password button  -->
        <button type="submit" class="talk-btn w-100 mb-2 mt-5">
            <!-- show loader if logging user in and show button text if not  -->
            <PageLoader :width="30" :height="30" :color="color" v-if="password_in_submission" v-motion-pop />
            <h5 class="light mt-2 mb-2" v-motion-pop v-else>Submit!</h5>
        </button>

        <!-- password error message  -->
        <p class="alert p-0" v-if="password_show_alert">{{ password_alert_message }}</p>

        <p class="text-gradient" v-if="show_success_message">{{ success_message }}</p>
    </vee-form>
</div>
</template>

<script>
import PageLoader from '../components/PageLoader.vue';
import axios from 'axios';

export default {
    name: "ResetPassword",
    data() {
        return {
            passwordSchema: {
                password: "required|min:8|max:30",
                confirm_password: "passwords_mismatch:@password",
            },
            password_in_submission: false,
            password_show_alert: false,
            password_alert_message: "",
            color: 'FFF',
            success_message: '',
            show_success_message: false,
            email: null,
        };
    },
    methods: {
        async password(values) {
            const apiKey = import.meta.env.VITE_API_KEY;
            this.password_in_submission = true;
            this.password_show_alert = false;
            try {
                await axios.patch(`update-password?apiKey=${apiKey}&newPassword=${values.password}&email=${this.email}`)
            }
            catch (error) {
                this.password_in_submission = false;
                this.password_show_alert = true;
                this.password_alert_message = "An error occured while changing you password, please try again later.";
                return;
            }

            this.show_success_message = true;
            this.success_message = 'Password changed successfully!'
            this.password_in_submission = false;
            this.$router.push({ name: 'SignIn' })
        }
    },
    async beforeRouteEnter(to, from, next) {
        const apiKey = import.meta.env.VITE_API_KEY;
        const token = to.query.token;
        const res = await axios.post(`verify-token?apiKey=${apiKey}&token=${token}`)
        if (res.status === 200) {
            next((vm) => {
                vm.email = res.data.email;
            })
        } else {
            this.$router.push({ name: 'Home' })
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