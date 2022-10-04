<template>
  <div class="" v-if="user !== null">
    <div class="post-box">
        <div class="row">
            <router-link :to="{name: 'Profile', params: { username: user.username }}" class="col-lg-1 col-md-1 col-sm-2 col-2">
                <div class="circular">
                    <img :src="user.displayUrl" alt="handsome">
                </div>
            </router-link>
            <div class="col-lg-11 col-md-11 col-sm-10 col-10 form">
                <!-- <input type="text" name="status" class="status" placeholder="What's on your mind?"> -->
                <div class="row w-100">
                    <div class="col-lg-6 col-md-6 ">
                        <textarea name="status" id="status" :class="{ 'stop-typing': tooLong }" rows="2" placeholder="What's on your mind?"
                        v-model="status"></textarea>
                    </div>
                    <div class="col-lg-6 col-md-6 buttons">
                        <div class="attached">
                            <i class="fa-solid fa-paperclip"></i>
                            <p class="subtext mb-0">0 file(s) attached</p>
                        </div>
                        <div class="file-input">
                            <input
                                type="file"
                                name="file-input"
                                id="file-input"
                                class="file-input__input"
                            />
                            <label class="file-input__label" for="file-input">
                                <i class="fa-regular fa-image"></i></label>
                        </div>
                        <div class="talk-btn">
                            <p class="other-talks">Share</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PostBox',
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;

        const profile = await axios.get(`/profile?apiKey=${apiKey}`)
        this.user = profile.data;
    },
    data() {
        return {
            status: '',
            user: null,
        }
    },
    computed: {
        tooLong() {
            return this.status.length >= 140
        }
    },
}
</script>

<style scoped>
div.post-box {
    width: 100%;
    background-color: #000;
    padding: 1.5rem 1rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
}
div.form {
    display: flex;
    align-items: center;
}
div.form > *, div.buttons > * {
    margin-right: 0.5rem;
}
textarea {
    background: transparent;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    border: none;
    width: 100%;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    resize: none;
}
textarea:focus {
    outline-style: none;
}
.stop-typing {
    pointer-events: none;
}
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.talk-btn {
  padding: 0.5rem 2rem;
}
.other-talks {
  margin: 0;
}
div.buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
div.attached {
    display: flex;
    align-items: center;
}
.fa-paperclip:hover {
    background-color: transparent;
    color: #e7e9ea;
    cursor: default;
}
@media (max-width: 330px) {
    .talk-btn {
        padding: 0.5rem;
    }
}
</style>