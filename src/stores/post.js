import { defineStore } from "pinia";
import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;

export const postStore = defineStore('post', {
    state: () => ({
        ImageModalIsOpen: false,
        selectedImage: '',
    }),
    getters: {
    },
    actions: {
        async post(formData) {
            const response = await axios.post(`post?apiKey=${apiKey}`, formData);
            console.log(response);
        },
        viewImage(image) {
            this.selectedImage = image;

            this.ImageModalIsOpen = true;
        },
        closeImage() {
            this.ImageModalIsOpen = false

            this.selectedImage = ''
        },
    }
});

// {
//     image: values.file ? values.file_input[0] : '',
//     image: (values.file && values.file.length ===2) ? values.file_input[1] : '',
//     body: values.body,
// }