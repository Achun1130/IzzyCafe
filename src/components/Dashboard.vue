<template>
  <div class="container-fluid px-0">
    <div class="row no-gutters">
      <dashboard-sidebar></dashboard-sidebar>
      <main role="main" class="col-lg-10 ml-sm-auto px-lg-4">
      <nav class="d-lg-none">
        <ul class="row py-2 list-unstyled no-gutters text-center mb-n1">
          <li v-for="(item, key) in list" :key="key"
            class="col-4 py-2">
            <router-link :to="{ name: item.name }" class="d-block u-border-sm"
              :class="{ 'border-right': key + 1 !== list.length }">
              <span class="c-hover"
                :class="{ 'active': item.name === $route.name }">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>

import DashboardSidebar from '@/components/DashboardSidebar.vue';

export default {
  name: 'Dashboard',
  data() {
    return {
      list: [
        {
          name: '產品',
        },
        {
          name: '訂單',
        },
        {
          name: '優惠券',
        },
      ],
    };
  },
  created() {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)Hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
  components: {
    DashboardSidebar,
  },
};
</script>
