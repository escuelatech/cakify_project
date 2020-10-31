import Vue from 'vue'
import App from "./Appdefault/App.vue"
import router from "./router/index.js"
import vuetify from './plugins/vuetify';
import "./design/fontawesome-all.min.css";
import "./design/main.scss";
import store from './store';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GoogleAuth from './shared/google_oauth.js'
const gauthOption = {
  clientId: '707231563844-e5cpkqrlt62gncmj6b84of5sml9lp8g9.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GoogleAuth, gauthOption);
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
   render: h => h(App)
}).$mount('#app')

 Vue.use(BootstrapVue)