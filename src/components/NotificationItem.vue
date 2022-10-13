<template>
    <div class="notification mb-3" v-motion-slide-bottom >
        <!-- if category is post or mention -->
        <div class="post w-100" v-if="notification.class === 'like'" >
            <!-- router link to post -->
            <router-link :to="{ name: 'Post', params: { postID: notification.postId } }" class="light no-underline" >
                <p class="mb-1"	>
                    <router-link :to="{ name: 'Profile', params: { username: notification.username } }" class="no-underline text-gradient" >
                        @{{ notification.username }}
                    </router-link>
                    <span v-if="notification.count > 1" >and {{ notification.count }} others</span> liked your post.
                </p>
                <p class="subtext mb-0">{{ notification.postBody }}</p>
            </router-link>
        </div>
        <!-- if category is follow  -->
        <div class="follow w-100" v-if="notification.class === 'follow'" >
            <!-- router link to follower account -->
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
            <router-link :to="{ name: 'Post', params: { postID: notification.postId }, hash: '#' + notification.index }" class="light no-underline" >
                <p class="mb-1"	>
                    <router-link :to="{ name: 'Profile', params: { username: notification.username } }" class="no-underline text-gradient" >
                        @{{ notification.username }}
                    </router-link> mentioned you in a {{ notification.mentionLocation }}.
                </p>
                <p class="subtext mb-0">{{ notification.postBody }}</p>
            </router-link>
        </div>

        <div class="comment" v-if="notification.class === 'comment'" >
            <router-link :to="{ name: 'Post', params: { postID: notification.postId }, hash: '#' + notification.index }" class="light no-underline" >
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
.bold {
    font-weight: 600;
}
</style>