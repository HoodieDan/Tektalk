<template>
  <div class="full">
    <div class="logo-group d-flex">
        <h3 class="logo-text">Tt</h3>
        <h3 class="logo mb-0 ms-2">TekTalk.</h3>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PreLoader',
}
</script>

<style scoped>
.full {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 100000000000000;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    /* animation: disappear 1s cubic-bezier(0.645,0.045,0.355,1) 2s forwards; */
}
.logo-group {
    align-items: flex-end;
    font-family: 'Poppins', sans-serif;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    width: 20rem;
}
.logo,
.logo-text {
    animation: right-slide 1s cubic-bezier(0.645,0.045,0.355,1) forwards;
    font-size: 3.3rem;
    width: 3.5rem;
}
.logo {
    font-weight: 700;
    font-size: 3rem;
    color: #e7e9ea;
}
@keyframes right-slide {
    from {
        transform: translateX(-350px);
    }
    to {
        transform: translateX(0);
    }
}
@keyframes disappear {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
@media (max-width: 768px) {
    .logo,
    .logo-text {
        font-size: 2rem;
        width: 2.3rem;
    }
    div.logo-group {
        width: 12rem;
    }
}
</style>