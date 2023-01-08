<template>
    <div>
        <div class="row">
            <div class="col-lg-1 col-md-1 col-sm-2 col-2">
                <ImageSkeleton :height="40" :width="40" />
            </div>
            <div class="col-lg-11 col-md-11 col-sm-10 col-10 form">
                <div class="form">
                    <div class="row w-100">
                        <div class="col-lg-6 col-md-6 ">
                            <ItemSkeleton :height="48" :margin="5" :number="1" />
                        </div>
                        <div class="col-lg-6 col-md-6 row buttons">
                            <div class="attached d-flex col-6 buttons">
                                <ImageSkeleton :width="25" :height="25" />
                                <p></p>
                            </div>
                            <div class="file-input col-2">
                                <ImageSkeleton :width="25" :height="25" />
                            </div>
                            <div class="col-4">
                                <div class="button"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ImageSkeleton from './ImageSkeleton.vue';
import ItemSkeleton from './ItemSkeleton.vue';

export default {
    name: 'PostBoxSkeleton',
    components: { ImageSkeleton, ItemSkeleton }
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
.animate {
    animation: pulse-bg 1s infinite;
}
.attached p {
    content: ' ';
    background-color: #1B1B1B;
    animation: pulse-bg 1s infinite;
    height: 2rem;
    margin-left: 0.5rem;
    margin-top: 1rem;
    width: 80%;
}
div.button {
    height: 2.5rem;
    width: 6rem;
    border-radius: 32px;
    background-color: #1B1B1B;
    animation: pulse-bg 1s infinite;
}
div.buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>