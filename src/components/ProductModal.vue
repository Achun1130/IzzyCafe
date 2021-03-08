<template>
  <div class="modal fade" id="productModal" tabindex="-1"
    aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-bottom-0 py-md-1 py-2">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body pt-0">
          <div class="row">
            <div class="col-md-6">
              <div class="w-100 u-bg-cover mb-3 h-md-100"
                style="height: 150px"
                :style="{ 'background-image': 'url(' + product.imageUrl + ')' }"></div>
            </div>
            <div class="col-md-6">
              <h5 class="h4 font-weight-bold">{{ product.title }}</h5>
              <p>
                <span v-if="product.category[0] === '精選豆單'">風味筆記：</span>
                <br>{{ product.description }}
              </p>
              <b class="h4 text-danger mr-2 font-weight-bold">
                NT{{ product.price | currency }}
              </b>
              <del class="text-muted" v-if="product.origin_price !== product.price">
                NT{{ product.origin_price | currency }}
              </del>
              <div>
                <span class="badge badge-pill badge-info mt-3"
                  v-for="(item, key) in product.category" :key="key"
                  :class="{ 'ml-2': key !== 0 }">
                  <i class="fas fa-tag mr-1"></i>{{ item }}
                </span>
              </div>
            </div>
            <div class="w-100"></div>
            <hr class="w-100 mt-4">
          </div>
          <validation-observer v-slot="{ handleSubmit }">
            <form class="row"
            @submit.prevent="handleSubmit(addCart)">
              <div class="col-auto">
                <label for="qty" class="mt-2">數量</label>
              </div>
              <div class="col col-sm-4">
                <qty-button :data="data" @getQty="getQty"
                  :qtyClass="['pr-sm-1', 'input-group-sm']"></qty-button>
              </div>
              <div class="col-12 col-sm-auto ml-sm-auto mt-3 mt-sm-0">
                <button type="submit" class="btn btn-info btn-block">
                  <i class="fas fa-shopping-cart mr-1"></i>
                  加入購物車
                </button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

import QtyButton from './QtyButton.vue';

export default {
  name: 'ProductModal',
  data() {
    return {
      data: {
        qty: 1,
      },
    };
  },
  methods: {
    addCart() {
      this.$store.dispatch('cartModules/addCart', {
        qty: this.data.qty,
        cartProduct: this.product,
      });
      $('#productModal').modal('hide');
      this.$store.dispatch('alertModules/updateMessage', {
        message: '加入購物車',
        status: 'success',
      });
      this.$store.commit('cartModules/TOGGLECART');
    },
    getQty(qty) {
      this.data.qty = qty;
    },
  },
  computed: {
    ...mapGetters('productModules', ['product']),
  },
  mounted() {
    const vm = this;
    $('#productModal').on('hidden.bs.modal', () => {
      vm.data.qty = 1;
    });
  },
  components: {
    QtyButton,
  },
};
</script>
