<template>
    <div class="event w-100 pb-0">
        <div class="open-edit" v-if="currentUser">
            <i class="fa-solid fa-pen-nib" v-if="currentUser.username === event.admin.username" @click="openEditEventModal = true"></i>
        </div>
        <div class="delete" v-if="currentUser">
            <i class="fa-solid fa-trash" v-if="(currentUser.username === event.admin.username) && !deleting" @click="deleteEvent(event)"></i>
            <PageLoader :color="color" :height="35" :width="35" v-motion-pop v-if="deleting" />
        </div>
        <div class="light no-underline">
            <div class="row p-2">
                <div class="image col-4">
                    <img :src="event.displayUrl" alt="event image" v-if="event.displayUrl">
                    <img src="https://ticketlinkz.com/wp-content/uploads/2014/12/EVENT-PLACEHOLDER.jpg" alt="event image" v-else>
                </div>
                <div class="text col-8 pt-1 pb-1">
                    <h6 class="text-gradient no-underline" >{{ event.name }}</h6>
                    <p class="mb-2"	>{{ event.description }}</p>
                    <p class="rsvp">RSVPs: {{ event.attendeesCount }}</p>

                    <p>Starts at <span class="text-gradient no-underline">{{ format(event.startTime) }}</span></p>
                    <p>Ends at <span class="text-gradient no-underline">{{ format(event.endTime) }}</span></p>

                    <div class="row">
                        <div class="col-12 d-flex" v-if="event.attendees">
                            <router-link :to="{ name: 'Profile', params: { username: user.username } }" class="circular mb-2" v-for="(user, i) in event.attendees" :key="i" v-motion-roll-right>
                                <img :src="user.displayUrl" alt="member image" v-if="user.displayUrl !== null">
                                <img
                                    src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" 
                                    alt="profile image" 
                                    v-else
                                >
                            </router-link>
                        </div>
                        <div class="col-6 d-flex">
                            <!-- google calendar add here  -->
                            <button class="talk-btn light w-100" @click="addToCalendar(event)">
                                <p class="mb-0"><i class="fa-brands fa-google me-2"></i> Save</p>
                            </button>
                        </div>
                        <div class="col-6">
                            <button class="talk-btn w-100 light" v-if="!event.willAttend" @click.self.prevent="join(event)" :disabled="loading" v-motion-pop >
                                <p class="mb-0" v-if="!loading" @click.self.prevent="join(event)" v-motion-pop >RSVP</p>
                                <PageLoader :color="color" :height="15" :width="15" v-motion-pop v-else />
                            </button>
                            <button class="talk-outline-btn light w-100" @click.self.prevent="leave(event)" :disabled="loading" v-motion-pop v-else >
                                <p class="mb-0" v-if="!loading" @click.self.prevent="leave(event)" v-motion-pop >I won't attend</p>
                                <PageLoader :color="color" :height="15" :width="15" v-motion-pop v-else />
                            </button>
                        </div>
                        <p class="mb-0 mt-2 creator">Event created by <router-link class="no-underline text-gradient" :to="{ name: 'Profile', params: { username: event.admin.username } }">@{{ event.admin.username }}</router-link></p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <EditEventModal :current-user="currentUser" :id="event.id" v-if="openEditEventModal" @edit="edit" @close="openEditEventModal = false" v-motion-pop />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PageLoader from './PageLoader.vue';
import EditEventModal from './EditEventModal.vue';

export default {
    name: "SingleEvent",
    mounted() {
        this.title = this.event.name;
        this.startTime = new Date('2023-01-7 01:00 PM');
        this.endTime = new Date('2023-01-7 06:00 PM');
        this.details = this.event.description;
        this.location = 'Nigeria';
        // this.location = this.event.location;
    },
    data() {
        return {
            color: "FFF",
            loading: false,
            text: 'Add To Calendar',
            deleting: false,
            title: '',
            startTime: '',
            endTime: '',
            details: '',
            location: '',
            openEditEventModal: false,
        };
    },
    methods: {
        async join(event) {
            if (!localStorage.getItem('token')) {
                this.$router.push({ name: 'Auth' })
                return;
            }
            this.loading = true;
            const apiKey = import.meta.env.VITE_API_KEY;
            let res;

            try {
                res = await axios.put(`event/rsvp/${event.id}?apiKey=${apiKey}`)
            } catch (error) {
                this.loading = false;
                this.event.memberOf = true;
                this.$toast.error(error.message);
                return;
            }
            this.loading = false;
            this.event.memberOf = true;
            this.$toast.success('RSVP Successful!');
            this.$emit('join', event);
        },
        async leave(event) {
            if (!localStorage.getItem('token')) {
                this.$router.push({ name: 'Auth' })
                return;
            }
            this.loading = true;
            const apiKey = import.meta.env.VITE_API_KEY;
            let res;

            try {
                res = await axios.patch(`event/rsvp/${event.id}?apiKey=${apiKey}`)
            } catch (error) {
                this.loading = false;
                this.event.memberOf = true;
                this.$toast.error(error.response.data.message);
                return;
            }
            this.loading = false;
            this.event.memberOf = false;
            this.$toast.success('Successfully confirmed unavailability!');
            this.$emit('leave', event);
        },
        addToCalendar(techEvent) {
            this.googleCalendarLink = `http://www.google.com/calendar/event?action=TEMPLATE&text=${techEvent.name || ""}&dates=${this.formatDate(techEvent.startTime)}/${this.formatDate(techEvent.endTime)}&details=${techEvent.description || ""}&location=${techEvent.location || ""}`
            window.open(this.googleCalendarLink, '_blank');
        },
        formatDate(date) {
            const day = date.slice(8,10);
            const monthIndex = date.slice(5,7);
            const year = date.slice(0,4);
            const hour = date.slice(11,13);
            const minutes = date.slice(14,16);
            let formatted_date;
            formatted_date = '' + year + monthIndex + day + 'T' + hour + minutes + '00Z';
            return formatted_date;
        },
        zero_pad2(num) {
            if(num < 10) return "0" + num;
                return num;
        },
        edit(values) {
            this.$emit('edit', values)
        },
        format(date) {
            const dat = new Date(date)
            return dat;
            // const dat = date.split('T');
            // const res =  dat[0] + '' + dat[1]
            // return res;
        },
        async deleteEvent(eve) {
            const apiKey = import.meta.env.VITE_API_KEY;
            if (window.confirm(`Delete ${eve.name} event?`)) {
                this.deleting = true;
                let event;

                try {
                    event = await axios.delete(`event/${eve.id}?apiKey=${apiKey}`)
                } catch (error) {
                    this.$toast.error('An error occurred, please try again later')
                    console.log(error);
                    this.deleting = false;
                    return;
                }

                this.deleting = false;
                this.$toast.success('Event Deleted Successfully')
                this.$emit('delete', eve.id)
            }
        }
    },
    components: { PageLoader, EditEventModal },
    props: [ 'currentUser', 'event' ]
}
</script>

<style scoped>
div.event {
    background-color: #000;
    border-radius: 5px;
    position: relative;
}
.open-edit {
    position: absolute;
    cursor: pointer;
    right: 15px;
    top: 5px;
    z-index: 10;
    width: 25px;
    height: 25px;
}
.delete {
    position: absolute;
    cursor: pointer;
    right: 45px;
    top: 5px;
    z-index: 10;
    width: 25px;
    height: 25px;
}
.open-edit:hover {
    color: #01BAEF;
}
.image img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    /* max-height: 400px; */
}
div.circular {
    width: 25px;
    height: 25px;
}
div.text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.talk-btn,
.talk-outline-btn {
    height: 2rem;
}
.creator {
    font-size: 0.7rem;
}
@media (max-width: 575px) {
    /* .row > * {
        padding-right: 1rem;
    } */
    /* .mb-2 {
        margin-right: 0.25rem;
    } */
}
</style>