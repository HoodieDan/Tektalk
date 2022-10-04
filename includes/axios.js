import axios from 'axios'

axios.defaults.baseURL = 'https://tek-talk.herokuapp.com/';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');