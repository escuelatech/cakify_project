<template>
<div id="sidebar" @click="handleSidebarClick" :class="{ inactive: isSidebarInactive, 'no-transition': hideTransition }" v-show="isAuthenticated">
    <a href="#sidebar" @click="handleToggle" class="toggle">Toggle</a>
    <div @click="isSidebarInactive = true" class="mobile-backdrop"></div>
    <div class="inner">
        <!-- Search -->
        <section id="search" class="alt">
            <form method="post" action="#">
                <input type="text" name="query" id="query" placeholder="Search" />
            </form>
        </section>

        <!-- Menu -->
        <nav id="menu" >
            <header class="major">
                <h2>Menu</h2>
            </header>
            <ul>
                <li v-show="isAuthenticated">
                    <router-link @click="handleRouterLinkClick" :to="{ name: 'LandingPage' }">Dashboard</router-link>
                </li> 
                <li v-show="!isAuthenticated">
                    <router-link @click="handleRouterLinkClick" :to="{ name: 'CakifyRegistrationPage' }">REGISTER</router-link>
                </li> 

                <li v-show="isAuthenticated">
                    <router-link @click="handleRouterLinkClick" :to="{ name: 'AddCakePage' }">ADD CAKE</router-link>
                </li>

            </ul>
        </nav>

        <footer id="footer">
            <p class="copyright">
                &copy;Cakify. All rights reserved.
                <a href="https://escuelatech.com"> <br>
                    Designed & </a> Development:
                <a href="https://escuelatech.com"> Escuela Technologies. </a>
            </p>
        </footer>
    </div>
</div>
</template>

<script>
import BREAKPOINTS, {
    isMoreThan
} from '@/shared/breakpoints';
import {
    debounce
} from 'lodash-es';
import logoutMixin from "@/mixins/logout.js";

export default {
    name: 'Sidebar',
    data() {
        return {
            isSidebarInactive: false,
            isBreakpointMoreThanLarge: null,
            hideTransition: false,
            isDropdownOpen: false // dropdown sample
        }
    },
    mixins: [logoutMixin],
    watch: {
        isBreakpointMoreThanLarge(newValue, oldValue) {
            if (typeof oldValue !== "boolean") {
                return
            }
            this.hideTransition = true;
            this.isSidebarInactive = !newValue;
            setTimeout(() => {
                this.hideTransition = false;
            }, 500);
        }
    },
    created() {
        this.checkWindowWidthDebounced = debounce(this.checkWindowWidth, 20);
        window.addEventListener('resize', this.checkWindowWidthDebounced);
        this.checkWindowWidth();
    },
    destroyed() {
        window.removeEventListener('resize', this.checkWindowWidthDebounced);
    },
    methods: {
        checkWindowWidth() {
            const width = window.innerWidth;
            this.isBreakpointMoreThanLarge = isMoreThan(width, BREAKPOINTS.L);
            this.isSidebarInactive = !this.isBreakpointMoreThanLarge;
        },
        handleDropdownClick() {
            // dropdown should be a separate component
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        handleSidebarClick(e) {
            if (!this.isBreakpointMoreThanLarge) {
                e.stopPropagation();
            }
        },
        handleToggle(e) {
            e.preventDefault();
            e.stopPropagation();
            this.isSidebarInactive = !this.isSidebarInactive;
        },
        handleRouterLinkClick() {
            if (!this.isBreakpointMoreThanLarge) {
                this.isSidebarInactive = true;
            }
        },
        handleLinkClick(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!this.isBreakpointMoreThanLarge) {
                this.isSidebarInactive = true;
                this.isDropdownOpen = true;
            }
            // TODO probably just use router-link everywhere and remove this
            setTimeout(function () {
                if (e.target.target == '_blank')
                    window.open(e.target.href);
                else
                    window.location.href = e.target.href;

            }, 500);
        },

    }
}
</script>
