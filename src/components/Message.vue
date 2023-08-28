<template>
    <div 
        class="message"
        :class="{ 'sender': isSender(message) }"
        v-motion-slide-bottom
    >
        <div v-if="noOfImages !== 0">
            <div
            class="row pt-2 pb-3 pe-3 ps-2 img-wrapper"
            >
                <div :class="{ 'col-12 ps-0': noOfImages === 1, 'col-6 pe-1': noOfImages > 1 }">
                    <img
                        :src="images[0]" 
                        alt="" 
                        class="br-5 p-0 user-img"
                        :class="{ 'br-right': noOfImages > 1 }"
                        @click.prevent.self="openImage(images[0])"
                    >
                </div>
                <div
                class="col-6 ps-1" 
                v-if="noOfImages > 1"
                >
                    <img
                        :src="images[1]" 
                        alt="" 
                        class="br-5 p-0 user-img br-left"
                        @click.prevent.self="openImage(images[1])"
                    >
                </div>
            </div>
        </div>
        <div class="user-post light">
            <p class="w-100 body-wrapper mb-0" v-if="message.text"><span v-for="(item, i) in postArray" :key="i" v-cloak >
                <router-link :to="{ name: 'Profile', params: { username: shavedItem(item).slice(1) } }" class="text-gradient no-underline me-1" v-if="isTag(item)" >
                    <!-- <span>{{ item }}</span> -->
                    {{ shavedItem(item) }} 
                </router-link>
                <a :href="item" target="__blank" class="active" v-else-if="isLink(item)" >{{ item }}</a>
                <span class="me-1" v-else >{{ item }} </span>
            </span></p>
            <p class="subtext mb-0">{{ timePosted }}</p>
        </div>
    </div>
</template>

<script>
import { postStore } from '../stores/post';

export default {
    name: 'Message',
    data() {
        return {
        }
    },
    methods: {
        openImage(image) {
            const post = postStore();

            post.viewImage(image)
        },
        isTag(item) {
            let link = /@/;
            return link.test(item);
        },
        isLink(item) {
            let link = /https/
            return link.test(item);
        },
        shavedItem(item) {
            return item.split(/[-\s!$%^&*()+|~=`{}\[\]:";.<>?.\/]/)[0];
        },
        isSender(text) {
            return text.status == 'sender';
        },
    },
    computed: {
        noOfImages() {
            if (this.images) {
                return this.images.length;
            } else {
                return 0
            }
        },
        timePosted() {
            const date = new Date().toString();
            const currentTime = date.slice(16,21);
            const currentDate = date.slice(4, 11);
            const day = date.slice(4,15);
            const timePosted = this.message.createdAt.slice(16, 21)
            const dayPosted = this.message.createdAt.slice(4,15);
            const dayAndMonth = this.message.createdAt.slice(4, 11)

            let time;

            if (this.message.createdAt) {
                time = this.message.createdAt.slice(16,21);
            }
            if (time === currentTime) {
                return 'now'
            } else if (day === dayPosted) {
                return 'Today, ' + time;
            } else {
                return dayAndMonth + `, ${timePosted}`;
            }
        },
        // mentionsLength() {
        //     return this.message.mentions.length > 0
        // },
        postArray() {
            return this.message.text.split(/[-\s^*+|~`\[\]]/);
        }
    },
    props: ['message', 'images'],
}
</script>

<style scoped>
div.message {
    box-shadow: rgb(42, 45, 48) 0px 2px 12px;
    border-radius: 16px;
    padding: 0.5rem 1rem 1rem;
    width: 80%;
    margin: 0.5rem;
    font-weight: 600;
}
.sender {
    align-self: flex-end !important;
    background-color: #A9A9A9;
}
.sender p {
    color: #000 !important;
}
p.subtext {
    position: absolute;
    bottom: -0.8rem;
    right: 0;
}
img.user-img {
    object-fit: cover !important;
    height: 100%;
    width: 100%;
    z-index: 10;
    max-height: 400px;
}
.user-img:hover {
    filter: opacity(0.8) drop-shadow(0 0 0 #000);
}
.col-6 {
    padding: 0;
}
.br-right {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.br-left {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

@media (max-width: 992px) {
    .function-icons {
        margin-left: 20%;
    }
}
</style>