<template>
  <div class="wrapper">
    <div class="loader" :style="{ width: width + 'px', height: height + 'px', borderTop: '4px solid #' + color }" >
    </div>
  </div>
</template>

<script>
export default {
    name: 'Loader',
    props: ['width', 'height', 'color']
}
</script>

<style scoped>
body {
  margin: 0;
  background: transparent;
}

.wrapper {
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.loader {
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>