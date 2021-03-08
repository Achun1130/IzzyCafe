<template>
  <div class="p-cart" :class="{ 'active': isShow }" @click.self="TOGGLECART()">
    <section class="p-cart__body">
      <h3 class="p-cart__title">購物車</h3>
      <div class="p-cart__item" v-for="item in carts" :key="item.id">
        <a class="p-cart__img" href="#"
          :style="{ 'background-image': 'url(' + item.imageUrl + ')' }"
          @click.prevent="pushId(item.id)"></a>
        <div class="flex-grow-1">
          <a href="#"
            class="d-block text-white u-underline"
            @click.prevent="pushId(item.id)">{{ item.title }}</a>
          <span>{{ item.qty }} x NT{{ item.price | currency }}</span>
        </div>
        <a href="#" class="p-cart__btn"
          @click.prevent="removeCart(item.id)">
          <i class="far fa-trash-alt"></i>
        </a>
      </div>
      <div v-if="!carts.length" class="px-2 py-4">你的購物車是空的</div>
      <a href="#" class="btn btn-block btn-sm btn-outline-info mx-2 my-3 w-auto"
        v-if="carts.length !== 0" @click.prevent="goCheckout()">訂單結帳</a>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'SidebarCart',
  methods: {
    removeCart(id) {
      this.$store.dispatch('cartModules/removeCart', id);
    },
    goCheckout() {
      this.HIDECART();
      this.$router.push('/checkout');
    },
    pushId(id) {
      this.$router.push(`/products/${id}`);
      this.TOGGLECART();
    },
    ...mapMutations('cartModules', ['TOGGLECART', 'HIDECART', 'GETCARTS']),
  },
  computed: {
    ...mapGetters('cartModules', ['isShow', 'carts']),
  },
  created() {
    this.GETCARTS();
  },
};
</script>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
