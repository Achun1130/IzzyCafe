<template>
  <div class="px-3">
    <table class="table table-hover mt-4">
      <thead>
        <tr>
          <th scope="col">購買時間</th>
          <th scope="col">Email</th>
          <th scope="col" class="d-sm-table-cell d-none">購買款項</th>
          <th scope="col">應付金額</th>
          <th scope="col" width="90">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.orders" :key="item.id" @click="showOrderModal(item)">
          <td>{{ item.create_at | timestamp }}</td>
          <td class="text-truncate u-mw-100px">{{ item.user.email }}</td>
          <td class="d-sm-table-cell d-none">
            <div v-for="el in item.products" :key="el.id">
              {{ el.product.title }} 數量： {{ el.qty }} {{ el.product.unit }}
            </div>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span class="text-danger" v-if="!item.is_paid">尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="orderModal" tabindex="-1"
      aria-labelledby="orderModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="orderModalLabel">修改訂單</h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <ValidationObserver v-slot="{ invalid, reset }">
            <form id="orderForm"
              @submit.prevent="editOrder()"
              @reset.prevent="reset">
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label" for="create_at">購買時間</label>
                        <div class="col-sm-8">
                          <span class="form-control" style="background-color: #e9ecef">
                            {{ newOrder.create_at | timestamp }}
                          </span>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label" for="name">姓名</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="name" aria-describedby="name"
                            v-model="newOrder.user.name" readonly>
                        </div>
                      </div>
                      <ValidationProvider tag="div" class="form-group row"
                        rules="required|email" name="Email"
                        v-slot="{ errors, classes }">
                        <label class="col-sm-4 col-form-label" for="email">Email</label>
                        <div class="col-sm-8">
                          <input type="email" class="form-control" id="email"
                            aria-describedby="email"
                            v-model="newOrder.user.email"
                            :class="classes">
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider tag="div" class="form-group row" name="電話"
                        rules="required|min:9|max:10|numeric"
                        v-slot="{ errors, classes }">
                        <label class="col-sm-4 col-form-label" for="tel">電話</label>
                        <div class="col-sm-8">
                          <input type="tel" class="form-control" id="tel" aria-describedby="tel"
                            v-model="newOrder.user.tel"
                            :class="classes"
                            maxlength="10">
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider tag="div" class="form-group row"
                      rules="required" name="地址"
                        v-slot="{ errors, classes }">
                        <label class="col-sm-4 col-form-label" for="address">地址</label>
                        <div class="col-sm-8">
                          <input type="address" class="form-control" id="address"
                            aria-describedby="address"
                            v-model="newOrder.user.address"
                            :class="classes">
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label" for="message">留言</label>
                        <div class="col-sm-8">
                          <textarea class="form-control" id="message"
                            v-model="newOrder.message" readonly></textarea>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label" for="payment_method">付款方式</label>
                        <div class="col-sm-8">
                          <select class="form-control" id="payment_method"
                            v-model="newOrder.payment_method">
                            <option value="credit_card">信用卡 ( 支援 Visa, Master, JCB )</option>
                            <option value="code_physical">超商代碼 ( 需持代碼至超商印出帳單繳費 )</option>
                            <option value="code_virtual">ATM 虛擬代碼繳費 ( 需持代碼至實體 ATM 或網路銀行繳費 )</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <hr class="d-lg-none">
                      <h5 class="font-weight-bolder">購買款項</h5>
                      <div class="form-group row" v-for="item in newOrder.products" :key="item.id">
                        <label :for="item.id" class="col-sm-8 col-form-label">
                          {{ item.product.title }}
                        </label>
                        <div class="col-sm-4">
                          <input type="number" :id="item.id" class="form-control"
                            v-model="item.qty" readonly>
                        </div>
                      </div>
                      <h4 class="text-right mt-5"
                        :class="{ 'text-danger': !newOrder.is_paid,
                          'text-success': newOrder.is_paid }">
                        應付金額 ： {{ newOrder.total | currency }}
                        </h4>
                      <div class="form-group form-check text-right">
                        <input type="checkbox" class="form-check-input" id="is_paid"
                          v-model="newOrder.is_paid">
                        <label class="form-check-label text-success" for="is_paid"
                          v-if="newOrder.is_paid">已付款</label>
                        <label class="form-check-label text-danger" for="is_paid"
                          v-if="!newOrder.is_paid">尚未付款</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-primary" :disabled="invalid"
                  :class="{ 'disabled': status.confirmLoading }">
                  <i class="fas fa-spinner fa-spin" v-if="status.confirmLoading"></i>
                  確認
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <Pagination :pagination="data.pagination" @changePage="getOrders"/>
  </div>
</template>
<script>
import $ from 'jquery';

import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Order',
  data() {
    return {
      status: {
        confirmLoading: false,
      },
      data: {},
      newOrder: {
        user: {},
        products: [],
      },
    };
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=${page}`;

      vm.$store.commit('ISLOADING', true);
      vm.$http.get(api).then((response) => {
        vm.$store.commit('ISLOADING', false);
        if (response.data.success) {
          vm.data = response.data;
        } else {
          vm.$router.push('/signin');
          vm.$store.dispatch('alertModules/updateMessage', response.data);
        }
      });
    },
    showOrderModal(item) {
      this.newOrder = $.extend(true, {}, item);
      $('#orderModal').modal('show');
    },
    editOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/admin/order/${vm.newOrder.id}`;

      vm.status.confirmLoading = true;
      vm.$http.put(api, { data: vm.order }).then((response) => {
        vm.status.confirmLoading = false;
        $('#orderModal').modal('hide');
        vm.getOrders(vm.data.pagination.current_page);
        if (!response.data.success) {
          vm.$store.dispatch('alertModules/updateMessage', response.data);
        }
      });
    },
  },
  created() {
    this.getOrders();
  },
  mounted() {
    $('#orderModal').on('hidden.bs.modal', () => {
      document.querySelector('#orderForm').reset();
    });
  },
  components: {
    Pagination,
  },
};
</script>
