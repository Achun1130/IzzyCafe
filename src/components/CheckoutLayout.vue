<template>
  <div class="container pt-4 overflow-hidden">
    <Breadcrumb :title="[$route.name]"/>
    <div class="row justify-content-md-center mb-3">
      <div class="col-md-10">
        <div class="p-checkout">
          <div class="p-checkout__item">
            <div class="p-checkout__step">1</div>
            <span>購物車</span>
          </div>
          <div class="p-checkout__item">
            <div class="p-checkout__step">2</div>
            <span>填寫資料</span>
          </div>
          <div class="p-checkout__item">
            <div class="p-checkout__step">3</div>
            <span>訂單確認</span>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Breadcrumb from './Breadcrumb.vue';

export default {
  name: 'Checkout',
  components: {
    Breadcrumb,
  },
};
</script>
