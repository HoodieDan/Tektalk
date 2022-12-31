<template>
    <div class="suggestion-card border border-[#c4c4c45b] rounded-2xl p-4 py-8 w-[281px] h-[293px] flex flex-col justify-center items-center">
        <div class="profile-image">
            <!-- <img class="profile-image__border" src="../assets/img-border.png" /> -->
            <img class="profile-image__img" />
        </div>
        <div class="profile-info">
            <span />
            <h3 />
        </div>
    </div>

</template>

<style scoped>
@keyframes pulse-bg {
  0% {
    background-color: #ddd;
  }
  50% {
    background-color: #d0d0d0;
  }
  100% {
    background-color: #ddd;
  }
}
/* .suggestion-card {
 display: flex;
} */
.suggestion-card .profile-image {
  width: 5rem;
  height: 5rem;
  padding-top: 10%;
  border-radius: 50%;
  background-color: #ddd;
  animation: pulse-bg 1s infinite;
  margin-bottom: 16px;
}
/* .suggestion-card .profile-image__img {
  width: 10%;
  padding-top: 10%;
  border-radius: 50%;
  animation: pulse-bg 1s infinite;
} */
.profile-info {
    text-align: center;
}
.profile-info span {
  min-width: 170px;
  height: 24px;
  display: inline-block;
  background-color: #ddd;
}

.profile-info h3 {
  content: ' ';
  width: 200px;
  height: 24px;
  background-color: #ddd;
  margin: 10px 0;
}
</style>
