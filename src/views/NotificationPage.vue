<template>
  <div class="container">
    <div class="head mb-4">
        <h3>Notifications</h3>
    </div>
    <NotificationItem v-for="notification in notifications" :key="notification._id" :notification="notification" />
  </div>
</template>

<script>
import axios from 'axios'
import NotificationItem from '../components/NotificationItem.vue';
export default {
    name: "NotificationsPage",
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;
        const res = await axios.get(`notifications?apiKey=${apiKey}`);
        // console.log(res.data);
        this.notifications = res.data.userNotifications;
    },
    data() {
        return {
            notifications: null,
            loading: false,
            color: "FFF"
        };
    },
    components: { NotificationItem },
    async beforeRouteLeave (to, from, next) {
        const apiKey = import.meta.env.VITE_API_KEY;
        const res = await axios.patch(`seen-notifications?apiKey=${apiKey}`);
        next();
    }
}
</script>

<style>

</style>