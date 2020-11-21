
const userImage = localStorage.getItem('userImage');

const initialState = userImage
  ? { status: { loggedIn: true}, userImage }
  : { status: {}, userImage: null };

  const mutations = {
    PROFILE_REQUEST (state, userImage) {
      state.status = { loggingIn: true};
      state.userImage = userImage;
    },
    PROFILE_SUCCESS (state, userImage) {
      state.status = { loggedIn: true};
      state.userImage = userImage;
    },
    PROFILE_FAILED (state) {
      state.status = {};
      state.userImage = null;
    },
    PROFILE_LOGOUT (state) {
      state.status = {};
      state.userImage = null;
    }
  }

  const actions = {
    profileImage ({commit}, { userImage }) {
      commit('PROFILE_REQUEST', { userImage });
      let val=localStorage.getItem('userImage');
      console.log("User Image",val);
      commit('PROFILE_SUCCESS', val);
    //   return cakifyAdminService.login(email, password)
    //     .then(response => {
    //       console.log('PROFILE_SUCCESS' +email);
    //       commit('PROFILE_SUCCESS', response.data.token);
    //     }).catch(error => {
    //       commit('PROFILE_FAILED', error);
    //       return Promise.reject(error)
    //     });
    }
  };

  const getters = {
    isGoogleLoginSucessful: (state) => state.userImage
  };
  
  export default {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
  };