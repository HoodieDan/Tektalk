<template>
  <div class="container">
    <div class="post">
        <div class="row">
            <div class="col-3">
                <router-link :to="{name: 'Profile', params: { username: 'hoodiedan' }}">
                    <div class="circular">
                        <img src="../assets/images/me.jpg" alt="gorgeous">
                    </div>
                </router-link>
            </div>
            <div class="col-9">
                <div class="name-and-username">
                    <h4>Drew</h4>
                    <p class="text-gradient">@Hoodiedan</p>
                    <p class="dark">12:30 · 2 October, 2022</p>
                </div>
            </div>
            <div class="user-post light mt-3">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Doloribus suscipit itaque odit accusantium quia at nam ad fuga, 
                    optio tempora non repellat accusamus, cumque porro aspernatur 
                    voluptatum quasi odio eius voluptatibus distinctio? Culpa dicta 
                    cumque placeat ea corrupti animi blanditiis vitae, beatae commodi 
                    dolorum unde natus porro, tempore, doloremque eos.</p>
            </div>
            <div class="col-auto">
                <p>20 <span class="subtext">comments</span></p>
            </div>
            <div class="col-auto">
                <p>20 <span class="subtext">likes</span></p>
            </div>
        </div>
    </div>

    <!-- Like and Share Buttons -->
    <div class="like-and-share row">
        <div class="like col-6 text-center">
            <h6>Like</h6>
        </div>
        <div class="share col-6 text-center">
            <h6>Share</h6>
        </div>
    </div>

    <!-- comment box  -->
    <div>
        <AddComment />
    </div>
  </div>
</template>

<script>
import AddComment from '../components/AddComment.vue';
export default {
    name: "PostDetails",
    components: { AddComment }
}
</script>

<style scoped>
div.post {
    width: 100%;
    background-color: #000;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    cursor: pointer;
}
div.circular {
    width: 100px;
    height: 100px;
}
div.like-and-share {
    width: 100%;
    background-color: #000;
    border-radius: 5px;
    padding: 1rem 1.5rem;
    margin: 0 0 0.5rem 0;
}
.like {
    border-right: 3px solid #A9A9A9;
    cursor: pointer;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    transition: all 0.5s;
}
.share {
    cursor: pointer;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-top-right-radius: 5px;
    transition: all 0.5s;
    border-bottom-right-radius: 5px;
}
.like:hover,
.share:hover {
    background-color: #191919;
    color: #01BAEF;
}
@media (max-width: 575px) {
    div.circular {
        width: 65px;
        height: 65px;
    }
}
@media (max-width: 310px) {
    div.circular {
        width: 45px;
        height: 45px;
    }
}
</style>