<template>
    <div class="profile-info" v-for='num in number' :key='num' >
        <h3 :style="{ width: width + '%', height: height + 'px', marginTop: margin + 'px', marginBottom: margin + 'px' }" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            width: 100
        }
    },
    props: ['height', 'number', 'margin']
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
