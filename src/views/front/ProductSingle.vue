<template>
  <div class="col-md-9">
    <a href="#" class="u-underline" @click.prevent="goBack">
      <i class="fas fa-reply mr-2"></i>返回前頁
    </a>
    <main class="row my-3" v-if="product.title">
      <div class="col-sm-6 mb-3 mb-sm-0">
        <div class="w-100 u-bg-cover position-relative h-sm-100"
        style="height: 200px"
        :style="{ 'background-image': `url(${product.imageUrl})` }">
          <img src="@/assets/images/onsale_icon.png" alt="sale-image"
            class="c-product__card__sale" v-if="product.origin_price !== product.price">
        </div>
      </div>
      <div class="col-sm-6">
        <h3 class="h4 font-weight-bold mb-3">
          {{ product.title }}
        </h3>
        <div class="mb-3">
          <span v-for="(item, key) in product.category" :key="key"
            class="badge badge-pill badge-info"
            :class="{ 'ml-2': key !== 0 }">
            <i class="fas fa-tag mr-1"></i>{{ item }}
          </span>
        </div>
        <ul class="u-border-left-title pl-2 u-fz-sm list-unstyled">
          <li class="mb-1">全店，單筆滿千免運費 (限台灣本島、離島)</li>
          <li>滿額 NT$2,000 即送精美小禮</li>
        </ul>
        <div class="mb-2">售價</div>
        <b class="h5 text-danger font-weight-bold mr-2">
          NT{{ product.price | currency }}
        </b>
        <del v-if="product.origin_price !== product.price" class="text-muted">
          NT{{ product.origin_price | currency }}
        </del>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form class="row mt-2 no-gutters"
          @submit.prevent="handleSubmit(addCart($event))">
            <div class="col-12">
              <label for="qty" class="mt-2">數量</label>
            </div>
            <div class="col-12 col-sm-6">
              <QtyButton :data="data" @getQty="getQty" :qtyClass="['pr-sm-1']"/>
            </div>
            <div class="w-100 mb-2"></div>
            <div class="col-12">
              <div class="d-flex position-sm-static fixed-bottom p-sm-0 p-2
                shadow-sm-none u-shadow-top"
                style="z-index: 1029;"
                :style="{
                  'background-image': `url(${require(`@/assets/images/vintage-concrete.png`)})`
                }">
                <button type="submit" class="btn btn-outline-info btn-block text-dark mr-2">
                  加入購物車
                </button>
                <button type="submit" class="btn btn-info btn-block mt-0">
                  立即購買
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <nav class="col-12 mt-4 mb-3">
        <ul class="d-flex text-center py-2 list-unstyled mb-0">
          <li class="w-50 mr-2">
            <a href="#" class="btn btn-block btn-outline-gray-500 text-dark py-2 text-center"
              :class="{ 'shadow': !isPayment }"
              @click.prevent="isPayment = false">商品描述</a>
          </li>
          <li class="w-50">
            <a href="#" class="btn btn-block btn-outline-gray-500 text-dark py-2 text-center"
              :class="{ 'shadow': isPayment }"
              @click.prevent="isPayment = true">運送及付款方式</a>
          </li>
        </ul>
      </nav>
      <div class="col-12">
        <h4 class="u-border-left-title font-weight-bold pl-3">
          {{ !isPayment ? '商品描述' : '運送及付款方式' }}
        </h4>
        <ul class="u-fadeIn list-unstyled px-4 my-4"
          v-if="product.content.length !== 1 && !isPayment">
          <li v-for="(item, key) in product.content" :key="key"
            class="mb-3">
            {{ item }}
          </li>
        </ul>
        <p class="px-4 my-4"
          v-if="product.content.length === 1 && !isPayment">
          {{ product.description }}
        </p>
        <div v-if="isPayment"
          class="d-flex justify-content-lg-between flex-lg-row flex-column
            text-muted u-fadeIn my-4">
          <section>
            <h5>送貨方式</h5>
            <ul class="u-fz-sm">
              <li class="mb-2">7-11取貨付款</li>
              <li class="mb-2">7-11純取貨不付款</li>
              <li class="mb-2">新竹物流宅配</li>
              <li>順豐國際快遞</li>
            </ul>
          </section>
          <section>
            <h5>付款方式</h5>
            <ul class="u-fz-sm">
              <li class="mb-2">信用卡（支援Visa, Master, JCB）</li>
              <li class="mb-2">超商代碼（需持代碼至超商印出帳單繳費）</li>
              <li class="mb-2">7-11 取貨付款</li>
              <li>ATM 虛擬代碼繳費（需持代碼至實體ATM或網路銀行繳費）</li>
            </ul>
          </section>
        </div>
        <h4 class="u-border-left-title font-weight-bold pl-3">
          相關商品
        </h4>
        <div class="m-4" v-if="!filterProducts.length">目前無相關商品</div>
        <div class="row graphic my-4" v-if="filterProducts.length">
          <div class="col-lg-4 col-sm-6 col-12 mb-4"
            v-for="(item, key) in filterProducts" :key="item.id"
            :class="{ 'd-lg-none': key === 3 }">
            <ProductCard :product="item"/>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import QtyButton from '@/components/QtyButton.vue';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'ProductSingle',
  data() {
    return {
      data: {
        qty: 1,
      },
      isPayment: false,
    };
  },
  watch: {
    '$route.params': {
      handler() {
        this.$store.dispatch('productModules/getProduct', {
          id: this.$route.params.id,
        });
        this.data.qty = 1;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    addCart(e) {
      const which = e.submitter.innerText === '加入購物車' ? 'cartLoading' : 'buyLoading';
      if (which === 'buyLoading') {
        this.$router.push('/checkout');
      } else {
        this.$store.dispatch('alertModules/updateMessage',
          { message: '加入購物車', status: 'success' });
        this.$store.commit('cartModules/TOGGLECART');
      }
      this.$store.dispatch('cartModules/addCart', {
        qty: this.data.qty,
        cartProduct: this.product,
      });
    },
    getQty(qty) {
      this.data.qty = qty;
    },
  },
  computed: {
    filterProducts() {
      const vm = this;
      const newPro = this.products.filter((el) => {
        if (vm.product.category.length > 1) {
          return el.category[1] === vm.product.category[1] && el.id !== vm.product.id;
        }
        return el.category[0] === vm.product.category[0] && el.id !== vm.product.id;
      });
      return newPro.filter((el, key) => key < 4);
    },
    ...mapGetters('productModules', ['product', 'products']),
  },
  components: {
    QtyButton,
    ProductCard,
  },
};
</script>
