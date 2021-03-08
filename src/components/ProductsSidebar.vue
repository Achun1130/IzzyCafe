<template>
  <section class="list-group list-group-flush">
    <h3 class="list-group-item h4 mb-0 font-weight-bold text-white bg-primary">商品介紹</h3>
    <router-link to="/products" class="list-group-item list-group-item-action">
      <i class="fas fa-fw fa-box-open mr-2"></i>
      所有商品
    </router-link>
    <router-link :to="{ name: item }" class="list-group-item list-group-item-action"
      v-for="(item, key) in categories" :key="key">
      <i class="fas fa-fw fa-mug-hot mr-2" v-if="item === '精選豆單'"></i>
      <i class="fas fa-fw fa-cookie mr-2" v-if="item === '甜點品項'"></i>
      <i class="fas fa-fw fa-gift mr-2" v-if="item === '禮盒專區'"></i>
      {{ item }}
    </router-link>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProductsSidebar',
  computed: {
    ...mapGetters('productModules', ['categories']),
  },
};
</script>
