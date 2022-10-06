<template>
  <div class="backdrop" @click="closeModal" >
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
div.select-modal {
    width: 50vw;
    height: auto;
    max-height: 70vh;
    background: transparent;
    margin: auto auto;
    display: flex;
    position: relative;
    overflow-y: initial !important;
    overflow-x: hidden;
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
    z-index: 100;
}
.scroll-div {
    overflow-y: auto;
    position: relative;
    /* display: flex;
    align-items: center; */
}
.close-modal {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: transparent;
    border: none;
    z-index: 100001;
}
.img-fluid {
    z-index: 100000;
}
.btn:focus,
.btn:active {
    outline: none;
}
@media (max-width: 575px) {
    div.select-modal {
        width: 90vw;
        height: auto;
        max-height: 80vh;
    }
}
</style>