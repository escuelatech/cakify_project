<template>
<header id="header">
    <a href="index.html" class="logo">
        <!--<a href="#" class="logo"><img src="@/assets/images/pranama_log_2.jpeg" alt="" height="50" /> -->
        <h3>CAKIFY</h3>
    </a>
    <strong v-show="isAuthenticated">{{loggedinUserName}}</strong>

    <ul class="icons">
        <li v-if="isAuthenticated">
            <button class="button small" @click="handleLogout">
                Logout
            </button>
        </li>
        <li v-else>
            <button class="button primary small" @click="$router.push({ name: 'CakifyLoginPage' })">
                Login
            </button>
        </li>
        <li>
            <a href="#" class="icon brands fa-twitter">
                <span class="label">Twitter</span>
            </a>
        </li>
        <li>
            <a href="#" class="icon brands fa-facebook-f">
                <span class="label">Facebook</span>
            </a>
        </li>
        <li>
            <a href="#" class="icon brands fa-snapchat-ghost">
                <span class="label">Snapchat</span>
            </a>
        </li>
        <li>
            <a href="#" class="icon brands fa-instagram">
                <span class="label">Instagram</span>
            </a>
        </li>
        <li>
            <a href="#" class="icon brands fa-medium-m">
                <span class="label">Medium</span>
            </a>
        </li>
    </ul>

</header>
</template>

<script>
import logoutMixin from "@/mixins/logout.js";

export default {
    mixins: [logoutMixin]
}
</script>
