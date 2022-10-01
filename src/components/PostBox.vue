<template>
  <div class="">
    <div class="post-box">
        <div class="row">
            <div class="col-lg-1 col-md-1 col-sm-2 col-2">
                <div class="circular">
                    <img src="../assets/images/me.jpg" alt="handsome">
                </div>
            </div>
            <div class="col-lg-11 col-md-11 col-sm-10 col-10 form">
                <!-- <input type="text" name="status" class="status" placeholder="What's on your mind?"> -->
                <div class="row">
                    <div class="col-lg-6 col-md-6 ">
                        <textarea name="status" id="status" :class="{ 'stop-typing': tooLong }" rows="2" placeholder="What's on your mind?"
                        v-model="status"></textarea>
                    </div>
                    <div class="col-lg-6 col-md-6 buttons">
                        <div class="attached">
                            <i class="fa-solid fa-paperclip"></i>
                            <p class="subtext mb-0">0 file(s) attached</p>
                        </div>
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
}div.buttons {
    display: flex;
    justify-content: space-between;
}
div.attached {
    display: flex;
    align-items: center;
}
</style>