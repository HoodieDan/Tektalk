<template>
  <div class="container">
    <div class="setting">
        <div class="hov">
            <p class="mb-0"><i class="fa-solid fa-pen-nib"></i><span>Edit Profile</span></p>
        </div>
    </div>
    <div class="setting">
        <div class="hov">
            <p class="mb-0"><i class="fa-solid fa-arrows-spin"></i><span>Reset Password</span></p>
        </div>
    </div>
    <div class="setting" @click.prevent="signOut">
        <div class="signout w-100 hov">
            <p class="mb-0"><i class="fa-solid fa-arrow-right-from-bracket"></i><span>Sign Out</span></p>
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
p span {
    transition: all 0.5s;
}
div.setting {
    border-radius: 5px;
    background-color: #000;
    padding: 1.5rem 2rem;
    margin-bottom: 0.5rem;
}
div.hov {
    cursor: pointer;
}
div.hov:hover {
    color: #01BAEF;
}
@media (max-width: 575px) {
    div.setting {
        padding: 1rem;
    }
}
</style>