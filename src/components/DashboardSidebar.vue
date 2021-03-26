<template>
  <nav class="col-lg-2 d-lg-block sidebar collapse">
    <h6 class="d-flex justify-content-between align-items-center px-3 mt-4 mb-3">
      <span>後台管理</span>
    </h6>
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/products_list">
          <i class="fas fa-fw fa-shopping-bag mr-2"></i>
          <span>產品</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/orders">
          <i class="fas fa-fw fa-file mr-2"></i>
          <span>訂單</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/coupons">
          <i class="fas fa-fw fa-ticket-alt mr-2"></i>
          <span>優惠券</span>
        </router-link>
      </li>
    </ul>
    <div class="text-right p-3">
      <button type="button" class="btn btn-sm btn-outline-primary" @click="signout()">登出</button>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'DashboardSidebar',
  methods: {
    signout() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}logout`;

      vm.$http.post(api).then((response) => {
        vm.$router.push('/signin');
        this.$store.dispatch('alertModules/updateMessage', {
          message: response.data.message,
          status: 'success',
        });
      });
    },
  },
};
</script>
<style lang="scss">
  .sidebar {
    box-shadow: 1px 0 5px rgba(0, 0, 0, .1);
    position: fixed;
    top: 63px;
    bottom: 0;
    background-color: #f8f9fa;
    font-size: .95rem;
  }
</style>
