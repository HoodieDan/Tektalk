<template>
  <div @scroll.prevent @wheel.prevent class="backdrop" @click="closeModal" >
    <div class="select-modal">
        <div class="scroll-div">
            <button class="close-modal" @click="closeModal()">
                <i class="fa-solid fa-xmark light" />
            </button>
            <img :src="image" alt="" class="img-fluid" >
        </div>
    </div>
  </div>
</template>

<script>
import { postStore } from '../stores/post'

export default {
    name: 'ImageModal',
    data() {
        return {
            image: ''
        }
    },
    mounted() {
        const post = postStore();

        this.image = post.selectedImage
    },
    methods: {
        closeModal() {
            const post = postStore();

            post.closeImage()
        }
    },
}
</script>

<style scoped>
*::-webkit-scrollbar {
  width: 0.3em;
}
 
*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #A9A9A9;
  outline: 1px solid #A9A9A9;
}
div.select-modal {
    width: auto;
    height: auto;
    max-height: 90vh !important;
    background: transparent;
    margin: auto auto;
    display: flex;
    position: relative;
    /* overflow-y: initial !important;
    overflow-x: hidden; */
}
div.backdrop {
    display: flex;
    justify-content: center;
    align-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100001;
}
.scroll-div {
    /* overflow-y: auto; */
    position: relative;
    /* display: flex;
    align-items: center; */
}
.close-modal {
    position: absolute;
    width: 2rem;
    height: 2rem;
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    z-index: 1000003;
}
.img-fluid {
    z-index: 1000002;
    max-height: 90vh;
}
.btn:focus,
.btn:active {
    outline: none;
}
.img-fluid:hover {
    filter: none;
}
</style>