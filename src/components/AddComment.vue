<template>
  <div class="">
    <div class="post-box">
        <div class="row">
            <router-link :to="{name: 'Profile', params: { username: 'hoodiedan' }}" class="col-lg-1 col-md-1 col-sm-2 col-2">
                <div class="circular">
                    <img src="../assets/images/me.jpg" alt="handsome">
                </div>
            </router-link>
            <div class="col-lg-11 col-md-11 col-sm-10 col-10 form">
                <div class="row w-100">
                    <div class="col-8 ">
                        <textarea name="status" id="status" :class="{ 'stop-typing': tooLong }" rows="2" placeholder="Drop a comment?"
                        v-model="status"></textarea>
                    </div>
                    <div class="col-4 buttons">
                        <div class="talk-btn">
                            <p class="other-talks">Share</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'AddComment',
    data() {
        return {
            status: '',
        }
    },
    computed: {
        tooLong() {
            return this.status.length >= 140
        }
    }
}
</script>

<style scoped>
div.post-box {
    width: 100%;
    background-color: #000;
    padding: 1.5rem 1rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
}
div.form {
    display: flex;
    align-items: center;
}
div.form > *, div.buttons > * {
    margin-right: 0.5rem;
}
textarea {
    background: transparent;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    border: none;
    width: 100%;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    resize: none;
}
textarea:focus {
    outline-style: none;
}
.stop-typing {
    pointer-events: none;
}
.talk-btn {
  padding: 0.5rem 2rem;
}
.other-talks {
  margin: 0;
}
div.attached {
    display: flex;
    align-items: center;
}
</style>