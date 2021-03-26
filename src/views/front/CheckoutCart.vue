<template>
  <main>
    <section class="row justify-content-center mt-5" v-if="!carts.length">
      <div class="col text-center">
        <i class="fas fa-5x fa-shopping-cart text-secondary mb-4"></i>
        <div class="h5 font-weight-bold">你的購物車是空的</div>
        <div class="u-fz-sm mb-3">記得加入商品到你的購物車</div>
        <router-link to="/products" class="btn btn-info px-4">前往購物</router-link>
      </div>
    </section>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="row mt-sm-4 mt-3" v-if="carts.length"
        @submit.prevent="handleSubmit(goCheckout)">
        <section class="col-lg-8 mb-3">
          <div class="card">
            <div class="card-header px-sm-3 px-2">
              <h3 class="font-weight-bold card-title h5 mb-0">購物車（{{ carts.length }} 件）</h3>
            </div>
            <div class="p-checkout__grid d-none d-sm-grid u-fz-sm">
              <div class="p-checkout__grid__title">商品資料</div>
              <div class="p-checkout__grid__price">單件價格</div>
              <div class="p-checkout__grid__qty text-center">數量</div>
              <div class="p-checkout__grid__total text-center">小計</div>
              <div class="p-checkout__grid__btn"></div>
            </div>
            <div class="p-checkout__grid"
              :class="{ 'border-bottom-0': key + 1 === carts.length }"
              v-for="(item, key) in carts" :key="item.id">
              <div class="p-checkout__grid__title">
                <div class="p-cart__img"
                  :style="{ 'background-image': `url(${item.imageUrl})` }"></div>
                <h5 class="h6">{{ item.title }}</h5>
              </div>
              <div class="p-checkout__grid__price">
                <span>NT{{ item.price | currency }}</span>
                <br>
                <del class="u-fz-sm text-muted"
                  v-if="item.price !== item.origin_price">
                  NT{{ item.origin_price | currency }}
                </del>
              </div>
              <div class="p-checkout__grid__qty">
                <QtyButton :data="item"
                  :qtyClass="['input-group-sm', 'pr-sm-1']" :isId="false"/>
              </div>
              <div class="p-checkout__grid__total">
                NT{{ item.qty * item.price | currency }}
              </div>
              <div class="p-checkout__grid__btn">
                <button type="button" class="close float-none" aria-label="Close"
                  @click="showDelModal(item)">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section class="col-lg-4">
          <div class="card">
            <div class="card-header px-sm-3 px-2">
              <h3 class="font-weight-bold card-title h5 mb-0">訂單資訊</h3>
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <span>小計：</span>
                <span>NT{{ getTotal | currency }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>運費：</span>
                <span>NT$0</span>
              </div>
              <hr>
              <b class="d-flex justify-content-between mb-3"
                :class="{ 'text-success': carts.final_total !== carts.total }">
                <span>合計：</span>
                <span>NT{{ getTotal | currency }}</span>
              </b>
              <div class="d-flex">
                <router-link to="/products"
                  class="btn btn-outline-info btn-block mr-2 text-dark">繼續購物</router-link>
                <button type="submit" class="btn btn-info btn-block mt-0"
                  :class="{ 'disabled': status.goCheckoutLoading }">
                  前往結帳
                  <i class="fas fa-spinner fa-spin ml-1"
                    v-if="status.goCheckoutLoading"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </ValidationObserver>
    <div class="modal fade" id="delModal" tabindex="-1"
      aria-labelledby="delModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0 pt-2 pb-4">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            確定要移除 <b>{{ newCart.title }}</b> 這個商品嗎？
          </div>
          <div class="modal-footer border-0 pt-4">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="removeCart()">確定</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

import QtyButton from '@/components/QtyButton.vue';

export default {
  name: 'CheckoutCart',
  data() {
    return {
      status: {
        goCheckoutLoading: false,
      },
      total: 0,
      newCart: {},
    };
  },
  methods: {
    showDelModal(item) {
      this.newCart = item;
      $('#delModal').modal('show');
    },
    removeCart() {
      $('#delModal').modal('hide');
      this.$store.dispatch('cartModules/removeCart', this.newCart.id);
    },
    goCheckout() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const data = [];
      const reqListDel = [];
      const reqListPost = [];
      const carts = JSON.parse(localStorage.getItem('carts'));

      vm.status.goCheckoutLoading = true;
      vm.$http.get(api)
        .then((response) => response.data.data.carts)
        .then((cartsData) => {
          if (cartsData.length) {
            cartsData.forEach((el) => {
              const req = vm.$http.delete(`${api}/${el.id}`);
              reqListDel.push(req);
            });
            return vm.$http.all(reqListDel);
          }
          return false;
        })
        .then(() => {
          carts.forEach((el) => {
            data.push({
              product_id: el.id,
              qty: el.qty,
            });
          });
          data.forEach((el) => {
            const req = vm.$http.post(api, { data: el });
            reqListPost.push(req);
          });
          return vm.$http.all(reqListPost);
        })
        .then(() => {
          vm.status.goCheckoutLoading = false;
          vm.$router.push('/checkout/info');
        });
    },
  },
  computed: {
    getTotal() {
      return this.carts.reduce((acc, cur) => {
        const plus = acc + (cur.qty * cur.price);
        return plus;
      }, 0);
    },
    ...mapGetters('cartModules', ['carts']),
  },
  components: {
    QtyButton,
  },
};
</script>
