<template>
  <a href="#" class="c-product__card"
    @click.stop.prevent="pushPath(product.id)"
    title="查看更多">
    <img src="@/assets/images/onsale_icon.png" alt="sale image"
      class="c-product__card__sale" v-if="product.origin_price !== product.price">
    <div class="c-product__card__img"
      :style="{ 'background-image': 'url(' + product.imageUrl + ')' }">
      <div class="c-product__card__img__text d-none d-lg-block">
        <i class="fas fa-search mr-2"></i>查看更多
      </div>
    </div>
    <div class="c-product__card__body">
      <div class="d-flex flex-column mb-2">
        <h4 class="c-product__card__title h6">{{ product.title }}</h4>
        <div>
          <b class="c-product__card__price h6">NT{{ product.price | currency }}</b>
          <del class="text-muted" v-if="product.origin_price !== product.price">
            NT{{ product.origin_price | currency }}
          </del>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center mt-sm-auto">
        <div class="d-flex align-items-start">
          <span class="badge badge-pill badge-info"
            :class="{ 'ml-1': key !== 0 }"
            v-for="(el, key) in product.category" :key="key">
            <i class="fas fa-tag mr-1"></i>
            {{ el }}
          </span>
        </div>
        <button class="btn btn-primary btn-sm mt-2 text-nowrap" type="button"
          :class="{ 'disabled': modalLoading && product.id === productId }"
          @click.stop.prevent="showProduct(product.id)">
          <i class="fas fa-shopping-cart mr-1"></i>
          加入購物車
          <i class="fas fa-spinner fa-spin ml-1"
            v-if="modalLoading && product.id === productId"></i>
        </button>
      </div>
    </div>
  </a>
</template>
<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

export default {
  name: 'ProductCard',
  methods: {
    pushPath(id) {
      this.$router.push(`/products/${id}`);
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
  },
  computed: {
    ...mapGetters('productModules', ['productId', 'products']),
    ...mapGetters(['modalLoading']),
  },
  props: {
    product: {
      type: Object,
    },
  },
};
</script>
