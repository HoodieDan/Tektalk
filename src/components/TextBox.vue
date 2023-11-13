<template>
  <!-- <div class=""> -->
    <div class="post-box">
    <TagResults :loading="searching" :users="results" @tag="tag" v-if="show_tag_box" />
    <div v-if="noOfImages !== 0" class="img-display">
        <div
            class="row pt-2 pb-3 pe-3 ps-2 img-wrapper"
        >
            <div :class="{ 'col-12 ps-0': noOfImages === 1, 'col-6 pe-1': noOfImages > 1 }">
                <button class="close-modal" @click="removeImage(images[0], files[0])">
                    <i class="fa-solid fa-xmark light" />
                </button>
                <img
                    :src="images[0]" 
                    alt="" 
                    class="br-5 p-0 user-img"
                    :class="{ 'br-right': noOfImages > 1 }"
                >
            </div>
            <div
                class="col-6 ps-1" 
                v-if="noOfImages > 1"
            >
                <button class="close-modal" @click="removeImage(images[1], files[1])">
                    <i class="fa-solid fa-xmark light" />
                </button>
                <img
                    :src="images[1]" 
                    alt="" 
                    class="br-5 p-0 user-img br-left"
                >
            </div>
        </div>
    </div>
        <div class="form">
            <vee-form class="form" @submit="post" :validation-schema="schema">
                <div class="row w-100">
                    <div class="col-11 d-flex">
                        <vee-field name="status" id="status" :placeholder="placeholder"
                        v-model="body" ref="body"></vee-field>
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
                    </div>
                    <div class="col-1 buttons">
                        <button type="submit" class="talk-btn" :disabled="loading" >
                            <PageLoader :color="color" :height="16" :width="16" v-if="loading" class="p-2" />
                            <i class="fa-regular fa-paper-plane no-hover" v-else></i>
                        </button>
                    </div>
                </div>
                <ErrorMessage class="subtext text-gradient" name="status"></ErrorMessage>
            </vee-form>
        </div>
    </div>
  <!-- </div> -->
</template>

<script>
import axios from 'axios';
import { postStore } from '../stores/post';
import { authStore } from '../stores/auth';
import PageLoader from './PageLoader.vue';
import url from '../../includes/ImgUrl';
import TagResults from './TagResults.vue';
import PostBoxSkeleton from './PostBoxSkeleton.vue';

export default {
    name: "TextBox",
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;
        const auth = authStore();
        this.loggedIn = auth.userLoggedIn;
    },
    data() {
        return {
            schema: {
                status: "",
                file_input: "",
                loggedIn: false,
            },
            body: "",
            files: [],
            status: "",
            upload_alert: "",
            show_tag_box: false,
            loading: false,
            searching: false,
            results: null,
            color: 'FFF',
            images: [],
        };
    },
    computed: {
        noOfFiles() {
            return this.files.length;
        },
        noOfImages() {
            return this.images.length;
        },
        iconClass() {
            if (this.upload_alert === "") {
                return "text-gradient";
            }
            else {
                return "alert";
            }
        },
        isTag() {
            let link = /@/;
            let bodyArr; 
            if (this.body) {
                bodyArr = this.body.split(' ')
                return link.test(bodyArr[bodyArr.length - 1]);
            }
        },
        search() {
            let link = /@/;
            let bodyArr; 
            if (this.body) {
                bodyArr = this.body.split(' ')
            }

            if (bodyArr) {
                if (link.test(bodyArr[bodyArr.length - 1])) {
                    const user = bodyArr[bodyArr.length - 1]
                    return user.slice(1);
                }
            }
        }
    },
    methods: {
        removeImage(image, file) {
            const index = this.images.indexOf(image);
            const index2 = this.files.indexOf(file);

            this.images.splice(index, 1);
            this.files.splice(index2, 1);

            this.$emit('handle', this.files.length)
        },
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

            this.$emit('handle', this.files.length)
        },
        async post(values, { resetForm }) {
            this.loading = true;
            const apiKey = import.meta.env.VITE_API_KEY;
            let res;

            var formData = new FormData();
            this.files.forEach((file) => {
                formData.append("image", file);
            });
            formData.append("text", values.status);
            if (this.upload_alert === "") {
                try {
                    res = await axios.post(`message/${this.$route.params.id}?apiKey=${apiKey}`, formData);
                }
                catch (err) {
                    this.loading = false;
                    this.$toast.error(err.response.data.message);
                    return;
                }
                this.files = [];
                this.$emit('handle', this.files.length)
            }

            if (this.body === '' && !this.files === []) {
                this.$toast.error('Post body and files cannot be empty.')
            } else {
                this.$emit('sent', {
                    id: res.data.messageId,
                    createdAt: new Date().toString(),
                    imagesUrl: this.images,
                    status: 'sender',
                    text: values.status,
                })
            }

            this.loading = false;
            resetForm();
            this.images = [];
        },
        tag(user) {
            const bodyArr = this.body.split(' ');
            bodyArr.pop()

            bodyArr.push(`@${user.username}`)

            this.body = bodyArr.join(' ')
            this.show_tag_box = false;
            this.$refs.body.$el.focus();
        }
    },
    watch: {
        async isTag(newVal) {
            const apiKey = import.meta.env.VITE_API_KEY;
            if (newVal === true) {
                this.show_tag_box = true;
                this.searching = true;
                const bodyArr = this.body.split(' ');
                const user = bodyArr[bodyArr.length - 1]
                const search = user.slice(1)
                let res;

                try {
                    res = await axios.get(`/tag-user?apiKey=${apiKey}&search=${search}`)
                } catch (error) {
                    console.log(error);
                }
                this.results = res.data.users;
                this.searching = false;
            } else {
                this.show_tag_box = false;
            }
        },
        async search(newVal) {
            const apiKey = import.meta.env.VITE_API_KEY;
            let res;

            try {
                res = await axios.get(`/tag-user?apiKey=${apiKey}&search=${newVal}`)
            } catch (error) {
                console.log(error);
                this.$toast.error('Something went wrong');
            }
            this.results = res.data.users;
            this.searching = false;
        },
        show_tag_box(newVal) {
            if (newVal === true) {
                this.$emit('handle', 1)
            } else {
                this.$emit('handle', 0)
            }
        }
    },
    props: ["placeholder", "category", "postedIn"],
    components: { PageLoader, TagResults, PostBoxSkeleton }
}
</script>

<style scoped>
div.post-box {
    width: 100%;
    background-color: #000;
    padding: 0.5rem;
    border-radius: 5px;
}
div.form {
    right: 1rem;
}
div.row.w-100 {
    align-items: center;
}
.col-11 {
    padding-right: 0;
}
.img-display {
    width: 100%;
    background-color: #000;
    z-index: 1000;
}
div.img-wrapper {
    right: 1rem;
    max-height: 50%;
}
div.file-input {
    position: absolute;
    z-index: 5;
    right: 0.2rem;
}
input#status {
    background-color: #000;
    border: 1px solid #FFF;
    color: #e7e9ea;
    width: 100%;
    border-radius: 16px;
    padding: 0.2rem 2.5rem 0.2rem 0.5rem;
}
/* div.form > *, div.buttons > * {
    margin-right: 0.5rem;
} */
.close-modal {
    position: absolute;
    width: 2rem;
    height: 2rem;
    top: 0.5rem;
    right: 1.2rem;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    z-index: 13;
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
  padding: 0.2rem;
  color: #e7e9ea;
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
.img-fluid.col-6 {
    border-radius: 5px;
}
img.user-img {
    object-fit: cover !important;
    height: 100%;
    width: 100%;
    z-index: 10;
    max-height: 400px;
}
.mentions {
    border-top: 1px solid #222222;
}
.user-img:hover {
    filter: opacity(0.8) drop-shadow(0 0 0 #000);
}
.col-6 {
    padding: 0;
}
.br-right {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.br-left {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
@media (max-width: 768px) {
    .col-11 {
        padding-left: 2rem;
    }
}
@media (max-width: 575px) {
    div.img-wrapper {
        left: 0.5rem;
    }
}
</style>