import { defineStore } from "pinia";
const apiKey = import.meta.env.VITE_API_KEY;
import { io } from 'socket.io-client'

export const socketStore = defineStore('socket', {
    state: () => ({
        connected: false,
        socket: {},
    }),
    getters: {
    },
    actions: {
        connectToSocket() {
            const url = `https://tektalk.onrender.com`
            this.socket = io(url, {
                transports: ['websocket', 'polling', 'flashsocket'],
                auth: {
                    token: localStorage.getItem('token')
                }
            });

            this.socket.on('connect', () => {
                console.log('connected to socket');
            })
        }
    }
});