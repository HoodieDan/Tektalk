<template>
    <div class="container">
        <div class="history" v-if="!search_in_progress">
            <div class="post">
                <h4 class="mb-0">Search History</h4>
            </div>
        </div>

        <div class="results" v-else>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'NetworkPage',
    beforeRouteEnter(to, from, next) {
        next((vm) => {

            // check for query 
            if (to.query.q) {
                vm.query = to.query.q;
                vm.search_in_progress = true;
            }


            // check if searching and no category selected 
            if (!to.query.category && vm.search_in_progress) {
                vm.$router.push({
                    query: {
                        category: vm.currentTab
                    }
                })
            } else {
                vm.currentTab = to.query.category
            }

        });
    },
    data() {
        return {
            search_in_progress: false,
            searching: false,
            query: '',
            currentTab: 'Users'
        }
    },
    computed: {
        queryLength() {
            return this.query.length;
        }
    },
    watch: {
        currentTab(newVal) {
            if (newVal === this.$route.query.category) {
                return;
            }
            this.$router.push({
                query: {
                    category: newVal,
                }
            })
        },
        query(newVal) {
            if (newVal === this.$route.query.q) {
                return;
            }
            this.$router.push({
                query: {
                    q: newVal,
                }
            })
        },
        queryLength(newVal) {
            if (newVal > 0) {
                this.search_in_progress = true;
            } else {
                this.search_in_progress = false
            }
        }
    },
}
</script>

<style scoped>
div.post {
    width: 100%;
    background-color: #000;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    position: relative;
}
</style>