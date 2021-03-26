<template>
  <main class="col-md-9">
    <div class="d-flex flex-sm-row flex-column justify-content-sm-between mb-3">
      <h3 class="h4 font-weight-bold py-2 pl-3 mb-0 mb-sm-0 mb-3
        u-border-left-title">{{ title }}</h3>
      <div class="d-flex justify-content-between align-items-center">
        <select class="form-control w-auto px-sm-2 px-1 mr-sm-3 mr-1"
          v-model="sortBy">
          <option value="">預設排序</option>
          <option value="toNew">最新上架</option>
          <option value="toLow">價格由高至低</option>
          <option value="toHigh">價格由低至高</option>
        </select>
        <span class="u-fz-sm h6-sm text-nowrap">共 {{ newProducts.length }} 件商品</span>
        <div class="btn-group btn-group-sm ml-sm-3 ml-2" role="group" aria-label="btn-group">
          <button type="button" class="btn  btn-outline-secondary text-dark"
            :class="{ 'active': isGraphic }"
            @click="isGraphic = true">
            <i class="fas fa-th-large"></i>
            <span class="sr-only">商品清單圖示版</span>
          </button>
          <button type="button" class="btn btn-outline-secondary text-dark"
            :class="{ 'active': !isGraphic }"
            @click="isGraphic = false">
            <i class="fas fa-list"></i>
            <span class="sr-only">商品清單描述版</span>
          </button>
        </div>
      </div>
    </div>
    <nav v-if="productsNav.isShow">
      <ul class="d-flex list-unstyled text-center mb-n1">
        <li v-for="(item, key) in productsNav.list" :key="key"
          class="flex-fill py-2">
          <a href="#" class="d-block u-border-sm"
            :class="{ 'border-right': key + 1 !== productsNav.list.length }"
            @click.prevent="filterProductsNav(item)">
            <span class="c-hover"
              :class="{ 'active': item === productsNav.title[$route.name] }">{{ item }}</span>
          </a>
        </li>
      </ul>
    </nav>
    <p class="text-center mt-5" v-if="isSearch">
      搜尋「 {{ $route.query.keyword }} 」，找不到任何東西。請使用其他的關鍵字再試一次。
    </p>
    <div class="row pt-3" :class="{ 'graphic': isGraphic }">
      <div :class="{ 'col-12': !isGraphic,
        'col-lg-4': isGraphic, 'col-sm-6': isGraphic, 'mb-4': isGraphic }"
        v-for="(item, key) in pageProducts" :key="item.id">
        <a href="#" class="c-product__card u-fadeIn"
          :class="{ 'border-top-0': key !== 0 && !isGraphic }"
          @click.stop.prevent="pushPath(item.id)"
          title="查看更多">
          <img src="@/assets/images/onsale_icon.png" alt="sale-image"
            class="c-product__card__sale" v-if="item.origin_price !== item.price">
          <div class="c-product__card__img"
            :style="{ 'background-image': `url(${item.imageUrl})` }">
            <div class="c-product__card__img__text d-none d-lg-block">
              <i class="fas fa-search mr-2"></i>查看更多
            </div>
          </div>
          <div class="c-product__card__body">
            <div class="d-flex flex-column mb-2"
              :class="{ 'mr-sm-2': !isGraphic, 'mb-sm-0': !isGraphic }">
              <h4 class="c-product__card__title">{{ item.title }}</h4>
              <p class="d-none d-sm-block" v-if="!isGraphic">{{ item.description }}</p>
              <div :class="{ 'mt-auto': !isGraphic }">
                <b class="c-product__card__price">NT{{ item.price | currency }}</b>
                <del class="text-muted" v-if="item.origin_price !== item.price">
                  NT{{ item.origin_price | currency }}
                </del>
              </div>
            </div>
            <div class="d-flex flex-column"
              :class="{ 'ml-sm-auto': !isGraphic, 'align-items-start': !isGraphic,
              'align-items-center': isGraphic, 'mt-sm-auto': isGraphic }">
              <div class="d-flex align-items-start"
                :class="{ 'flex-column': !isGraphic,
                'flex-row': isGraphic }">
                <span class="badge badge-pill badge-info"
                  :class="{ 'mt-1': key !== 0 && !isGraphic,
                  'ml-1': key !== 0 && isGraphic }"
                  v-for="(el, key) in item.category" :key="key">
                  <i class="fas fa-tag mr-1"></i>
                  {{ el }}
                </span>
              </div>
              <button class="btn btn-primary btn-sm mt-2 text-nowrap" type="button"
                :class="{ 'mt-sm-auto': !isGraphic,
                'disabled': modalLoading && item.id === productId }"
                @click.stop.prevent="showProduct(item.id)">
                <i class="fas fa-shopping-cart mr-1"></i>
                加入購物車
                <i class="fas fa-spinner fa-spin ml-1"
                  v-if="modalLoading && item.id === productId"></i>
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
    <ProductPagination :data="newProducts" @filterData="filterData"/>
  </main>
</template>
<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

import ProductPagination from '@/components/ProductPagination.vue';

export default {
  name: 'Products',
  data() {
    return {
      newProducts: [],
      pageProducts: [],
      productsNav: {
        isShow: false,
        title: {},
        list: [],
      },
      sortBy: '',
      isGraphic: true,
      isSearch: false,
      title: '',
    };
  },
  methods: {
    filterProductsNav(name) {
      const vm = this;
      if (!name) {
        [vm.productsNav.title[vm.$route.name]] = [vm.productsNav.list[0]];
      } else {
        vm.productsNav.title[vm.$route.name] = name;
      }
      vm.newProducts = vm.products.filter((el) => (
        el.category[1] === vm.productsNav.title[vm.$route.name]));
      vm.sort();
    },
    showProduct(id) {
      this.$store.dispatch('productModules/getProduct', {
        id,
        isModal: true,
      })
        .then(() => {
          $('#productModal').modal('show');
        });
    },
    pushPath(id) {
      this.$router.push(`/products/${id}`);
    },
    filterData(data) {
      this.pageProducts = data;
    },
    sort() {
      const vm = this;
      switch (vm.sortBy) {
        case 'toLow':
          vm.newProducts = vm.newProducts.sort((a, b) => b.price - a.price);
          break;
        case 'toHigh':
          vm.newProducts = vm.newProducts.sort((a, b) => a.price - b.price);
          break;
        case 'toNew':
          vm.newProducts = vm.newProducts.sort((a, b) => a.num - b.num);
          break;
        default:
          vm.newProducts = vm.newProducts.sort((a, b) => b.num - a.num);
          break;
      }
    },
    filterNewProducts() {
      const vm = this;
      const { name } = vm.$route;
      const search = vm.$route.query.keyword;

      vm.title = name;
      vm.isSearch = false;
      vm.productsNav.isShow = false;
      switch (name) {
        case '所有商品':
          vm.newProducts = [...vm.products];
          break;
        case '搜尋':
          vm.title = `「${search}」的搜尋結果`;
          vm.newProducts = vm.products.filter((el) => {
            const str = el.category[0] + el.category[1] + el.description + el.title + el.content;
            return str.indexOf(search) !== -1;
          });
          if (vm.newProducts.length) {
            vm.isSearch = false;
          } else {
            vm.isSearch = true;
          }
          break;
        default:
          vm.newProducts = vm.products.filter((el) => el.category[0] === name);
          if (vm.newProducts[0].category[1]) {
            vm.productsNav.list = [];
            vm.productsNav.isShow = true;
            vm.newProducts.forEach((el) => {
              if (vm.productsNav.list.indexOf(el.category[1]) < 0) {
                vm.productsNav.list.push(el.category[1]);
              }
            });
            vm.filterProductsNav(vm.productsNav.title[vm.$route.name]);
          }
          break;
      }
      vm.sort();
    },
  },
  computed: {
    ...mapGetters('productModules', ['productId', 'products']),
    ...mapGetters(['modalLoading']),
  },
  watch: {
    sortBy: {
      handler() {
        this.sort();
      },
      immediate: true,
    },
    $route: {
      handler() {
        if (this.products.length) {
          this.filterNewProducts();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.sortBy = this.$route.params.sort || '';
    this.$store.watch((state) => state.productModules.products,
      this.filterNewProducts);
  },
  components: {
    ProductPagination,
  },
};
</script>
