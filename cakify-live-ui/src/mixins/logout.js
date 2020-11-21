
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      loggedinUserName: "auth/loggedinUserName",
      isGoogleLoginSucessful: "googleauth/isGoogleLoginSucessful"
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    handleLogout() {
      this.logout();
      // this.$router.push({name: 'LogoutPage' }).catch(err => console.log(err));
    }
  }
}
