import axios from 'axios'

axios.defaults.baseURL = 'https://tektalk.onrender.com/';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
