<template>
  <main>
    <ValidationObserver v-slot="{ handleSubmit }" v-if="cartsData.total" tag="div">
      <form class="row mt-3 u-fadeIn"
        @submit.prevent="handleSubmit(goOrder)">
        <div class="col-lg-8 col-md-7 mb-3">
          <section class="card mb-3">
            <div class="card-header px-sm-3 px-2 d-flex">
              <h3 class="card-title h5 mb-0 font-weight-bold">顧客資料</h3>
            </div>
            <div class="card-body px-sm-3 px-2">
              <ValidationProvider class="form-group"
                name="名稱" v-slot="{ errors, classes }" rules="required" tag="div">
                <label for="name">顧客名稱*</label>
                <input type="text" class="form-control" id="name"
                  :class="classes" v-model="info.name">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider class="form-group"
                name="電子信箱" v-slot="{ errors, classes }" rules="required|email" tag="div">
                <label for="email">電子信箱*</label>
                <input type="email" class="form-control" id="email"
                  :class="classes" v-model="user.email">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider class="form-group"
                name="手機號碼" v-slot="{ errors, classes }" rules="required|numeric" tag="div">
                <label for="tel">手機號碼*</label>
                <input type="tel" class="form-control" id="tel" minlength="10" maxlength="10"
                  :class="classes" v-model="info.tel">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
              <label for="message">訂單備註</label>
              <textarea class="form-control" rows="2"
                v-model="message" placeholder="有什麼想告訴賣家的嗎？"></textarea>
            </div>
          </section>
          <section class="card">
            <div class="card-header px-sm-3 px-2 d-flex align-items-center justify-content-between">
              <h3 class="card-title h5 mb-0 font-weight-bold">送貨資料</h3>
              <span class="u-fz-sm">運費：NT$0</span>
            </div>
            <div class="card-body px-sm-3 px-2">
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="same" v-model="same">
                <label class="custom-control-label" for="same">收件人資料與顧客資料相同</label>
              </div>
              <ValidationProvider class="form-group"
                name="收件人姓名" v-slot="{ errors, classes }" rules="required" tag="div">
                <label for="addressee">收件人姓名*</label>
                <input type="text" class="form-control" id="addressee"
                  :class="classes" v-model="user.name">
                <span class="invalid-feedback">{{ errors[0] }}</span>
                <span class="u-fz-sm text-muted">請填入收件人真實姓名，以確保順利收件</span>
              </ValidationProvider>
              <ValidationProvider class="form-group"
                name="收件人手機號碼" v-slot="{ errors, classes }" rules="required|numeric" tag="div">
                <label for="addressee-tel">收件人手機號碼*</label>
                <input type="tel" class="form-control" id="addressee-tel"
                  minlength="10" maxlength="10"
                  :class="classes" v-model="user.tel">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
              <label for="county">收件人地址*</label>
              <div class="form-row mb-2">
                <ValidationProvider name="縣市" class="col"
                  v-slot="{ errors, classes }" rules="required">
                  <select id="county" v-model="info.county" class="custom-select" :class="classes"
                    @change="info.dist = ''">
                    <option value="" disabled>請選擇縣市</option>
                    <option :value="key"
                      v-for="(value, key, i) in countyData" :key="i">{{ key }}</option>
                  </select>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider name="鄉鎮市區" class="col"
                  v-slot="{ errors, classes }" rules="required">
                  <select v-model="info.dist" class="custom-select" :class="classes">
                    <option value="" disabled>請選擇鄉鎮市區</option>
                    <option :value="item"
                      v-for="item in countyData[info.county]" :key="item">{{ item }}</option>
                  </select>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <ValidationProvider class="form-group mb-0"
                name="地址" v-slot="{ errors, classes }" rules="required" tag="div">
                <input type="text" class="form-control"
                  :class="classes" v-model="info.road">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </section>
        </div>
        <div class="col-lg-4 col-md-5">
          <section class="card mb-3">
            <a href="#" class="card-header px-sm-3 px-2 d-flex align-items-center"
              :class="{ 'border-0': !isOpen }"
              @click.prevent="toggleCarts()">
              <h3 class="card-title h5 mb-0 font-weight-bold">
                購物車（{{ cartsData.carts.length }}件）
              </h3>
              <i class="fas fa-chevron-down p-rotate180 ml-auto"
                :class="{ 'active': isOpen }"></i>
            </a>
            <div class="js-cart" style="display:none">
              <div v-for="(item, key) in cartsData.carts" :key="item.id"
                class="px-sm-3 px-2 py-2 border-bottom u-border-sm border-secondary"
                :class="{ 'border-0': key + 1 === cartsData.carts.length }">
                <div class="d-flex mb-2">
                  <div class="p-cart__img"
                    :style="{ 'background-image': `url(${item.product.imageUrl})` }"></div>
                  <div class="d-flex flex-column flex-grow-1">
                    <h5 class="h6">{{ item.product.title }}</h5>
                    <div class="d-flex flex-column mt-auto text-right">
                      <span class="mt-auto">NT{{ item.product.price | currency }}</span>
                      <del class="u-fz-sm text-muted"
                        v-if="item.product.price !== item.product.origin_price">
                        NT{{ item.product.origin_price | currency }}
                      </del>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <span>數量：{{ item.qty }}</span>
                  <span>NT{{ item.total | currency }}</span>
                </div>
              </div>
            </div>
          </section>
          <section class="card">
            <div class="card-header px-sm-3 px-2 d-flex align-items-center">
              <h3 class="card-title h5 mb-0 font-weight-bold">
                訂單資訊
              </h3>
              <i class="fas fa-spinner fa-spin ml-2"
                v-if="status.couponLoading"></i>
            </div>
            <div class="px-sm-3 px-2 py-2 border-bottom u-border-sm border-secondary">
              <div class="d-flex justify-content-between mb-2">
                <span>小計：</span>
                <span>NT{{ cartsData.total | currency }}</span>
              </div>
              <div class="d-none justify-content-between mb-2 text-success"
                :class="{ 'd-flex': cartsData.final_total !== cartsData.total }">
                <span>折扣：</span>
                <span>
                  - NT{{  cartsData.total - Math.round(cartsData.final_total) | currency }}
                </span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>運費：</span>
                <span>NT$0</span>
              </div>
              <label for="coupon" class="js-coupon-message">優惠碼</label>
              <div class="d-flex mb-1">
                <input type="text" id="coupon" class="form-control" v-model="coupon.code">
                <button type="button"
                  class="btn btn-sm btn-secondary flex-shrink-0 ml-2 px-4"
                  :class="{ 'disabled': status.couponLoading }"
                  @click="addCode()">套用
                </button>
              </div>
              <div class="u-fz-sm py-2 text-dark">
                輸入
                <a href="#" class="bg-secondary p-1" title="點擊複製"
                @click.prevent="copyText($event)">izzy2021</a>
                即可享有 88 折優惠
              </div>
              <span class="u-fz-sm js-coupon-message">{{ coupon.message }}</span>
              <b class="d-flex justify-content-between mt-2 mb-3"
                :class="{ 'text-success': cartsData.final_total !== cartsData.total }">
                <span>合計：</span>
                <span>NT{{ Math.round(cartsData.final_total) | currency }}</span>
              </b>
              <div class="d-flex">
                <router-link to="/checkout"
                  class="btn btn-outline-info btn-block mr-2 text-dark">返回購物車</router-link>
                <button type="submit" class="btn btn-info btn-block mt-0"
                  :class="{ 'disabled': status.orderLoading }">
                  提交訂單
                  <i class="fas fa-spinner fa-spin ml-1"
                    v-if="status.orderLoading"></i>
                </button>
              </div>
            </div>
          </section>
        </div>
      </form>
    </ValidationObserver>
  </main>
</template>
<script>
import $ from 'jquery';

import countyJson from '@/assets/JSON/county.json';

export default {
  name: 'CheckoutInfo',
  data() {
    return {
      isOpen: false,
      same: false,
      coupon: {
        message: '',
        code: '',
      },
      status: {
        couponLoading: false,
        orderLoading: false,
      },
      cartsData: {},
      countyData: countyJson,
      user: {
        name: '',
        tel: '',
        address: '',
      },
      message: '',
      info: {
        county: '',
        dist: '',
        road: '',
      },
    };
  },
  methods: {
    getCarts() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;

      vm.$store.commit('ISLOADING', true);
      vm.$http.get(api).then((response) => {
        vm.$store.commit('ISLOADING', false);
        vm.cartsData = response.data.data;
      });
    },
    addCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`;

      vm.status.couponLoading = true;
      vm.$http.post(api, { data: { code: vm.coupon.code } })
        .then((response) => {
          vm.status.couponLoading = false;
          vm.coupon.message = response.data.message;
          vm.getCarts();
          if (response.data.success) {
            $('.js-coupon-message').removeClass('text-danger').addClass('text-success');
            $('#coupon').removeClass('is-invalid').addClass('is-valid');
          } else {
            $('.js-coupon-message').removeClass('text-success').addClass('text-danger');
            $('#coupon').removeClass('is-valid').addClass('is-invalid');
          }
        });
    },
    clearCarts() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/cart/`;
      const reqList = [];

      vm.cartsData.carts.forEach((el) => {
        const req = vm.$http.delete(api + el.id);
        reqList.push(req);
      });
      vm.$http.all(reqList);
    },
    toggleCarts() {
      $('.js-cart').slideToggle();
      this.isOpen = !this.isOpen;
    },
    goOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/order`;
      const data = {
        data: {
          user: vm.user,
          message: vm.message,
        },
      };

      vm.status.orderLoading = true;
      vm.$http.post(api, data).then((response) => {
        vm.status.orderLoading = false;
        if (response.data.success) {
          localStorage.removeItem('carts');
          vm.$store.commit('cartModules/GETCARTS');
          vm.$router.push(`/checkout/order/${response.data.orderId}`);
        } else {
          vm.$router.push('/checkout');
          vm.$store.dispatch('alertModules/updateMessage', response.data);
        }
      });
    },
    copyText(text) {
      this.$store.dispatch('copyText', text);
    },
  },
  watch: {
    same() {
      if (this.same) {
        this.user.name = this.info.name;
        this.user.tel = this.info.tel;
      }
    },
    info: {
      handler() {
        if (this.same) {
          this.user.name = this.info.name;
          this.user.tel = this.info.tel;
        }
        this.user.address = this.info.county + this.info.dist + this.info.road;
      },
      deep: true,
    },
  },
  created() {
    this.getCarts();
  },
  mounted() {
    const vm = this;
    $('.p-checkout__item').eq(0).addClass('active');
    vm.$router.beforeEach((to, from, next) => {
      if (from.name === vm.$route.name) {
        $('.p-checkout__item').eq(0).removeClass('active');
        vm.clearCarts();
        next();
      } else {
        next();
      }
    });
  },
};
</script>
