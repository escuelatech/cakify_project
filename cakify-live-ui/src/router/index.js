import Vue from 'vue';
import VueRouter from 'vue-router';

// import CakifyLoginPage from "@/components/View/services/cakify_login/CakifyLoginPage.vue"
// import CakifyRegistrationPage from "@/components/View/services/cakify_registration/CakifyRegistrationPage.vue"
// import AddCakePage from "@/components/View/services/add_item/AddCakePage.vue";
// import LandingPage from "@/components/View/services/LandingPage/LandingPage.vue";
import SearchPage from "@/components/View/services/LandingPage/SearchPage.vue";
import CakeDetailsPage from "@/components/View/services/cake_detail/CakeDetailsPage.vue";
import PaymentPage from "@/components/View/services/payment/PaymentPage.vue";
import CakeListByBakeryPage from "@/components/View/services/cake_list_by_bakery/CakeListByBakeryPage.vue";
// const DashboardPage = () => import(/* webpackChunkName: "dashboard" */ '@/components/View/services/dashboard_service/DashboardPage.vue')

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: [ 
    {
      path: '/cakify',
      name: 'SearchPage',
      component: SearchPage
    },
    // {
    //   path: '/cakify',
    //   name: 'LandingPage',
    //   component: LandingPage
    // },
    {
      path: '/cakedetails',
      name: 'CakeDetails',
      component: CakeDetailsPage
    },
    {
      path: '/payment',
      name: 'Payment',
      component: PaymentPage
    },
    {
      path: '/cakelistbybakery',
      name: 'CakeListByBakery',
      component: CakeListByBakeryPage
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