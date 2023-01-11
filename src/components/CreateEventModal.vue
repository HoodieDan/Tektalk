<template>
    <div class="backdrop" @click.self="close" >
        <div class="select-modal">
            <div class="w-100 p-3 header mb-2 sticky-top">
                <div class="d-flex justify-content-between">
                    <h6>Create New Event</h6>
                    <button class="close-modal" @click="close()">
                        <i class="fa-solid fa-xmark light" />
                    </button>
                </div>
            </div>

            <div class="py-3 px-5">
                <!-- registration form  -->
                <vee-form @submit="create" :validation-schema="schema">

                    <!-- Profile image -->
                    <div class="file-input">
                        <div class="d-flex">
                            <h6 class="d-block">Event Image:</h6>
                            <p class="ms-auto clear mb-0 pointer" @click="displayUrl = ''" v-if="displayUrl !== ''">remove<i class="fa-solid fa-eraser"></i></p>
                        </div>

                        <!-- image display  -->
                        <div class="image">
                            <img :src="displayUrl" alt="event image" v-if="displayUrl">
                            <img src="https://ticketlinkz.com/wp-content/uploads/2014/12/EVENT-PLACEHOLDER.jpg" alt="event image" v-else>
                        </div>

                        <vee-field
                            type="file"
                            name="profileImage"
                            id="profileImage"
                            class="file-input__input"
                            @change="eventImageUpload($event)"
                        />
                        <label class="file-input__label mb-3 dark" for="profileImage">
                            Edit Event Image<i class="fa-regular fa-image"></i></label>
                    </div>

                    <!-- name  -->
                    <label for="name">Event Name:</label>
                    <div class="form-item mt-2 mb-3">
                        <i class="fa-solid fa-signature icon res-icon"></i>
                        <vee-field name="name" id="name" type="text" class="input field" placeholder="Eg: GDG Devfest" />
                    </div>
                    <ErrorMessage class="error mb-2 text-gradient" name="name"></ErrorMessage>

                    <!-- startTime  -->
                    <label for="startTime">Start Time:</label>
                    <div class="form-item mt-2 mb-3">
                        <i class="fa-regular fa-calendar-days icon res-icon"></i>
                        <vee-field name="startTime" v-model="start" id="startTime" type="datetime-local" ref="startTime" class="date" placeholder="startTime" />
                    </div>
                    <ErrorMessage class="error mb-2 text-gradient" name="startTime"></ErrorMessage>

                    <!-- endTime  -->
                    <label for="endTime">End Time:</label>
                    <div class="form-item mt-2 mb-3">
                        <i class="fa-regular fa-calendar-days icon res-icon"></i>
                        <vee-field name="endTime" v-model="end" id="endTime" type="datetime-local" ref="endTime" class="date" placeholder="endTime" />
                    </div>
                    <ErrorMessage class="error mb-2 text-gradient" name="endTime"></ErrorMessage>

                    <!-- location  -->
                    <label for="location">Location/Event link:</label>
                    <div class="form-item mt-2 mb-3">
                        <i class="fa-solid fa-location-crosshairs icon"></i>
                        <vee-field name="location" id="location" type="text" class="input field" placeholder="Eg: Lagos" />
                    </div>
                    <ErrorMessage class="error mb-2 text-gradient" name="location"></ErrorMessage>

                    <!-- description  -->
                    <label for="paswword">Description:</label>
                    <div class="form-item mt-2 mb-3">
                        <i class="fa-solid fa-user-pen description-icon"></i>
                        <vee-field
                            as="textarea" 
                            rows="3" 
                            name="description" 
                            id="description" 
                            type="text" 
                            class="input field" 
                            placeholder="Let others know something about your event!" 
                        />
                    </div>
                    <ErrorMessage class="error mb-2 text-gradient" name="description"></ErrorMessage>

                    <!-- Create button  -->
                    <button type="submit" class="talk-btn w-100 mb-2 mt-5" :disabled="loading">
                        <h5 class="light mt-2 mb-2 Create" v-motion-pop v-if="!loading">Create Event!</h5>
                        <PageLoader :color="color" :height="20" :width="20" v-motion-pop v-else />
                    </button>

                </vee-form>
            </div>
        </div>
    </div>
</template>

<script>
import PageLoader from './PageLoader.vue';
import axios from 'axios';
import url from '../../includes/ImgUrl';

export default {
    name: "CreateEventModal",
    data() {
        return {
            color: 'FFF',
            loading: false,
            start: '',
            end: '',
            schema: {
                profileImage: '',
                name: "required|min:3|max:25",
                endTime: `required`,
                startTime: `required`,
                location: "required",
                description: "required|min:1|max:300",
            },
            eventImg: [],
            displayUrl: '',
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        async create(values) {
            const apiKey = import.meta.env.VITE_API_KEY;
            this.loading = true;
            
            let formData = new FormData();
            if (this.displayUrl) {
                formData.append('image', values.profileImage);
            }
            formData.append('name', values.name);
            formData.append('startTime', values.startTime);
            formData.append('endTime', values.endTime);
            formData.append('location', values.location);
            formData.append('description', values.description);

            let created;
            try {
                created = await axios.post(`/event?apiKey=${apiKey}`, formData);
            } catch (error) {
                this.loading = false;
                this.$toast.error(error.response.data.errors[0].msg);
                return;
            }
            
            this.$emit('close');
            this.loading = false;
            this.$emit('push', {
                'description': values.description,
                'displayUrl': values.displayUrl,
                'attendees': [{
                    'username': this.currentUser.username,
                    'displayUrl': this.currentUser.displayUrl,
                }],
                'startTime': values.startTime,
                'endTime': values.endTime,
                'willAttend': true,
                'id': created.data.eventId,
                'name': values.name,
                'admin': {
                    'username': this.currentUser.username,
                    'displayUrl': this.currentUser.displayUrl,
                },
                'attendeesCount': 1,
            })
            this.$toast.success('Event Created Successfully');
            // window.location.reload();
        },
        eventImageUpload($event) {
            this.eventImg = [...$event.target.files];
            this.eventImg.forEach((file) => {
                // get url function takes in uploaded object and returns a base64 encoded string that can be read inside the img tag 
                url.getUrl(file).then((value) => {
                    this.displayUrl = value;
                })
            });
        },
    },
    components: { PageLoader },
    props: [ 'currentUser' ],
}
</script>

<style scoped>
.text-gradient:hover {
    text-decoration: none;
}
div.select-modal {
    width: 50vw;
    max-height: 70vh;
    background: #222222;
    border-radius: 5px;
    margin: auto auto;
    position: relative;
    overflow-y: initial !important;
    overflow-x: hidden;
    /* border: 1px solid #A9A9A9; */
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
div.header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #000;
    /* border-bottom: 1px solid #A9A9A9; */
}
.close-modal {
    position: sticky;
    /* top: 0.5rem;
    right: 0.5rem; */
    background: transparent;
    border: none;
    z-index: 100001;
}
.edit {
    background-color: #000;
    border-radius: 5px;
}
div.image {
    width: 200px;
    height: 200px;
    display: block;
}
.image img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    /* max-height: 400px; */
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
.description-icon {
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
.date {
    background: transparent;
    color: #e7e9ea;
    text-indent: 2.5rem;
    border: 1px solid #e7e9ea;
    width: 100%;
    height: 2rem;
}
input, select, textarea {
    background: #000;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    border: 1px solid #e7e9ea;
    border-radius: 5px;
    height: 2rem;
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
.Create {
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
@media (max-width: 992px) {
    div.select-modal {
        width: 80vw;
        height: auto;
        max-height: 70vh;
    }
}
@media (max-width: 575px) {
    div.select-modal {
        width: 90vw;
        height: auto;
        max-height: 80vh;
    }
    .py-3.px-5 {
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
    }
}
</style>