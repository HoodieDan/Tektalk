<template>
  <div class="container">
    <PostBox />
    <PostItem />
  </div>
</template>

<script>
import PostBox from '../components/PostBox.vue';
import PostItem from '../components/PostItem.vue';
export default {
    name: 'HomePage',
    components: { PostBox, PostItem },
}
</script>

<style>

</style>
