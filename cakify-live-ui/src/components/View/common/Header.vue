<template>
<header id="header">
    <a href="#" class="logo">
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
                <img v-bind:src="isGoogleLoginSucessful" alt="" height="40">
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
