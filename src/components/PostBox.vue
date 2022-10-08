<template>
  <div class="" v-if="user !== null">
    <div class="post-box">
        <div class="row">
            <router-link :to="{name: 'Profile', params: { username: user.username }}" class="col-lg-1 col-md-1 col-sm-2 col-2">
                <div class="circular">
                    <img :src="user.displayUrl" alt="handsome" v-if="user.displayUrl !== null" >
                    <img
                        src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png"
                        alt="profile image" 
                        v-else
                    >
                </div>
            </router-link>
            <div class="col-lg-11 col-md-11 col-sm-10 col-10 form">
                <vee-form class="form" @submit="post" :validation-schema="schema">
                    <div class="row w-100">
                        <div class="col-lg-6 col-md-6 ">
                            <vee-field as="textarea" name="status" id="status" rows="2" :placeholder="placeholder"
                            v-model="body"></vee-field>
                        </div>
                        <div class="col-lg-6 col-md-6 buttons">
                            <div class="attached">
                                <i class="fa-solid fa-paperclip" :class="iconClass"></i>
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
                            <button type="submit" class="talk-btn" :disabled="loading" >
                                <PageLoader :color="color" :height="20" :width="20" v-motion-pop v-if="loading"/>
                                <p class="other-talks" v-motion-pop v-else>Share</p>
                            </button>
                        </div>
                    </div>
                    <ErrorMessage class="subtext text-gradient" name="status"></ErrorMessage>
                    <p class="subtext text-gradient p-0" v-if="show_load_alert">{{ load_alert }}</p>
                </vee-form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { postStore } from '../stores/post';
import PageLoader from './PageLoader.vue';
import url from '../../includes/ImgUrl';

export default {
    name: "PostBox",
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;
        const profile = await axios.get(`/profile?apiKey=${apiKey}`);
        this.user = profile.data;
    },
    data() {
        return {
            schema: {
                status: "required|min:1|max:200",
                file_input: "",
            },
            body: "",
            files: [],
            status: "",
            user: null,
            upload_alert: "",
            loading: false,
            load_alert: "",
            show_load_alert: "",
            show_upload_alert: false,
            color: 'FFF',
            images: [],
        };
    },
    computed: {
        noOfFiles() {
            return this.files.length;
        },
        iconClass() {
            if (this.upload_alert === "") {
                return "text-gradient";
            }
            else {
                return "alert";
            }
        }
    },
    methods: {
        handleFileUpload($event) {
            this.files = [...$event.target.files];
            let pics = [];
            this.files.forEach((file) => {
                // get url function takes in uploaded object and returns a base64 encoded string that can be read inside the img tag 
                url.getUrl(file).then((value) => {
                    this.images.push(value)
                })
                const image = file.type.split("/");
                if (image[0] !== "image") {
                    this.upload_alert = "Upload an image";
                }
                else if (this.noOfFiles > 2) {
                    this.upload_alert = "maximum of 2 images";
                }
                else if (file.size > 5000000) {
                    this.upload_alert = "max size is 5mb";
                }
                else {
                    this.upload_alert = "";
                }
                return;
            });
        },
        async post(values, { resetForm }) {
            this.loading = true;
            const apiKey = import.meta.env.VITE_API_KEY;
            let res;

            const post = postStore();
            var formData = new FormData();
            this.files.forEach((file) => {
                formData.append("image", file);
            });
            formData.append("body", this.body);
            formData.append("category", this.category);
            formData.append("postedIn", this.postedIn);
            if (this.upload_alert === "") {
                try {
                    res = await axios.post(`post?apiKey=${apiKey}`, formData);
                }
                catch (err) {
                    this.loading = false;
                    this.show_load_alert = true;

                    this.load_alert = 'Status update failed. Try Again'

                    return;
                }
            }

            this.show_load_alert = true;
            this.load_alert = 'Posted Successfully!'
            this.loading = false;
            this.$emit('posted', {
                authorId: this.user.userId,
                authorImage: this.user.displayUrl,
                commentCount: 0,
                images: this.images,
                isVerified: this.user.verified,
                likeCount: 0,
                name: this.user.name,
                postBody: this.body,
                postDate: new Date().toString(),
                postId: res.data.postId,
                postedIn: this.postedIn,
                username: this.user.username,
            })
            resetForm();
            this.files = [];
        }
    },
    props: ["placeholder", "category", "postedIn"],
    components: { PageLoader }
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
/* div.form {
    display: flex;
    align-items: center;
}
div.form > *, div.buttons > * {
    margin-right: 0.5rem;
} */
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