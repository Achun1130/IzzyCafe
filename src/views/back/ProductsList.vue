<template>
  <div class="px-3">
    <div class="text-right my-3">
      <button type="button" class="btn btn-sm btn-primary"
        @click="showProductModal(true)">建立新的產品</button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" class="d-sm-table-cell d-none">分類</th>
          <th scope="col" class="text-nowrap">產品名稱</th>
          <th scope="col" width="120" class="d-sm-table-cell d-none">原價</th>
          <th scope="col" width="120">售價</th>
          <th scope="col" width="120" class="d-sm-table-cell d-none">是否啟用</th>
          <th scope="col" width="50"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.products" :key="item.id" @click="showProductModal(false, item)">
          <td class="d-sm-table-cell d-none">{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right d-sm-table-cell d-none">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td class="d-sm-table-cell d-none">
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-danger" v-if="!item.is_enabled">未啟用</span>
          </td>
          <td class="p-0">
            <a href="#" @click.stop.prevent="delProductModal(item)"
              class="d-block text-danger p-3">
              <i class="fas fa-lg fa-minus-circle"></i>
              <span class="sr-only">刪除</span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="productModalLabel">
              <span>{{ isNew ? '新增產品' : '修改產品' }}</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <ValidationObserver v-slot="{ handleSubmit, reset }">
            <form id="productForm"
              @submit.prevent="handleSubmit(editProduct)"
              @reset.prevent="reset">
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-4">
                    <ValidationProvider tag="div" class="form-group" name="圖片網址" rules="required"
                      v-slot="{ errors, classes }">
                      <label for="image">輸入圖片網址</label>
                      <input type="text" class="form-control" id="image"
                        placeholder="請輸入圖片連結" v-model="newProduct.imageUrl"
                        :class="classes">
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <div class="form-group">
                      <label for="customFile">或 上傳圖片
                        <i class="fas fa-spinner fa-spin" v-if="status.imgLoading"></i>
                      </label>
                      <input type="file" id="customFile" class="form-control"
                        ref="files"
                        @change="uploadImg()">
                    </div>
                    <img :src="newProduct.imageUrl" v-if="newProduct.imageUrl"
                      class="img-fluid" :alt="newProduct.title">
                  </div>
                  <div class="col-sm-8">
                    <ValidationProvider tag="div" class="form-group" name="標題" rules="required"
                      v-slot="{ errors, classes }">
                      <label for="title">標題</label>
                      <input type="text" class="form-control" id="title"
                        placeholder="請輸入標題"
                        v-model="newProduct.title"
                        :class="classes">
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <div class="form-row">
                      <ValidationProvider tag="div" class="form-group col-md-6"
                        name="分類" rules="required"
                        v-slot="{ errors, classes }">
                        <label for="category">分類</label>
                        <input type="text" class="form-control" id="category"
                          placeholder="請輸入分類"
                          v-model="newProduct.category"
                          :class="classes">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </ValidationProvider>
                      <ValidationProvider tag="div" class="form-group col-md-6"
                        name="單位" rules="required"
                        v-slot="{ errors, classes }">
                        <label for="price">單位</label>
                        <input type="unit" class="form-control" id="unit"
                          placeholder="請輸入單位"
                          v-model="newProduct.unit"
                          :class="classes">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div class="form-row">
                      <ValidationProvider tag="div" class="form-group col-md-6" name="原價"
                        rules="required|numeric" v-slot="{ errors, classes }">
                      <label for="origin_price">原價</label>
                        <input type="number" class="form-control" id="origin_price"
                          placeholder="請輸入原價"
                          v-model="newProduct.origin_price"
                          :class="classes">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </ValidationProvider>
                      <ValidationProvider tag="div" class="form-group col-md-6" name="售價"
                        rules="required|numeric" v-slot="{ errors, classes }">
                        <label for="price">售價</label>
                        <input type="number" class="form-control" id="price"
                          placeholder="請輸入售價"
                          v-model="newProduct.price"
                          :class="classes">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <hr>

                    <ValidationProvider tag="div" class="form-group" name="產品描述"
                      rules="required" v-slot="{ errors, classes }">
                      <label for="description">產品描述</label>
                      <textarea type="text" class="form-control" id="description"
                        placeholder="請輸入產品描述"
                        v-model="newProduct.description"
                        :class="classes"></textarea>
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider tag="div"  class="form-group" name="說明內容"
                      rules="required" v-slot="{ errors, classes }">
                      <label for="content">說明內容</label>
                      <textarea type="text" class="form-control" id="content"
                        placeholder="請輸入產品說明內容"
                        v-model="newProduct.content"
                        :class="classes"></textarea>
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <div class="form-group">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                          id="is_enabled"
                          v-model="newProduct.is_enabled">
                        <label class="form-check-label" for="is_enabled">
                          是否啟用
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary"
                  data-dismiss="modal">取消</button>
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
    <DelModal :data="delProduct" type="product" @delData="getProducts"/>
    <Pagination :pagination="data.pagination" @changePage="getProducts"/>
  </div>
</template>
<script>
import $ from 'jquery';

import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'ProductsList',
  data() {
    return {
      data: {},
      newProduct: {},
      isNew: false,
      status: {
        imgLoading: false,
        confirmLoading: false,
      },
      delProduct: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/admin/products?page=${page}`;

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
    showProductModal(isNew, product) {
      if (isNew) {
        this.newProduct = {};
      } else {
        this.newProduct = { ...product };
      }
      this.isNew = isNew;
      $('#productModal').modal('show');
    },
    editProduct() {
      const vm = this;
      let api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`;
      let httpType = 'post';
      let currentPage = 1;

      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.newProduct.id}`;
        httpType = 'put';
        currentPage = vm.data.pagination.current_page;
      }
      vm.status.confirmLoading = true;
      vm.$http[httpType](api, { data: vm.newProduct })
        .then((response) => {
          vm.status.confirmLoading = false;
          $('#productModal').modal('hide');
          vm.getProducts(currentPage);
          if (!response.data.success) {
            vm.$store.dispatch('alertModules/updateMessage', response.data);
          }
        });
    },
    uploadImg() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`;
      const image = vm.$refs.files.files[0];
      const formData = new FormData();

      vm.status.imgLoading = true;
      formData.append('file-to-upload', image);
      vm.$http.post(api, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }).then((response) => {
        vm.status.imgLoading = false;
        if (response.data.success) {
          vm.$set(vm.newProduct, 'imageUrl', response.data.imageUrl);
        } else {
          vm.$store.dispatch('alertModules/updateMessage', response.data);
        }
      });
    },
    clearFile() {
      const file = document.querySelector('#customFile');
      file.value = '';
    },
    delProductModal(item) {
      this.delProduct = item;
      $('#delModal').modal('show');
    },
  },
  created() {
    this.getProducts();
  },
  mounted() {
    const vm = this;
    $('#productModal').on('hidden.bs.modal', () => {
      vm.clearFile();
      document.querySelector('#productForm').reset();
    });
  },
  components: {
    DelModal,
    Pagination,
  },
};
</script>
