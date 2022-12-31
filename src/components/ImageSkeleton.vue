<template>
    <div class="profile-image" :style="{ width: width + 'px', height: height + 'px' }" >
        <div class='ms-auto' ></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // width: 100
        }
    },
    props: ['height', 'width']
}
</script>

<style scoped>
@keyframes pulse-bg {
  0% {
    background-color: #1B1B1B;
  }
  50% {
    background-color: #28282B;
  }
  100% {
    background-color: #1B1B1B;
  }
}

.profile-image div {
  /* width: 5rem;
  height: 5rem;
  padding-top: 10%; */
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #1B1B1B;
  animation: pulse-bg 1s infinite;
  /* margin-bottom: 16px; */
}

.profile-info {
    text-align: center;
}

.profile-info h3 {
  content: ' ';
  background-color: #1B1B1B;
  margin: 10px 0;
  animation: pulse-bg 1s infinite;
}
</style>
