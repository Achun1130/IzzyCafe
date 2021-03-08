import Vue from 'vue';
import Vuex from 'vuex';

import alertModules from './alert';
import cartModules from './cart';
import productModules from './product';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isLoading: false,
    modalLoading: false,
  },
  mutations: {
    ISLOADING(state, payload) {
      state.isLoading = payload;
    },
    MODALLOADING(state, payload) {
      state.modalLoading = payload;
    },
  },
  actions: {
    copyText(context, text) {
      const input = document.createElement('input');
      input.value = text.target.innerText;
      document.body.appendChild(input);
      input.select();
      document.execCommand('Copy');
      input.remove();
      context.dispatch('alertModules/updateMessage', {
        message: `複製 ${text.target.innerText} 至剪貼簿`,
        status: 'success',
      });
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
    modalLoading: (state) => state.modalLoading,
  },
  modules: {
    alertModules,
    cartModules,
    productModules,
  },
});
