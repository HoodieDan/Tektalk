import axios from 'axios'

axios.defaults.baseURL = 'https://tek-talk.up.railway.app/';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');