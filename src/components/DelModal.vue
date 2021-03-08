<template>
  <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
    aria-labelledby="delModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="delModalLabel">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ data.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger"
            :class="{ 'disabled': status.confirmLoading }"
            @click="delData()">
            <i class="fas fa-spinner fa-spin" v-if="status.confirmLoading"></i>
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';

export default {
  name: 'DelModel',
  props: {
    data: Object,
    type: String,
  },
  data() {
    return {
      status: {
        confirmLoading: false,
      },
    };
  },
  methods: {
    delData() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/admin/${vm.type}/${vm.data.id}`;

      vm.status.confirmLoading = true;
      vm.$http.delete(api).then((response) => {
        vm.status.confirmLoading = false;
        $('#delModal').modal('hide');
        if (response.data.success) {
          vm.$emit('delData');
        } else {
          this.$store.dispatch('alertModules/updateMessage', response.data);
        }
      });
    },
  },
};
</script>
