<template>
    <div class="select-modal">
        <!-- <PageLoader class="m-5" :color="color" :height="40" :width="40" v-if="loading" /> -->
        <PageLoader class="m-5" :color="color" :height="40" :width="40" v-if="loading" />
        <div class="p-1" v-for="user in users" :key="user.username" v-if="users !== null">
            <!-- <ItemSkeleton v-if="loading" :height='85' :number='number' :margin='10' />     -->
            <div class="user" @click="tag(user)">
                <div class="row w-100">
                    <div class="col-2">
                        <div class="circular" >
                            <img :src="user.displayUrl" alt="handsome" v-if="user.displayUrl">
                            <img src="https://www.yourhometownchevy.com/static/dealer-14287/Profile_avatar_placeholder_large.png" alt="profile image" v-else>
                        </div>
                    </div>
                    <div class="col-7 no-underline">
                        <div class="user-details">
                            <div class="d-flex align-items-center">
                                <div class="mb-0 light no-underline light name" :class="{ 'me-2': !user.isVerified }">{{ user.name }}</div>
                                <div class="badge" v-if="user.verified">
                                    <svg
                                        width="17px"
                                        height="17px"
                                        fill="#d9d9d9"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        aria-label="Verification badge"
                                        class="
                                        r-jwli3a
                                        r-4qtqp9
                                        r-yyyyoo
                                        r-1xvli5t
                                        r-9cviqr
                                        r-f9ja8p
                                        r-og9te1
                                        r-bnwqim
                                        r-1plcrui
                                        r-lrvibr
                                        "
                                    >
                                        <g>
                                        <path
                                            d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
                                        />
                                        </g>
                                    </svg>
                                </div>
                                <p class="subtext mb-0 ms-2" v-if="user.isFollowedBy && loggedInUser !== null" >Follows you</p>
                            </div>
                            <p class="subtext text-gradient">@{{ user.username }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-5 mb-5" v-if="loading === false && users === []" >
            <h6>There are no matching users.</h6>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import SingleUser from './SingleUser.vue';
import ItemSkeleton from './ItemSkeleton.vue';
import PageLoader from './PageLoader.vue';

export default {
    name: 'TagResults',
    data() {
        return {
            color: 'FFF',
        }
    },
    methods: {
        tag(user) {
            this.$emit('tag', user);
        }
    },
    components: { SingleUser, ItemSkeleton, PageLoader },
    props: [ 'users', 'loading' ],
}
</script>

<style scoped>
div.select-modal {
    width: 50vw;
    max-height: 30vh;
    background: #222222;
    border-radius: 5px;
    margin: auto auto;
    position: relative;
    overflow-y: initial !important;
    overflow-x: hidden;
    z-index: 10000000;
    /* border: 1px solid #A9A9A9; */
}
.close-modal {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: transparent;
    border: none;
    z-index: 100001;
}
.user {
    background-color: #000;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    cursor: pointer;
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
}
</style>