<template>
  <div class="container">
    <div class="edit pt-4 pb-4 mb-3">
        <div class="container-sm">
            <div class="text-center w-100">
                <h1 class="text-gradient">Tt.</h1>
                <h3>Update Your Profile!</h3>
            </div>
            <!-- registeration form  -->
            <vee-form @submit="update" :validation-schema="schema">

                <!-- backdrop image -->
                <div class="file-input">
                    <div class="d-flex">
                        <h6>Backdrop Image:</h6>
                        <p class="ms-auto clear mb-0" @click="backdropUrl = ''; user.backdropUrl = null">remove<i class="fa-solid fa-eraser"></i></p>
                        <p class="ms-auto clear mb-0" v-if="backdropUrl !== ''" @click="backdropUrl = ''">clear<i class="fa-solid fa-eraser"></i></p>
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
                        <p class="ms-auto clear mb-0" @click="profileUrl = ''; user.displayUrl = null">revome<i class="fa-solid fa-eraser"></i></p>
                        <p class="ms-auto clear mb-0" v-if="profileUrl !== ''" @click="profileUrl = ''">clear<i class="fa-solid fa-eraser"></i></p>
                    </div>
                    <div class="circular">
                        <img v-if="profileUrl !== ''" :src="profileUrl" alt="profile image" v-motion-pop >
                        <img v-if="user.displayUrl !== null && profileUrl === ''" :src="user.displayUrl" alt="profile image"  v-motion-pop >
                        <img
                            src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png"
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
                <ErrorMessage class="error mb-2 text-gradient" name="name"></ErrorMessage>

                <!-- username  -->
                <label for="username">Username:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-solid fa-at icon"></i>
                    <vee-field name="username" id="username" type="text" class="input field" placeholder="Username" v-model="user.username" />
                </div>
                <ErrorMessage class="error mb-2 text-gradient" name="username"></ErrorMessage>

                <!-- email  -->
                <label for="email">Email:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-regular fa-envelope icon"></i>
                    <vee-field name="email" id="email" type="email" class="input field" placeholder="Email"  v-model="user.email" />
                </div>
                <ErrorMessage class="error mb-2 text-gradient" name="email"></ErrorMessage>

                <!-- location  -->
                <label for="location">Location:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-solid fa-location-crosshairs icon"></i>
                    <vee-field name="location" id="location" type="text" class="input field" placeholder="Location"  v-model="user.location" />
                </div>
                <ErrorMessage class="error mb-2 text-gradient" name="location"></ErrorMessage>

                <!-- stack  -->
                <label for="name">Area of Expertise:</label>
                <div class="form-item mt-2 mb-3">
                    <i class="fa-solid fa-code icon"></i>
                    <vee-field as="select" name="stack" id="stack" class="input field" placeholder="Email"  v-model="user.stack" >
                        <option value="Frontend Development" >Frontend Development</option>
                        <option value="Backend Development">Backend Development</option>
                        <option value="Fullstack Development">Fullstack Development</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Design">Design</option>
                        <option value="Data Science">Data Science</option>
                        <option value="App Development">App Development</option>
                        <option value="Game Development">Game Development</option>
                        <option value="CyberSecurity">CyberSecurity</option>
                        <option value="Guest">Guest</option>
                        <option value="I do not want to put myself in a box">I do not want to put myself in a box</option>
                        <option value="I am yet to decide">I am yet to decide</option>
                    </vee-field>
                </div>
                <ErrorMessage class="error mb-2 text-gradient" name="stack"></ErrorMessage>

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
                <ErrorMessage class="error mb-2 text-gradient" name="bio"></ErrorMessage>

                <!-- update button  -->
                <button type="submit" class="talk-btn w-100 mb-2 mt-5" :disabled="loading">
                    <h5 class="light mt-2 mb-2 update" v-motion-pop v-if="!loading">Update!</h5>
                    <PageLoader :color="color" :height="30" :width="30" v-motion-pop v-else />
                </button>

                <!-- update error message  -->
                <p class="alert p-0" v-if="show_alert">{{ alert_message }}</p>
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
import file from '../../includes/sourceToFile';

export default {
    name: "EditProfile",
    async beforeRouteEnter(to, from, next) {
        const apiKey = import.meta.env.VITE_API_KEY;
        const profile = await axios.get(`/profile?apiKey=${apiKey}`);
        
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
        })
    },
    monuted() {
        console.log(this.profile.displayUrl);
        console.log(this.profile.backdropUrl);
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
                username: "required|min:1|max:25",
                location: "required|min:3",
                stack: "required",
                bio: "min:1|max:200",
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
            console.log(this.profile.displayUrl);
            console.log(this.profile.backdropUrl);
            let sameProfile;
            file.getFile(this.profile.displayUrl).then((value) => {
                sameProfile = value;
            });
            console.log(sameProfile);
            let sameBackdrop;
            const apiKey = import.meta.env.VITE_API_KEY;
            this.show_alert = false;
            this.loading = true;
            let formData = new FormData();
            if (this.profileImg !== []) {
                formData.append('display', values.profileImage);
            } else if (!this.user.displayUrl) {
                formData.append('display', null )
            } else {
                formData.append('display', this.profile.displayUrl);
            }
            if (this.backdropImg !== []) {
                formData.append('backdrop', values.backdropImage);
            } else if (!this.user.backdropUrl) {
                formData.append('backdrop', null )
            } else {
                formData.append('backdrop', this.profile.backdropUrl);
            }
            formData.append('name', values.name);
            formData.append('username', values.username);
            formData.append('email', values.email);
            formData.append('stack', values.stack);
            formData.append('location', values.location);
            formData.append('bio', values.bio);

            let updated;
            try {
                updated = await axios.patch(`/profile/edit?apiKey=${apiKey}`, formData);
            } catch (error) {
                this.show_alert = true;
                this.loading = false;
            
                if (error.response.data.message === 'Email address already exists!') {
                    this.alert_message = 'A user with this email already exixts.';
                } else if (error.response.data.message === 'The username is already taken.') {
                    this.alert_message = 'A user with this username already exists.';
                } else {
                    this.alert_message = 'An error occured, please try again later';
                }
                return;
            }
            if (updated.status !== 200) {
                this.loading = false;
                this.show_alert = true;
                this.alert_message = 'An error occured, please try again later.'
                return;
            } else {
                this.loading = false
                this.successful = true;
                this.success_message = 'Profile updated successfuly!'
                // window.location.reload();
            }
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
.circular img {
    transform: translate(-50%, -50%) !important;
}
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
    height: 2rem;
    padding-left: 2.5rem !important;
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
    }
}
</style>