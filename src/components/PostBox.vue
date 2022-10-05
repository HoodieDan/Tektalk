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
                <vee-form @submit="post" :validation-schema="schema">
                    <div class="row w-100">
                        <div class="col-lg-6 col-md-6 ">
                            <vee-field as="textarea" name="status" id="status" :class="{ 'stop-typing': tooLong }" rows="2" :placeholder="placeholder"
                            v-model="body"></vee-field>
                        </div>
                        <div class="col-lg-6 col-md-6 buttons">
                            <div class="attached">
                                <i class="fa-solid fa-paperclip"></i>
                                <p class="subtext mb-0" v-if="!upload_alert" :class="{ 'text-gradient': (noOfFiles === 1 ) || (noOfFiles === 2)  }" >{{ noOfFiles }} file(s) attached</p>
                                <p class="subtext mb-0 p-0 alert" v-else>{{ upload_alert }}</p>
                            </div>
                            <div class="file-input">
                                <vee-field
                                    type="file"
                                    name="file_input"
                                    id="file_input"
                                    class="file-input__input"
                                    @change="handleFileUpload($event)"
                                    multiple
                                />
                                <label class="file-input__label" for="file_input">
                                    <i class="fa-regular fa-image"></i></label>
                            </div>
                            <button type="submit" class="talk-btn">
                                <p class="other-talks">Share</p>
                            </button>
                        </div>
                    </div>
                    <ErrorMessage class="subtext text-gradient" name="status"></ErrorMessage>
                </vee-form>
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
            schema: {
                status: 'required|min:1',
                file_input:'',
            },
            body: '',
            files: [],
            status: '',
            user: null,
            file: [],
            upload_alert: '',
            show_upload_alert: false,
        }
    },
    computed: {
        tooLong() {
            return this.status.length >= 140
        },
        noOfFiles() {
            return this.files.length;
        }
    },
    methods: {
        handleFileUpload($event) {
            this.files = [...$event.target.files]
            // console.log(this.show_upload_alert);

            this.files.forEach((file) => {
                const image = file.type.split('/');
                console.log(image);
                if (image[0] !== 'image') {
                    this.upload_alert = 'Upload an image';
                } else if (this.noOfFiles > 2) {
                    this.upload_alert = 'maximum of 2 images';
                } else if (file.size > 8000000) {
                    this.upload_alert = 'max size is 5mb';
                } else {
                    this.upload_alert = ''
                }
                return;
            })
        },
        async post(values, {resetForm}) {
            const post = postStore();

            var formData = new FormData();
            this.files.forEach((file) => {
                formData.append('image', file)
            })
            formData.append('body', this.body)
            formData.append('category', this.postedIn)

            if (this.upload_alert === '') {
                try {
                    await post.post(formData);
                } catch (err) {
                    console.log(err);
                }
            }

            resetForm();
            this.files = [];
        }
    },
    props: ['placeholder', 'category', 'postedIn']
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