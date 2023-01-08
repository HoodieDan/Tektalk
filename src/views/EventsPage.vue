<template>
    <div class="container">
        <p @click="openCreateEventModal = true" class="pointer create"><i class="fa-solid fa-plus" @push="push"></i> Create Event</p>
        <SingleEvent
          :current-user="currentUser"
          :event="event" v-for="(event, i) in events" 
          :key="i" class="mb-3" 
          @join="join" 
          @leave="leave" 
          @edit="edit" 
          @delete="deleteEvent" />

        <div>
            <CreateEventModal :current-user="currentUser" v-if="openCreateEventModal" @push="push" @close="openCreateEventModal = false" v-motion-pop />
        </div>

        <div v-if="events">
            <div class="no-results mt-3 mb-3" v-if="events.length == 0">
                <p class="mb-0">No events available at the moment...</p>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import SingleEvent from '../components/SingleEvent.vue';
import CreateEventModal from '../components/CreateEventModal.vue';

export default {
    name: 'EventsPage',
    async beforeRouteEnter(to, from, next) {
        const apiKey = import.meta.env.VITE_API_KEY;

        const res = await axios.get(`/event/all?apiKey=${apiKey}`);
        next((vm) => {
            vm.events = res.data.events;
        })
    },
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;
        let profile;

        try {
            profile = await axios.get(`/profile?apiKey=${apiKey}`)
        } catch (error) {
            console.log(error);
            return;
        }
        this.currentUser = profile.data;
    },
    data() {
        return {
            events: null,
            openCreateEventModal: false,
            currentUser: null,
        }
    },
    methods: {
        push(values) {
            this.events.push(values)
        },
        join(eve) {
            const techEvent = this.events.find((anEvent) => {
                return anEvent.id === eve.id
            })

            techEvent.attendeesCount += 1;
            techEvent.willAttend = true;
            techEvent.attendees.push({
                'username': this.currentUser.username,
                'displayUrl': this.currentUser.displayUrl,
            })

            const index = this.events.indexOf(techEvent);

            // const tek = this.events.splice(index, 1)[0]

            // this.events.unshift(tek)
        },
        leave(eve) {
            const techEvent = this.events.find((anEvent) => {
                return anEvent.id === eve.id
            })
            techEvent.willAttend = false;
            techEvent.attendeesCount -= 1;

            const user = techEvent.attendees.find((user)=> {
                return user.username === this.currentUser.username;
            })

            const i = techEvent.attendees.indexOf(user)

            techEvent.attendees.splice(i, 1)

            const index = this.events.indexOf(techEvent);

            // const tek = this.events.splice(index, 1)[0]

            // this.events.push(tek)
        },
        edit(eve) {
            const tek = this.events.find((tekEvent) => {
                return tekEvent.id === eve.id
            })

            tek.displayUrl = eve.displayUrl;
            tek.name = eve.name;
            tek.description = eve.description;
            tek.startTime = eve.startTime;
            tek.endTime = eve.endTime;
        },
        deleteEvent(id) {
            const eve = this.events.find((eve) => {
                return eve.id === id;
            })

            const index = this.events.indexOf(eve);

            this.events.splice(index, 1);
        }
    },
    components: { SingleEvent, CreateEventModal }
}
</script>

<style scoped>
div.container {
  overflow-x: hidden;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}
div.container::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
.create {
    transition: all 0.2s linear;
}
.create:hover {
    color: #01BAEF;
}
</style>