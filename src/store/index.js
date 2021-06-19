import Vue from 'vue';
import Vuex from 'vuex';
import modal from './modules/modal'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    results: JSON.parse(localStorage.getItem('game-results')) || [],
  },
  mutations: {
    setResult(state, result) {
      state.results.push(result);
      localStorage.setItem('game-results', JSON.stringify(state.results));
    }
  },
  getters: {
    getResults(state) {
      return state.results;
    }
  },
  modules: {
    modal,
  }
})
