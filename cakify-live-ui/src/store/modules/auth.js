import CakifyAdminService from "@/apiservices/CakifyAdminService.js";

const token = JSON.parse(localStorage.getItem('token'));
// const userEmail = JSON.parse(localStorage.getItem('email'));

const initialState = token
  ? { status: { loggedIn: true}, token }
  : { status: {}, token: null };

const mutations = {
  LOGIN_REQUEST (state, token) {
    state.status = { loggingIn: true};
    state.token = token;
  },
  LOGIN_SUCCESS (state, token) {
    state.status = { loggedIn: true};
    state.token = token;
  },
  LOGIN_FAILED (state) {
    state.status = {};
    state.token = null;
  },
  LOGOUT (state) {
    state.status = {};
    state.token = null;
  }
}

const actions = {
  login ({ commit }, { email, password,socialProfileImage }) {
    commit('LOGIN_REQUEST', { email });
    return CakifyAdminService.login(email, password,socialProfileImage)
      .then(response => {
        console.log('LOGIN_SUCCESS' +email);
        commit('LOGIN_SUCCESS', response.data.token);
      }).catch(error => {
        commit('LOGIN_FAILED', error);
        return Promise.reject(error)
      });
  },
  logout ({ commit }) {
    CakifyAdminService.logout();
    commit('LOGOUT');
  }
};

const getters = {
  isAuthenticated: (state) => state.status.loggedIn,
  loggedinUserName: (state) => state.status.userEmail
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters
};
