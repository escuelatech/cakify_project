import Vue from 'vue'
import App from "./Appdefault/App.vue"
import router from "./router/index.js"
import vuetify from './plugins/vuetify';
import "./design/fontawesome-all.min.css";
import store from './store';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'




Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
   render: h => h(App)
}).$mount('#app')

 Vue.use(BootstrapVue)