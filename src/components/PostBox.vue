<template>
  <div class="">
    <div class="post-box">
        <div class="row">
            <div class="col-1">
                <div class="circular">
                    <img src="../assets/images/me.jpg" alt="handsome">
                </div>
            </div>
            <div class="col-11 form">
                <!-- <input type="text" name="status" class="status" placeholder="What's on your mind?"> -->
                <textarea name="status" id="status" :class="{ 'stop-typing': tooLong }" cols="50" rows="2" placeholder="What's on your mind?"
                v-model="status"></textarea>
                <!-- <i class="fa-regular fa-image"></i> -->
                <div class="file-input">
                    <input
                        type="file"
                        name="file-input"
                        id="file-input"
                        class="file-input__input"
                    />
                    <label class="file-input__label" for="file-input">
                        <i class="fa-regular fa-image"></i></label>
                </div>
                <div class="talk-btn">
                    <p class="other-talks">Share</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PostBox',
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
div.form > * {
    margin-right: 0.5rem;
}
textarea {
    background: transparent;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    border: none;
    height: 2rem;
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
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.talk-btn {
  padding: 0.5rem 2rem;
}
.other-talks {
  margin: 0;
}

</style>