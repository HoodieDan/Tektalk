<template>
    <div class="notification mb-3" :class="{ 'unseen': notification.seen === false }" v-motion-slide-bottom >
        <!-- if category is like -->
        <div class="post w-100" v-if="notification.class === 'like'" >
            <router-link :to="{name: 'Profile', params: { username: notification.username }}" v-if="notification.displayUrl" >
                <div class="circular" >
                    <img :src="notification.displayUrl" alt="handsome" v-if="notification.displayUrl">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </div>
            </router-link>
            <!-- router link to post -->
            <router-link :to="{ name: 'Post', params: { postID: notification.postId } }" class="light no-underline" >
                <p class="mb-1"	>
                    <router-link :to="{ name: 'Profile', params: { username: notification.username } }" class="no-underline text-gradient" >
                        @{{ notification.username }}
                    </router-link>
                    <span v-if="notification.count > 1" > and {{ notification.count }} others</span> liked your post.
                </p>
                <p class="subtext mb-0">{{ notification.postBody }}</p>
            </router-link>
        </div>
        <!-- if category is follow  -->
        <div class="follow w-100" v-if="notification.class === 'follow'" >
            <router-link :to="{name: 'Profile', params: { username: notification.username }}" >
                <div class="circular" >
                    <img :src="notification.authorImage" alt="handsome" v-if="notification.displayUrl">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </div>
            </router-link>
            <router-link :to="{ name: 'Profile', params: { username: notification.username } }" class="light no-underline" >
                <p class="mb-1"	>
                    <router-link :to="{ name: 'Profile', params: { username: notification.username } }" class="no-underline text-gradient" >
                        @{{ notification.username }}
                    </router-link>
                    <span class="bold" v-if="notification.count > 1" >and {{ notification.count }} others</span> followed you.
                </p>
            </router-link>
        </div>
        <!-- if category is mention  -->
        <div class="mention w-100" v-if="notification.class === 'mention'" >
            <router-link :to="{name: 'Profile', params: { username: notification.username }}" v-if="notification.displayUrl" >
                <div class="circular" >
                    <img :src="notification.displayUrl" alt="handsome" v-if="notification.displayUrl">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </div>
            </router-link>
            <router-link :to="{ name: 'Post', params: { postID: notification.postId }, hash: '#' + notification.commentId }" class="light no-underline" >
                <p class="mb-1"	>
                    <router-link :to="{ name: 'Profile', params: { username: notification.username } }" class="no-underline text-gradient" >
                        @{{ notification.username }}
                    </router-link> mentioned you in a <span class="bold" v-if="notification.postedIn" >{{ notification.postedIn }}</span> {{ notification.mentionLocation }}.
                </p>
                <p class="subtext mb-0">{{ notification.postBody }}</p>
            </router-link>
        </div>

        <div class="comment" v-if="notification.class === 'comment'" >
            <router-link :to="{name: 'Profile', params: { username: notification.username }}" v-if="notification.displayUrl" >
                <div class="circular" >
                    <img :src="notification.displayUrl" alt="handsome" v-if="notification.displayUrl">
                    <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                </div>
            </router-link>
            <router-link :to="{ name: 'Post', params: { postID: notification.postId }, hash: '#' + notification.commentId }" class="light no-underline" >
                <p class="mb-1"	>
                    <router-link :to="{ name: 'Profile', params: { username: notification.username } }" class="no-underline text-gradient" >
                        @{{ notification.username }}
                    </router-link> <span class="bold" v-if="notification.count > 1" >and {{ notification.count }} others</span> commented on your post.
                </p>
                <p class="subtext mb-0">{{ notification.postBody }}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotificationItem',
    props: [ 'notification' ]
}
</script>

<style>
.notification {
    border-radius: 5px;
    background-color: #000;
    padding: 1rem;
}
.unseen {
    background-color: #191919;
}
.bold {
    font-weight: 600;
}
.circular {
    width: 2rem;
    height: 2rem;
}
</style>