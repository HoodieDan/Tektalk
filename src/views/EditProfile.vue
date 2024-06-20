<template>
  <div class="container">
    <div class="edit pt-4 pb-4 mb-3">
        <div class="container-sm">
            <div class="text-center w-100">
                <h1 class="text-gradient">Tt.</h1>
                <h3>Update Your Profile!</h3>
            </div>
            <!-- registration form  -->
            <vee-form @submit="update" :validation-schema="schema">

                <!-- backdrop image -->
                <div class="file-input">
                    <div class="d-flex">
                        <h6>Backdrop Image:</h6>
                        <p class="ms-auto clear mb-0" @click="backdropUrl = ''; user.backdropUrl = null">remove<i class="fa-solid fa-eraser"></i></p>
                        <p class="ms-auto clear mb-0" v-if="backdropUrl !== ''" @click="backdropUrl = ''">revert<i class="fa-solid fa-backward"></i></p>
                    </div>
                    <div class="backdrop">
                        <img v-if="user.backdropUrl !== null && backdropUrl === ''" :src="user.backdropUrl" alt="backdrop image" v-motion-pop >
                        <img v-if="backdropUrl !== ''" :src="backdropUrl" alt="backdrop image" v-motion-pop >
                    </div>
                    <vee-field
                        type="file"
                        name="backdropImage"
                        id="backdropImage"
                        class="file-input__input"
                        @change="backdropImageUpload($event)"
                    />
                    <label class="file-input__label mb-3 dark" for="backdropImage">
                        Edit backdrop image<i class="fa-regular fa-image"></i></label>
                </div>

                <!-- Profile image -->
                <div class="file-input">
                    <div class="d-flex">
                        <h6>Profile Image:</h6>
                        <p class="ms-auto clear mb-0" @click="profileUrl = ''; user.displayUrl = null">remove<i class="fa-solid fa-eraser"></i></p>
                        <p class="ms-auto clear mb-0" v-if="profileUrl !== ''" @click="profileUrl = ''">revert<i class="fa-solid fa-eraser"></i></p>
                    </div>
                    <div class="circular">
                        <img v-if="profileUrl !== ''" :src="profileUrl" alt="profile image" v-motion-pop >
                        <img v-if="user.displayUrl !== null && profileUrl === ''" :src="user.displayUrl" alt="profile image"  v-motion-pop >
                        <img
                            src="../assets/images/avatar.webp"
                            alt="profile image"
                            v-if="user.displayUrl === null && profileUrl === ''"
                            v-motion-pop
                        >
                    </div>
                    <vee-field
                        type="file"
                        name="profileImage"
                        id="profileImage"
                        class="file-input__input"
                        @change="profileImageUpload($event)"
                    />
                    <label class="file-input__label mb-3 dark" for="profileImage">
                        Edit display image<i class="fa-regular fa-image"></i></label>
                </div>

                <!-- name  -->
                <label for="name">Name:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-solid fa-signature icon"></i>
                    <vee-field name="name" id="name" type="text" class="input field" placeholder="Name" v-model="user.name" />
                </div>
                <ErrorMessage class="error mb-2 alert" name="name"></ErrorMessage>

                <!-- username  -->
                <label for="username">Username:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-solid fa-at icon"></i>
                    <vee-field name="username" id="username" type="text" class="input field" placeholder="Username" v-model="user.username" />
                </div>
                <ErrorMessage class="error mb-2 alert" name="username"></ErrorMessage>

                <!-- email  -->
                <label for="email">Email:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-regular fa-envelope icon"></i>
                    <vee-field name="email" id="email" type="email" class="input field" placeholder="Email"  v-model="user.email" />
                </div>
                <ErrorMessage class="error mb-2 alert" name="email"></ErrorMessage>

                <!-- location  -->
                <label for="location">Location:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-solid fa-location-crosshairs icon"></i>
                    <vee-field name="location" id="location" type="text" class="input field" placeholder="Location"  v-model="user.location" />
                </div>
                <ErrorMessage class="error mb-2 alert" name="location"></ErrorMessage>

                <!-- stack  -->
                <label for="name">Area of Expertise:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-solid fa-code icon"></i>
                    <vee-field as="select" name="stack" id="stack" class="input field" placeholder="Email"  v-model="user.stack" >
                        <option value="Frontend Development" >Frontend Development</option>
                        <option value="Backend Development">Backend Development</option>
                        <option value="Fullstack Development">Fullstack Development</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Design">UI/UX Design</option>
                        <option value="Guest">Product Design</option>
                        <option value="ML/AI">Mobile Development</option>
                        <option value="ML/AI">Data Analysis</option>
                        <option value="ML/AI">ML/AI</option>
                        <option value="Data Science">Data Science</option>
                        <option value="App Development">App Development</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                        <option value="Game Development">Game Development</option>
                        <option value="CyberSecurity">CyberSecurity</option>
                        <option value="Technical Writing">Technical Writing</option>
                        <option value="Guest">Guest</option>
                        <option value="I do not want to put myself in a box">I do not want to put myself in a box</option>
                        <option value="I am yet to decide">I am yet to decide</option>
                        <option value="I don't know, man">I don't know, man</option>
                    </vee-field>
                </div>
                <ErrorMessage class="error mb-2 alert" name="stack"></ErrorMessage>

                <!-- github  -->
                <label for="location">Github link:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-brands fa-github icon"></i>
                    <vee-field name="github" id="github" type="text" class="input field" placeholder="Github Link"  v-model="user.socials.github" />
                </div>
                <ErrorMessage class="error mb-2 alert" name="github"></ErrorMessage>
                
                <!-- instagram  -->
                <label for="location">Instagram link:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-brands fa-instagram icon"></i>
                    <vee-field name="instagram" id="instagram" type="text" class="input field" placeholder="Instagram Link"  v-model="user.socials.instagram" />
                </div>
                <ErrorMessage class="error mb-2 alert" name="instagram"></ErrorMessage>
                
                <!-- linkedin  -->
                <label for="location">LinkedIn link:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-brands fa-linkedin-in icon"></i>
                    <vee-field name="linkedin" id="linkedin" type="text" class="input field" placeholder="Linkedin Link"  v-model="user.socials.linkedin" />
                </div>
                <ErrorMessage class="error mb-2 alert" name="linkedin"></ErrorMessage>
                
                <!-- twitter  -->
                <label for="location">Twitter link:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-brands fa-x-twitter icon"></i>
                    <vee-field name="twitter" id="twitter" type="text" class="input field" placeholder="Twitter link"  v-model="user.socials.twitter" />
                </div>
                <ErrorMessage class="error mb-2 alert" name="twitter"></ErrorMessage>

                <!-- Bio  -->
                <label for="paswword">Bio:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-solid fa-user-pen bio-icon"></i>
                    <vee-field
                     as="textarea" 
                     rows="3" 
                     name="bio" 
                     id="bio" 
                     type="text" 
                     class="input field" 
                     placeholder="Let others know something about you!" 
                     v-model="user.bio"
                    />
                </div>
                <ErrorMessage class="error mb-2 alert" name="bio"></ErrorMessage>

                <!-- update button  -->
                <button type="submit" class="talk-btn w-100 mb-2 mt-5" :disabled="loading">
                    <h5 class="light mt-2 mb-2 update" v-motion-pop v-if="!loading">Update!</h5>
                    <PageLoader :color="color" :height="20" :width="20" v-motion-pop v-else />
                </button>

                <!-- update error message  -->
                <p class="alert p-3" v-if="show_alert">{{ alert_message }}</p>
            </vee-form>
            <p class="text-gradient" v-if="successful" >{{ success_message }}</p>
        </div>
    </div>
  </div>
</template>

<script>
import PageLoader from '../components/PageLoader.vue';
import axios from 'axios';
import url from '../../includes/ImgUrl';
import { authStore } from '../stores/auth';

export default {
    name: "EditProfile",
    async beforeRouteEnter(to, from, next) {
        const apiKey = import.meta.env.VITE_API_KEY;
        const auth = authStore();
        let profile;
        try {
          profile = await axios.get(`/profile?apiKey=${apiKey}`)
        } catch (error) {
          if (error.response.data.message === 'Unable to verify token') {
            auth.signOut()
            localStorage.clear()
            return;
          }
        }
        
        next((vm) => {
            vm.profile = profile.data;
            vm.user.name = profile.data.name;
            vm.user.username = profile.data.username;
            vm.user.email = profile.data.email;
            vm.user.location = profile.data.location;
            vm.user.stack = profile.data.stack;
            vm.user.bio = profile.data.bio;
            vm.user.displayUrl = profile.data.displayUrl;
            vm.user.backdropUrl = profile.data.backdropUrl;
            vm.user.socials.github = profile.data.socials.github;
            vm.user.socials.instagram = profile.data.socials.instagram;
            vm.user.socials.twitter = profile.data.socials.twitter;
            vm.user.socials.linkedin = profile.data.socials.linkedIn;
        })
    },
    data() {
        return {
            stacks: [
                "Frontend Development",
                "Backend Development",
                "Fullstack Development",
                "DevOps",
                "Design",
                "Data Science",
                "App Development",
                "Game Development",
                "CyberSecurity",
                "Guest",
                "I do not want to put myself in a box",
                "I am yet to decide",
            ],
            schema: {
                backdropImage: '',
                profileImage: '',
                name: "required|min:3|max:100|alpha_spaces",
                email: "required|min:11|max:100|email",
                username: "required|min:1|max:25|alpha_num",
                location: "required|min:3",
                stack: "required",
                bio: "min:1|max:200",
                github: "",
                instagram: "",
                linkedin: "",
                twitter: "",
            },
            user: {
                name: '',
                username: '',
                email: '',
                location: '',
                stack: '',
                bio: '',
                displayUrl: null,
                backdropUrl: null,
                socials: {
                    github: "",
                    instagram: "",
                    linkedin: "",
                    twitter: "",
                }
            },
            loading: false,
            show_alert: false,
            alert_message: "",
            color: 'FFF',
            profile: null,
            profileImg: [],
            profileUrl: '',
            backdropImg: [],
            backdropUrl: '',
            images: [],
            successful: false,
            success_message: '',
        };
    },
    methods: {
        async update(values) {
            const apiKey = import.meta.env.VITE_API_KEY;
            this.show_alert = false;
            this.loading = true;
            let formData = new FormData();
            if (this.profileUrl) {
                formData.append('display', values.profileImage);
            } else if (!this.user.displayUrl) {
                formData.append('noDisplay', 'true' );
            }
            if (this.backdropUrl) {
                formData.append('backdrop', values.backdropImage);
            } else if (!this.user.backdropUrl) {
                formData.append('noBackdrop', 'true');
            }
            formData.append('name', values.name);
            formData.append('username', values.username);
            formData.append('email', values.email);
            formData.append('stack', values.stack);
            formData.append('location', values.location);
            formData.append('bio', values.bio);
            formData.append('instagram', values.instagram);
            formData.append('twitter', values.twitter);
            formData.append('linkedIn', values.linkedin);
            formData.append('github', values.github);

            let updated;
            try {
                updated = await axios.patch(`/profile/edit?apiKey=${apiKey}`, formData);
            } catch (error) {
                this.loading = false;
                this.$toast.error(error.response.data.errors[0].msg);
                return;
            }
            
            this.$toast.success('Profile Updated Successfully');
            window.location.reload();
        },
        profileImageUpload($event) {
            this.profileImg = [...$event.target.files];
            this.profileImg.forEach((file) => {
                // get url function takes in uploaded object and returns a base64 encoded string that can be read inside the img tag 
                url.getUrl(file).then((value) => {
                    this.profileUrl = value;
                })
            });
        },
        backdropImageUpload($event) {
            this.backdropImg = [...$event.target.files];
            this.backdropImg.forEach((file) => {
                // get url function takes in uploaded object and returns a base64 encoded string that can be read inside the img tag 
                url.getUrl(file).then((value) => {
                    this.backdropUrl = value
                })
            });
        },
    },
    components: { PageLoader }
}
</script>

<style scoped>
input[type='text'] {
    padding: 0.5rem 1rem 0.5rem 0;
}
div.backdrop {
    width: 100%;
    height: 150px;
    border-radius: 5px;
}
.backdrop img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
}
div.circular {
    width: 200px;
    height: 200px;
}
/* .circular img {
    transform: translate(-50%, -50%) !important;
} */
.clear {
    cursor: pointer;
}
.clear:hover {
    color: #01BAEF;
}
.edit {
    background-color: #000;
    border-radius: 5px;
}
.fa-brands {
    padding-bottom: 0.5rem;
}
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.file-input__label {
    cursor: pointer;
}
.file-input__label:hover {
    color: #01BAEF;
}
.form-item i {
    position: absolute;
    bottom: -1px;
}  
.form-item i:hover {
    background-color: transparent !important;
}
.form-item {
    width: 100%;
    /* margin-bottom: 0.6rem; */
} 
.icon {
    padding-top: 12px;
    padding-left: 10px;
    min-width: 2.3rem;
    z-index: 10;
    color: #999999;
}
.bio-icon {
    padding-bottom: 3.9rem;
    padding-left: 10px;
    min-width: 2.3rem;
    z-index: 10;
    color: #999999;
}
.input-field {
    padding: 10px;
    text-align: center;
}
input, select, textarea {
    background: #000;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    border: 1px solid #e7e9ea;
    border-radius: 5px;
    height: 2.2rem;
    text-indent: 2.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    width: 100%;
}
textarea {
    padding: 0.5rem;
    resize: none;
    height: 5rem;
}
.talk-btn {
    height: 2.5rem;
}
.update {
    z-index: 10;
}
@media (max-width: 768px) {
    input, select {
        height: 2.5rem;
    }
    .icon {
        padding-top: 8px;
        padding-left: 15px;
        display: flex;
        align-items: center;
    }
    .fa-brands {
        padding-bottom: 0.8rem;
    }
    .fa-code {
        display: flex;
        align-items: center;
    }
}
</style>