<template>
  <main>
    <div class="row justify-content-center mt-sm-4 mt-3 u-fadeIn" v-if="order.total">
      <div class="col-lg-8 mb-3">
        <section class="card mb-3">
          <a href="#" class="card-header px-sm-3 px-2 d-flex align-items-center"
            :class="{ 'border-0': !isOpen }"
            style="cursor: pointer"
            @click.prevent="toggleCarts()">
            <h3 class="card-title h5 mb-0">購物車明細</h3>
            <i class="fas fa-chevron-down p-rotate180 ml-auto"
              :class="{ 'active': isOpen }"></i>
          </a>
          <div class="js-cart u-fz-sm" style="display: none">
            <div class="p-checkout__grid py-2 d-none d-sm-grid u-fz-sm">
              <div class="p-checkout__grid__title">商品資料</div>
              <div class="p-checkout__grid__price">單件價格</div>
              <div class="p-checkout__grid__qty text-center">數量</div>
              <div class="p-checkout__grid__total text-center">小計</div>
            </div>
            <div class="p-checkout__grid py-2" v-for="(value, key) in order.products" :key="key">
              <div class="p-checkout__grid__title">
                <div class="p-cart__img"
                  :style="{ 'background-image': 'url(' + value.product.imageUrl +')' }"></div>
                <h5 class="h6">{{ value.product.title }}</h5>
              </div>
              <div class="p-checkout__grid__price">
                <span>NT{{ value.product.price | currency }}</span>
                <br>
                <del class="u-fz-sm text-muted"
                  v-if="value.product.price !== value.product.origin_price">
                  NT{{ value.product.origin_price | currency }}
                </del>
              </div>
              <div class="p-checkout__grid__qty text-sm-center">
                <span class="d-sm-none">數量：</span>{{ value.qty }}
              </div>
              <div class="p-checkout__grid__total">
                NT{{ value.total | currency }}
              </div>
            </div>
            <div class="p-checkout__grid py-1 border-0">
              <div class="p-checkout__grid__qty text-sm-center">
                小計
              </div>
              <div class="p-checkout__grid__total">
                NT{{ cartTotal | currency }}
              </div>
            </div>
            <div class="p-checkout__grid text-success py-1 border-0"
              :class="{ 'd-none': cartTotal === order.total }">
              <div class="p-checkout__grid__qty text-sm-center">
                折扣
              </div>
              <div class="p-checkout__grid__total">
                -NT{{ cartTotal - Math.round(order.total) | currency }}
              </div>
            </div>
            <div class="p-checkout__grid py-1">
              <div class="p-checkout__grid__qty text-sm-center">
                運費
              </div>
              <div class="p-checkout__grid__total">
                NT$0
              </div>
            </div>
            <div class="p-checkout__grid py-2 border-0"
              :class="{ 'text-success': cartTotal !== order.total }">
              <b class="p-checkout__grid__qty text-sm-center">
                總計
              </b>
              <b class="p-checkout__grid__total">
                NT{{ Math.round(order.total) | currency }}
              </b>
            </div>
          </div>
        </section>
        <section class="card">
          <div class="card-header px-sm-3 px-2">
            <h3 class="card-title h5 mb-0">訂單資訊</h3>
          </div>
          <table class="table table-borderless mb-0">
            <tbody>
              <tr>
                <th scope="row" class=" px-sm-3 px-2" width="150">成立時間</th>
                <td>{{ order.create_at | timestamp }}</td>
              </tr>
              <tr>
                <th scope="row" class=" px-sm-3 px-2">收件人姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th scope="row" class=" px-sm-3 px-2">收件人手機號碼</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th scope="row" class=" px-sm-3 px-2">收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr v-if="order.message">
                <th scope="row" class="px-sm-3 px-2">備註</th>
                <td>{{ order.message }}</td>
              </tr>
              <tr>
                <th scope="row" class=" px-sm-3 px-2">付款狀態</th>
                <td>
                  <span class="text-success" v-if="order.is_paid">已付款</span>
                  <span class="text-danger" v-if="!order.is_paid">尚未付款</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex px-sm-3 px-2 pt-2 pb-3">
            <router-link class="btn btn-outline-info btn-block text-dark" to="/products">
              繼續購物
            </router-link>
            <button class="btn btn-info btn-block mt-0 ml-3" type="button"
              v-if="!order.is_paid"
              :class="{ 'disabled': status.payLoading }"
              @click="goPay()">確認付款去
              <i class="fas fa-spinner fa-spin ml-1"
                v-if="status.payLoading"></i>
            </button>
          </div>
        </section>
        <div class="modal fade" id="payModal" tabindex="-1"
          aria-labelledby="payModalLabel" aria-hidden="true"
          data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body text-center">
                <div class="success-animation">
                  <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                </div>
                <h5 class="h3 font-weight-bold">付款成功！</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import $ from 'jquery';

export default {
  name: 'CheckoutOrder',
  data() {
    return {
      isOpen: false,
      status: {
        payLoading: false,
      },
      order: {},
    };
  },
  watch: {
    '$route.params': {
      handler() {
        this.getOrder(this.$route.params.id);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getOrder(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/order/${id}`;

      vm.$store.commit('ISLOADING', true);
      vm.$http.get(api).then((response) => {
        vm.$store.commit('ISLOADING', false);
        if (response.data.success && response.data.order) {
          vm.order = response.data.order;
        } else {
          vm.$router.push('/products');
          vm.$store.dispatch('alertModules/updateMessage', { message: '找不到訂單' });
        }
      });
    },
    toggleCarts() {
      $('.js-cart').slideToggle();
      this.isOpen = !this.isOpen;
    },
    goPay() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/pay/${vm.order.id}`;

      vm.status.payLoading = true;
      vm.$http.post(api).then((response) => {
        vm.status.payLoading = false;
        if (response.data.success) {
          $('#payModal').modal('show');
          setTimeout(() => {
            $('#payModal').modal('hide');
            vm.$router.push('/products');
          }, 5000);
        } else {
          vm.$store.dispatch('alertModules/updateMessage', response.data);
        }
      });
    },
  },
  computed: {
    cartTotal() {
      let total = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.order.products) {
        if (key) {
          total += this.order.products[key].total;
        }
      }
      return total;
    },
  },
  mounted() {
    const vm = this;
    $('.p-checkout__item').eq(0).addClass('active');
    $('.p-checkout__item').eq(1).addClass('active');
    vm.$router.beforeEach((to, from, next) => {
      if (from.name === vm.$route.name) {
        $('.p-checkout__item').eq(0).removeClass('active');
        $('.p-checkout__item').eq(1).removeClass('active');
        next();
      } else {
        next();
      }
    });
  },
};
</script>
