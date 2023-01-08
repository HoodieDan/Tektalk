<template>
  <div class="container">
    <div class="head no-results mb-4">
        <h3>Notifications</h3>
    </div>
    <PageLoader :color="color" :height="20" :width="20" v-if="notifications === null" class="mt-5" />
    
    <div v-if="notifications">
      <div class="no-results mt-3 mb-3" v-if="notifications.length == 0">
        <p class="mb-0">No notifications to display...</p>
      </div>
    </div>

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
    async beforeDestroy () {
        const apiKey = import.meta.env.VITE_API_KEY;
        const res = await axios.patch(`seen-notifications?apiKey=${apiKey}`);
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