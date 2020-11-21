<template>
<header id="header">
    <a href="index.html" class="logo">
        <h3>CAKIFY</h3>
    </a>
    <strong v-show="isAuthenticated"></strong>
    <ul class="icons">
        <li v-if="isAuthenticated">
            <button class="button small" @click="handleLogout">
                Logout
            </button>
        </li>
        <li v-else>
            <SocialLogin/>
        </li>
         
         <li v-if="isAuthenticated">
            <a href="#" class="logo">
                <img src="https://lh3.googleusercontent.com/a-/AOh14Gjk6Ho2z5m5KgWN9EunCxjSfUap6jMp60_jxqkxmA=s96-c" 
                alt="" height="40" />
                <img v-bind:src='{isGoogleLoginSucessful}'>
            </a>
        </li>
    </ul>

</header>
</template>

<script>
import logoutMixin from "@/mixins/logout.js";
import SocialLogin from "@/components/View/services/cakify_login/GoogleLogin.vue";

export default {
    mixins: [logoutMixin],
     components: {
        SocialLogin
    },
}
</script>
