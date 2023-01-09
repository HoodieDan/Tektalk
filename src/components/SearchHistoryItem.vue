<template>
    <div class="no-results" @click.self="search(historyItem)">

        <p class="mb-0">
            {{ historyItem.search }}
        </p>    

        <button class="close-modal" @click="del(historyItem)">
            <i class="fa-solid fa-xmark light" />
        </button>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SearchHistoryItem.vue',
    methods: {
        async del(historyItem) {
            this.$emit('del', historyItem);
            const apiKey = import.meta.env.VITE_API_KEY;

            try {
                await axios.delete(`network/delete-search/${historyItem.searchId}?apiKey=${apiKey}`)
            } catch (error) {
                this.$toast.error('an error occured while deleting')
                return;
            }
        },
        search(historyItem) {
            this.$emit('search', historyItem);
        }
    },
    props: [ 'historyItem' ]
}
</script>

<style scoped>
.no-results {
    display: flex;
    justify-content: space-between;
}
.close-modal {
    background-color: #000;
}
.close-modal.fa-solid { 
    width: 35px;
    height: 35px;
}
</style>