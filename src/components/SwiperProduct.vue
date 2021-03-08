<template>
  <section class="p-home__product">
    <div class="container py-5">
      <div class="row flex-row-reverse">
        <div class="col-lg-4 u-fadeUp">
          <div class="d-flex flex-column justify-content-center h-100
            text-lg-left text-center pr-lg-5 text-white">
            <h3 class="h2-md font-weight-bold mb-md-4">最新上架</h3>
            <p class="u-fz-sm h6-md">《 享受每種食物單純的快樂 》</p>
          </div>
        </div>
        <div class="col-lg-8 py-3 py-lg-5">
          <swiper class="swiper h-100 graphic py-3 py-lg-5" :options="swiperOption">
            <swiper-slide v-for="item in filterProducts" :key="item.id">
                <div class="c-product__card">
                  <img src="@/assets/images/onsale_icon.png" alt="sale image"
                    class="c-product__card__sale" v-if="item.origin_price !== item.price">
                  <a href="#" class="c-product__card__img"
                    :style="{ 'background-image': 'url(' + item.imageUrl + ')' }"
                    @click.prevent="pushPath(item.id)">
                    <div class="c-product__card__img__text d-none d-lg-block">
                      <i class="fas fa-search mr-2"></i>查看更多
                    </div>
                  </a>
                  <div class="c-product__card__body">
                    <div class="d-flex flex-column mb-2">
                      <a href="#" class="c-product__card__title h6" title="查看更多"
                        @click.prevent="pushPath(item.id)">{{ item.title }}</a>
                      <div>
                        <b class="c-product__card__price h6">NT{{ item.price | currency }}</b>
                        <del class="text-muted" v-if="item.origin_price !== item.price">
                          NT{{ item.origin_price | currency }}
                        </del>
                      </div>
                    </div>
                    <div class="d-flex flex-column align-items-center mt-sm-auto">
                      <div class="d-flex align-items-start">
                        <span class="badge badge-pill badge-info"
                          :class="{ 'ml-1': key !== 0 }"
                          v-for="(el, key) in item.category" :key="key">
                          <i class="fas fa-tag mr-1"></i>
                          {{ el }}
                        </span>
                      </div>
                      <button class="btn btn-primary btn-sm mt-2 text-nowrap" type="button"
                        :class="{ 'disabled': modalLoading && item.id === productId }"
                        @click="showProduct(item.id)">
                        <i class="fas fa-shopping-cart mr-1"></i>
                        加入購物車
                        <i class="fas fa-spinner fa-spin ml-1"
                          v-if="modalLoading && item.id === productId"></i>
                      </button>
                    </div>
                  </div>
                </div>
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
    </div>
  </section>
</template>
<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

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
  methods: {
    pushPath(id) {
      this.$router.push(`/products/${id}`);
    },
    showProduct(id) {
      this.$store.dispatch('productModules/getProduct', {
        id,
        isModal: true,
      })
        .then(() => {
          $('#productModal').modal('show');
        });
    },
  },
  computed: {
    filterProducts() {
      const newPro = this.products.slice(0).reverse();
      return newPro.filter((el, key) => key < 10);
    },
    ...mapGetters('productModules', ['productId', 'products']),
    ...mapGetters(['modalLoading']),
  },
};
</script>
