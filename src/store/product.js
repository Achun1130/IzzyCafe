import axios from 'axios';
import router from '@/router';

export default ({
  namespaced: true,
  state: {
    productId: '',
    products: [],
    product: {
      category: [],
    },
    categories: [],
  },
  actions: {
    getProduct(context, { id, isModal }) {
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      let status = 'ISLOADING';

      if (isModal) {
        status = 'MODALLOADING';
        context.commit('PRODUCTID', id);
      }

      context.commit(status, true, { root: true });
      return axios.get(api).then((response) => {
        context.commit(status, false, { root: true });
        if (response.data.success) {
          context.commit('PRODUCT', response.data.product);
        } else {
          router.push('/products');
          context.dispatch('alertModules/updateMessage', response.data, { root: true });
        }
      });
    },
    getProducts(context) {
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;

      context.commit('ISLOADING', true, { root: true });
      axios.get(api).then((response) => {
        if (response.data.success) {
          context.commit('ISLOADING', false, { root: true });
          context.commit('PRODUCTS', response.data.products);
          context.commit('CATEGORIES');
        } else {
          router.push('/');
          context.dispatch('alertModules/updateMessage', response.data, { root: true });
        }
      });
    },
  },
  mutations: {
    PRODUCTID(state, payload) {
      state.productId = payload;
    },
    PRODUCT(state, payload) {
      state.product = payload;
      state.product.category = state.product.category.split('-');
      state.product.content = state.product.content.split('\n');
    },
    PRODUCTS(state, payload) {
      payload.forEach((el, i) => {
        el.category = el.category.split('-');
        el.num = payload.length - 1 - i;
      });
      state.products = payload;
    },
    CATEGORIES(state) {
      const set = new Set();
      state.products.forEach((el) => set.add(el.category[0]));
      state.categories = [...set];
    },
  },
  getters: {
    productId: (state) => state.productId,
    products: (state) => state.products,
    product: (state) => state.product,
    categories: (state) => state.categories,
  },
});
