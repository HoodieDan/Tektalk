import { defineStore } from "pinia";
import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;

export const authStore = defineStore('auth', {
    state: () => ({
        userLoggedIn: false,
        user: null,
    }),
    getters: {
        getUser() {
            return this.user
        }
    },
    actions: {
        loggedIn() {
            this.userLoggedIn = true;
        },
        async register(values) {
            const response = await axios.post(`/auth/signup?apiKey=${apiKey}`, {
                email: values.email,
                password: values.password,
                confirmPassword: values.confirm_password,
                stack: values.stack,
                username: values.username,
                location: values.location,
                name: values.name,
            })

            localStorage.setItem('uid', response.data.userId)
            localStorage.setItem('token', response.data.token);

            this.loggedIn()
        },
        async login(values) {
            const response = await axios.post(`/auth/login?apiKey=${apiKey}`, {
                email: values.email,
                password: values.password,
            })

            localStorage.setItem('uid', response.data.userId)
            localStorage.setItem('token', response.data.token)

            this.loggedIn()
        },
        setLoggedInUser(user) {
            this.user = user;
        },
        signOut() {
            this.userLoggedIn = false;
        },
        async getCurrentUser () {
            const profile = await axios.get(`/profile?apiKey=${apiKey}`)
            this.user = profile.data;
        }
    }
});