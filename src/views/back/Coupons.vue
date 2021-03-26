<template>
  <div class="px-3">
    <div class="text-right my-3">
      <button type="button" class="btn btn-sm btn-primary"
        @click="showCouponModal(true)">建立新的優惠券</button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col" width="150">折扣百分比</th>
          <th scope="col" width="150">到期日</th>
          <th scope="col" width="150" class="d-none d-sm-table-cell">是否啟用</th>
          <th scope="col" width="50"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.coupons" :key="item.id" @click="showCouponModal(false, item)">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }} %</td>
          <td>{{ item.due_date }}</td>
          <td class="d-none d-sm-table-cell">
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-danger" v-if="!item.is_enabled">未啟用</span>
          </td>
          <td class="p-0">
            <a href="#" @click.stop.prevent="delCouponModal(item)"
              class="d-block text-danger p-3">
              <i class="fas fa-lg fa-minus-circle"></i>
              <span class="sr-only">刪除</span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1"
      aria-labelledby="couponModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="couponModalLabel">
              {{ isNew ? '新增優惠券' : '修改優惠券' }}
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <ValidationObserver v-slot="{ handleSubmit, reset }">
            <form id="couponForm"
              @submit.prevent="handleSubmit(editCoupon)"
              @reset.prevent="reset">
              <div class="modal-body">
                <ValidationProvider tag="div" class="form-group" name="標題" rules="required"
                  v-slot="{ errors, classes }">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    :class="classes" v-model="newCoupon.title">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider tag="div" class="form-group" name="優惠碼" rules="required"
                  v-slot="{ errors, classes }">
                  <label for="code">優惠碼</label>
                  <input type="text" class="form-control" id="code"
                    :class="classes" v-model="newCoupon.code">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider tag="div" class="form-group" name="到期日" rules="required"
                  v-slot="{ errors, classes }">
                  <label for="due_date">到期日</label>
                  <input type="date" class="form-control" id="due_date"
                    :class="classes" v-model="newCoupon.due_date">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider tag="div" class="form-group" name="折扣百分比"
                  rules="required|min:0|max:100"
                  v-slot="{ errors, classes }">
                  <label for="percent">折扣百分比</label>
                  <input type="number" class="form-control" id="percent" min="0" max="100"
                    :class="classes" v-model="newCoupon.percent">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
                <div class="form-group form-check">
                  <input type="checkbox" class="form-check-input" id="is_enabled"
                    v-model="newCoupon.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-primary"
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
    <DelModal :data="delCoupon" type="coupon" @delData="getCoupons"/>
    <Pagination :pagination="data.pagination" @changePage="getCoupons"/>
  </div>
</template>
<script>
import $ from 'jquery';

import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Coupons',
  data() {
    return {
      isNew: false,
      status: {
        confirmLoading: false,
      },
      data: {},
      newCoupon: {},
      delCoupon: {},
    };
  },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons?page=:${page}`;

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
    showCouponModal(isNew, coupon) {
      if (isNew) {
        this.newCoupon = {};
      } else {
        this.newCoupon = { ...coupon };
      }
      this.isNew = isNew;
      $('#couponModal').modal('show');
    },
    editCoupon() {
      const vm = this;
      let api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`;
      let httpType = 'post';
      let currentPage = 1;

      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.newCoupon.id}`;
        httpType = 'put';
        currentPage = vm.data.pagination.current_page;
      }

      vm.status.confirmLoading = true;
      vm.$http[httpType](api, { data: vm.newCoupon }).then((response) => {
        vm.status.confirmLoading = false;
        $('#couponModal').modal('hide');
        vm.getCoupons(currentPage);
        if (!response.data.success) {
          vm.$store.dispatch('alertModules/updateMessage', response.data);
        }
      });
    },
    delCouponModal(item) {
      this.delCoupon = item;
      $('#delModal').modal('show');
    },
  },
  created() {
    this.getCoupons();
  },
  mounted() {
    $('#couponModal').on('hidden.bs.modal', () => {
      document.querySelector('#couponForm').reset();
    });
  },
  components: {
    DelModal,
    Pagination,
  },
};
</script>
