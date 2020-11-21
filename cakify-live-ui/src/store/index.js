import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.js'
import googleauth from './modules/googleauth.js'

Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
    auth,
    googleauth,
  },
})
