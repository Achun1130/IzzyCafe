<template>
  <div class="container pt-4">
    <div class="c-product__banner mb-3 text-center">
      <p class="c-swiper__text text-white h4-md mb-0 p-2">
        輸入優惠碼
        <a href="#" class="text-white border-bottom border-white"
          data-toggle="tooltip" data-trigger="hover" data-original-title="點擊複製"
          @click.prevent="copyText($event)">izzy2021</a>
        <span class="d-md-inline d-none">，</span><br class="d-md-none">
        即可享有 88 折優惠 ～
      </p>
    </div>
    <Breadcrumb :title="title"/>
    <div class="row">
      <nav class="col-md-3 d-md-block d-none">
        <ProductsSidebar/>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

import ProductsSidebar from './ProductsSidebar.vue';
import Breadcrumb from './Breadcrumb.vue';

export default {
  name: 'ProductsLayout',
  data() {
    return {
      title: [],
    };
  },
  methods: {
    copyText(text) {
      this.$store.dispatch('copyText', text);
    },
    fitlerTitle() {
      const vm = this;
      if (vm.$route.params.id) {
        const single = vm.products.filter((el) => el.id === vm.$route.params.id);
        vm.title = [single[0].category[0], single[0].title];
      } else {
        vm.title = [vm.$route.name];
      }
    },
  },
  watch: {
    $route: {
      handler() {
        if (this.products.length) {
          this.fitlerTitle();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    ...mapGetters('productModules', ['products']),
  },
  created() {
    this.$store.watch((state) => state.productModules.products,
      this.fitlerTitle);
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  components: {
    ProductsSidebar,
    Breadcrumb,
  },
};
</script>
