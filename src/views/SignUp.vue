<template>
  <div class="container-sm">
    <div class="text-center w-100">
        <h1 class="text-gradient">Tt.</h1>
        <h3>Welcome to Tektalk!</h3>
    </div>
    <div>
        <form>
            <label for="name">Name:</label>
            <div class="form-item mt-2 mb-3">
                <i class="fa-solid fa-signature icon"></i>
                <input id="name" type="text" class="input field" placeholder="Name" />
            </div>
            <label for="username">Username:</label>
            <div class="form-item mt-2 mb-3">
                <i class="fa-solid fa-at icon"></i>
                <input id="username" type="text" class="input field" placeholder="Username" />
            </div>
            <label for="email">Email:</label>
            <div class="form-item mt-2 mb-3">
                <i class="fa-regular fa-envelope icon"></i>
                <input id="email" type="text" class="input field" placeholder="Email" />
            </div>
            <label for="location">Location:</label>
            <div class="form-item mt-2 mb-3">
                <i class="fa-solid fa-location-crosshairs icon"></i>
                <input id="location" type="text" class="input field" placeholder="Location" />
            </div>
            <label for="name">Stack:</label>
            <div class="form-item mt-2 mb-3">
                <i class="fa-solid fa-code icon"></i>
                <select id="stack" type="text" class="input field" placeholder="Email" >
                    <option v-for="(stack, i) in stacks" :key="i" :value="stack">{{ stack }}</option>
                </select>
            </div>
            <label for="paswword">Password:</label>
            <div class="form-item mt-2 mb-3">
                <i class="fa-solid fa-lock icon"></i>
                <input id="password" type="text" class="input field" placeholder="Password" />
            </div>
            <label for="confirm_password">Confirm Password:</label>
            <div class="form-item mt-2 mb-3">
                <i class="fa-solid fa-lock icon"></i>
                <input id="confirm_password" type="text" class="input field" placeholder="Confirm Password" />
            </div>
            <button class="talk-btn w-100 mb-2 mt-5">
                <h4 class="light mt-2 mb-2">Register!</h4>
            </button>
            <p class="subtext">Already have an account? <router-link :to="{ name: 'SignIn' }" class="text-gradient">Sign in</router-link></p>
        </form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'SignUp',
    data() {
        return {
            stacks: [ 
                'Frontend Development', 
                'Backend Development',
                'Fullstack Development', 
                'DevOps', 
                'Design', 
                'Data Science', 
                'App Development', 
                'Game Development',
                'CyberSecurity',
                'Guest',
                'I do not want to put myself in a box',
                'I am yet to decide',
            ]
        }
    }
}
</script>

<style scoped>
.form-item i {
    position: absolute;
    bottom: -1px;
}  
.form-item i:hover {
    background-color: transparent !important;
}
.form-item {
    width: 100%;
    /* margin-bottom: 0.6rem; */
} 
.icon {
    padding-top: 12px;
    padding-left: 10px;
    min-width: 2.3rem;
    z-index: 10;
    color: #999999;
}   
.input-field {
    padding: 10px;
    text-align: center;
}
input, select {
    background: #222222;
    backdrop-filter: blur(45px);
    color: #e7e9ea;
    border: 1px solid #e7e9ea;
    border-radius: 32px;
    height: 2rem;
    padding-left: 2.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    width: 100%;
}
</style>