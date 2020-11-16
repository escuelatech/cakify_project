import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.js'

Vue.use(Vuex)

const bakeryRegistrationMessage = `<header class="major"><h4>Thank you for registering your bakery with us!!</h4>
</header><h4>A verification link has been sent to your email account. Please click on the link to verify your email and continue the registration process.</h4><br>
<h6>If you haven't received the email, do the following:
<ul><li>Make sure the provided email address is correct</li><li>Check Promotions and Spam Folders</li></ul>
If none of the above helps, please contact us at <a href="/contactus">cakify@gmail.com</a></h6>`

export default new Vuex.Store({
  modules: {
    auth
  },

  state:{
  message:""
  },

  mutations:{
    ADD_BAKERYREG_MESSAGE: state=>{
      state.message = bakeryRegistrationMessage
    }
  },
  actions:{
    addBakeryRegMessage: ({commit}) => {
      commit('ADD_BAKERYREG_MESSAGE')
    },
  }

})
