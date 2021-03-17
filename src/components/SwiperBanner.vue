<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="text-white">
    <swiper-slide class="u-bg-cover text-md-right text-center
      c-swiper__banner" data-animation="moving-letters">
      <h2 class="moving-letters p-md-5 p-3 ml-md-5 u-middle">
        <span class="text-wrapper">
          <span class="letters">Welcome to izzy cafè.</span>
        </span>
      </h2>
    </swiper-slide>
    <swiper-slide class="u-bg-cover text-center
      c-swiper__banner" data-animation="promotion">
      <vue-typed-js class="p-3 ml-md-5 mb-0 h3 d-inline-block position-relative
        u-middle c-swiper__text"
        :strings="[str.promotion]"
        :contentType="'html'" :backSpeed="50" :typeSpeed="100" v-if="status.promotion">
        <span class="typing"></span>
      </vue-typed-js>
    </swiper-slide>
    <swiper-slide class="u-bg-cover c-swiper__banner"
      data-swiper-autoplay="9000" data-animation="msg">
      <vue-typed-js
        :strings="[str.msg]"
        :contentType="'html'"
        :loop="false"
        :showCursor="false"
        class="px-md-5 px-2 py-3 m-md-5 text-pre-line"
        v-if="status.msg">
        <p class="typing rounded px-3 py-3 mb-0 mx-sm-0 mx-auto c-swiper__text h6-sm u-fz-sm"></p>
      </vue-typed-js>
    </swiper-slide>
    <div class="swiper-button-prev swiper-button-white u-hover-opacity" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button-white u-hover-opacity" slot="button-next"></div>
  </swiper>
</template>
<script>
import $ from 'jquery';

export default {
  name: 'SwiperBanner',
  data() {
    return {
      status: {
        msg: false,
        promotion: false,
      },
      str: {
        msg: `1996年至今
      不曾改變的冰磚咖啡
      就像海枯石爛般的經典愛情
      靜靜守候陪伴著你我
      台南 冰磚咖啡
      因為有你 有妳才顯得經典
      一起迎接2021奇異恩典的一年吧`,
        promotion: '歡慶 izzy 25 週年<span class="d-sm-inline d-none">，</span><br class="d-sm-none">全館享免運優惠',
      },
      swiperOptions: {
        speed: 1500,
        effect: 'fade',
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        keyboard: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  methods: {
    bannerAnimation() {
      const textWrapper = document.querySelector('.moving-letters .letters');
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

      this.$anime.timeline()
        .add({
          targets: '.moving-letters .letter',
          translateY: ['1.1em', 0],
          translateZ: 0,
          duration: 750,
          delay: (el, i) => 500 + (50 * i),
        });
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    const vm = this;
    vm.bannerAnimation();
    vm.swiper.on('slideChange', () => {
      const index = vm.swiper.activeIndex;
      const data = $('.swiper-slide').eq(index).data('animation');
      vm.status.promotion = false;
      vm.status.msg = false;
      if (data === 'moving-letters') {
        vm.bannerAnimation();
      } else if (data === 'msg') {
        vm.status.msg = true;
      } else if (data === 'promotion') {
        vm.status.promotion = true;
      }
    });
  },
};
</script>
