<template>
  <div class="container">
    <div class="setting logout" @click.prevent="signOut">
        <div class="signout w-100">
            <p class="mb-0"><i class="fa fa-solid fa-arrow-right-from-bracket"></i><span>Sign Out</span></p>
        </div>
    </div>
  </div>
</template>

<script>
import { authStore } from '../stores/auth';

export default {
    name: 'SettingsPage',
    data() {
        return {
            
        }
    },
    methods: {
        signOut() {
            const auth = authStore();
            auth.signOut();
            localStorage.clear()

            this.$router.push({ name: 'Auth' })
        }
    },
}
</script>

<style>
p {
    transition: all 0.5s;
}
div.setting {
    border-radius: 5px;
    background-color: #000;
    padding: 1.5rem 2rem;
}
div.logout {
    cursor: pointer;
}
div.logout:hover {
    color: #01BAEF;
}
@media (max-width: 575px) {
    div.setting {
        padding: 1rem;
    }
}
</style>