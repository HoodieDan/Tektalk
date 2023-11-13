import { defineStore } from "pinia";
import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;

export const chatStore = defineStore('chat', {
    state: () => ({
        user: null,
        prevRoute: null,
    }),
    getters: {
    },
    actions: {
        setUser(user) {
            this.user = user;
        },
        setPrevRoute(route) {
            this.prevRoute = route
        }
    }
});