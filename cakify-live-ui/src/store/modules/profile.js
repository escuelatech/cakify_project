
import Vue from 'vue';
import Vuex from 'vuex';
import {GET_HEROS} from './mutation-types.js';
Vue.use(Vuex);

const state = {
    heroes:[],
};

const mutations = {
    [GET_HEROS](state){
        state.heroes= heroes;
    }
};

const actions ={
    getHerosAction({commit}){
        console.log(" profile image ");
        const heroes= "testvalue";
        commit("getHeros",heroes);
    }

}; 
const getters ={};

export default new Vuex.store ({
    state,
    mutations,
    actions,
    getters
});