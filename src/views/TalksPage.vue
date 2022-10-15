<template>
  <div class="container">
    <h5>Your Talks</h5>
    <div class="row">
      <div class="col-lg-6 mb-2">
        <SingleTalk />
      </div>
      <div class="col-lg-6">
        <SingleTalk />
      </div>
    </div>

    <div class="mt-4" >
      <h5>All Talks</h5>
    </div>
    <div class="row">
      <div class="col-lg-6 mb-2">
        <SingleTalk />
      </div>
      <div class="col-lg-6">
        <SingleTalk />
      </div>
    </div>
  </div>
</template>

<script>
import SingleTalk from '../components/SingleTalk.vue';
export default {
    components: { SingleTalk }
}
</script>

<style>

</style>