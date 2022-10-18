<template>
    <div class="notification mb-3" :class="{ 'unseen': notification.seen === false }" v-motion-slide-bottom >
        <!-- if category is like -->
        <div class="row">
            <div class="col-lg-1 col-md-1 col-sm-1 col-2" v-if="notification.class === 'like'" >
                <i class="fa-solid fa-heart"></i>
            </div>
            <div class="post col-lg-11 col-md-11 col-sm-11 col-10" v-if="notification.class === 'like'" >
                <router-link :to="{name: 'Profile', params: { username: notification.username }}" >
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
        </div>
        
        <!-- if category is follow  -->
        <div class="row">
            <div class="col-lg-1 col-md-1 col-sm-1 col-2" v-if="notification.class === 'follow'" >
                <i class="fa-solid fa-user-plus text-gradient"></i>
            </div>
            <div class="follow  col-lg-11 col-md-11 col-sm-11 col-10" v-if="notification.class === 'follow'" >
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
        </div>

        <!-- if category is mention  -->
        <div class="row">
            <div class="col-lg-1 col-md-1 col-sm-1 col-2" v-if="notification.class === 'mention'" >
                <i class="fa-solid fa-quote-right text-gradient"></i>
            </div>
            <div class="mention col-lg-11 col-md-11 col-sm-11 col-10" v-if="notification.class === 'mention'" >
                <router-link :to="{name: 'Profile', params: { username: notification.username }}" >
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
        </div>

        <!-- if class is comment  -->
        <div class="row">
            <div class="col-lg-1 col-md-1 col-sm-1 col-2" v-if="notification.class === 'comment'" >
                <i class="fa-solid fa-comments"></i>
            </div>
            <div class="comment  col-lg-11 col-md-11 col-sm-11 col-10" v-if="notification.class === 'comment'" >
                <router-link :to="{name: 'Profile', params: { username: notification.username }}" >
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
.fa-solid.fa-heart {
    color: #01BAEF;
}
.fa-solid.fa-comments {
    color: #20BF55;
}
</style>