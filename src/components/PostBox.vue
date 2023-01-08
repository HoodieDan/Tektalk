<template>
  <div class="">
    <div class="post-box">
        <PostBoxSkeleton v-if="user === null" />
        <div class="row" v-else>
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
                            v-model="body" ref="body"></vee-field>
                        </div>
                        <div class="col-lg-6 col-md-6 buttons">
                            <div class="attached">
                                <i class="fa-solid fa-paperclip no-underline" :class="iconClass"></i>
                                <p class="subtext mb-0" v-if="!upload_alert" :class="{ 'text-gradient no-underline': (noOfFiles === 1 ) || (noOfFiles === 2)  }" >{{ noOfFiles }} file(s) attached</p>
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
                </vee-form>
            </div>
        </div>
        <TagResults :loading="searching" :users="results" @tag="tag" v-if="show_tag_box" />
        <div v-if="noOfImages !== 0">
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
    </div>
  </div>
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
    name: "PostBox",
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;
        const profile = await axios.get(`/profile?apiKey=${apiKey}`);
        const auth = authStore();
        this.loggedIn = auth.userLoggedIn;
        this.user = profile.data;
    },
    data() {
        return {
            schema: {
                status: "min:0|max:200",
                file_input: "",
                loggedIn: false,
            },
            body: "",
            files: [],
            status: "",
            user: null,
            upload_alert: "",
            show_tag_box: false,
            loading: false,
            searching: false,
            results: null,
            show_upload_alert: false,
            color: 'FFF',
            images: [],
            mentions: []
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
            const bodyArr = this.body.split(' ')

            return link.test(bodyArr[bodyArr.length - 1]);
        },
        search() {
            let link = /@/;
            const bodyArr = this.body.split(' ')

            if (link.test(bodyArr[bodyArr.length - 1])) {
                const user = bodyArr[bodyArr.length - 1]
                return user.slice(1);
            }
        }
    },
    methods: {
        removeImage(image, file) {
            const index = this.images.indexOf(image);
            const index2 = this.files.indexOf(file);

            this.images.splice(index, 1);
            this.files.splice(index2, 1);
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
        },
        async post(values, { resetForm }) {
            const mention = values.status.match(/@\w+/g);
            if (mention) {
                mention.forEach((item) => {
                    this.mentions.push(item.slice(1))
                })
            }
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
                    this.$toast.error(err.response.data.message);

                    return;
                }
                this.$toast.success('Posted Successfully');
            }

            if (this.body === '' && !this.files === []) {
                this.$toast.error('Post body and files cannot be empty.')
            } else {
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
                    mentions: this.mentions,
                })
            }
            this.loading = false;
            resetForm();
            this.files = [];
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
@media (max-width: 330px) {
    .talk-btn {
        padding: 0.5rem;
    }
}
</style>