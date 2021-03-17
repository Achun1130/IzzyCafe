<template>
  <section class="container">
    <div class="row">
      <div class="col-lg-4">
        <div class="d-flex flex-column
          justify-content-center align-items-lg-end
          text-lg-right text-center pr-lg-5 h-100">
          <h3 class="p-home__square p-home__square--reverse
            h2-md font-weight-bold mb-md-4">最新上架</h3>
          <p class="u-fz-sm h6-md mb-0">《 享受每種食物單純的快樂 》</p>
        </div>
      </div>
      <div class="col-lg-8">
        <swiper class="swiper h-100 graphic py-4" :options="swiperOption">
          <swiper-slide v-for="item in filterProducts" :key="item.id">
            <ProductCard :product="item" :isAnimate="true"></ProductCard>
          </swiper-slide>
          <swiper-slide class="d-flex align-items-center justify-content-center">
            <router-link :to="{ name: '所有商品', params: { sort: 'toNew' } }"
              class="px-4 py-3 h5 rounded-pill bg-info text-dark
              animate__pulse animate__animated animate__infinite">點擊看更多
              <i class="fas fa-caret-right ml-1"></i>
            </router-link>
          </swiper-slide>
          <div class="swiper-button-prev text-dark
            bg-white shadow-sm" slot="button-prev"></div>
          <div class="swiper-button-next text-dark
            bg-white shadow-sm" slot="button-next"></div>
        </swiper>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';

import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'SwiperProduct',
  data() {
    return {
      swiperOption: {
        freeMode: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3.25,
            spaceBetween: 30,
          },
          568: {
            slidesPerView: 2.25,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1.25,
            spaceBetween: 20,
          },
        },
      },
    };
  },
  computed: {
    filterProducts() {
      const newPro = this.products.slice(0).reverse();
      return newPro.filter((el, key) => key < 10);
    },
    ...mapGetters('productModules', ['products']),
  },
  components: {
    ProductCard,
  },
};
</script>
