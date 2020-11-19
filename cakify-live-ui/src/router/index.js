import Vue from 'vue';
import VueRouter from 'vue-router';

import MainLandingPage from "@/components/View/services/LandingPage/MainLandingPage.vue";
import CakeDetailsPage from "@/components/View/services/cake_detail/CakeDetailsPage.vue";
import PaymentPage from "@/components/View/services/payment/PaymentPage.vue";
import CakeListByBakeryPage from "@/components/View/services/cake_list/CakeListbyBakeryPage.vue";
import BakeryPage from "@/components/View/services/LandingPage/BakeryPage.vue";
import SearchPage from "@/components/View/services/LandingPage/SearchPage.vue";


Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: [ 
    {
      path: '/cakify',
      name: 'MainLandingPage',
      component: MainLandingPage
    },
    {
      path: '/bakerypage',
      name: 'BakeryPage',
      component: BakeryPage
    },
    {
      path: '/searchpage',
      name: 'SearchPage',
      component: SearchPage
    },
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
      path: '/bakery',
      name: 'BakeryPage',
      component: BakeryPage
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