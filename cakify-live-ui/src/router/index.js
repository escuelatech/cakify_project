import Vue from 'vue';
import VueRouter from 'vue-router';

import CakifyLoginPage from "@/components/View/services/cakify_login/CakifyLoginPage.vue"
import CakifyRegistrationPage from "@/components/View/services/cakify_registration/CakifyRegistrationPage.vue"
import AddCakePage from "@/components/View/services/add_item/AddCakePage.vue";

// const DashboardPage = () => import(/* webpackChunkName: "dashboard" */ '@/components/View/services/dashboard_service/DashboardPage.vue')

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: [ 
    {
      path: '/cakify',
      name: 'CakifyLoginPage',
      component: CakifyLoginPage
    },
    {
      path: '/cakifyregistration',
      name: 'CakifyRegistrationPage',
      component: CakifyRegistrationPage
    },
    {
      path: '/addcake',
      name: 'AddCakePage',
      component: AddCakePage
    },
    { 
      path: '*', 
      redirect: '/cakify' 
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.hash) {
        return {
          selector: to.hash
          // , offset: { x: 0, y: 10 }
        }
      }
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const loggedIn = localStorage.getItem('token');
    if (!loggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router;