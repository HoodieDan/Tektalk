<template>
  <div class="container">
    <div class="head mb-4">
        <h3>Notifications</h3>
    </div>
    <PageLoader :color="color" :height="100" :width="100" v-if="notifications === null" class="mt-5" />
    <h4 v-if="notifications === []" >No new notifications to show.</h4>
    <NotificationItem v-for="notification in notifications" :key="notification._id" :notification="notification" />
  </div>
</template>

<script>
import axios from 'axios'
import NotificationItem from '../components/NotificationItem.vue';
import PageLoader from '../components/PageLoader.vue';
export default {
    name: "NotificationsPage",
    async created() {
        const apiKey = import.meta.env.VITE_API_KEY;
        const res = await axios.get(`notifications?apiKey=${apiKey}`);
        this.notifications = res.data.userNotifications;
    },
    data() {
        return {
            notifications: null,
            loading: false,
            color: "FFF"
        };
    },
    components: { NotificationItem, PageLoader },
    async beforeRouteLeave (to, from, next) {
        const apiKey = import.meta.env.VITE_API_KEY;
        const res = await axios.patch(`seen-notifications?apiKey=${apiKey}`);
        next();
    }
}
</script>

<style scoped>
@media (max-width: 768px) {
    .head {
        display: none;
    }
}
</style>