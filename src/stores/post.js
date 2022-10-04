import { defineStore } from "pinia";
import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;

export const postStore = defineStore('post', {
    state: () => ({
    }),
    getters: {
    },
    actions: {
        async post(values) {
            const response = await axios.post()
            console.log(response);
        }
    }
});