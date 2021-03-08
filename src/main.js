import Vue from 'vue';
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueTypedJs from 'vue-typed-js';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import VueAnime from 'vue-animejs';

import App from './App.vue';
import router from './router';
import store from './store';
import './vee-validate';
import currency from './filters/currency';
import timestamp from './filters/timestamp';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueTypedJs);
Vue.use(VueAnime);

Vue.component('loading', Loading);
Vue.component('swiper', Swiper);
Vue.component('swiper-slide', SwiperSlide);

Vue.filter('currency', currency);
Vue.filter('timestamp', timestamp);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API_PATH}api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/signin',
        });
      }
    });
  } else {
    next();
  }
});
