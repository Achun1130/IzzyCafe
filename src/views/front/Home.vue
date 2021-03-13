<template>
  <main>
    <SwiperBanner></SwiperBanner>
    <section class="p-md-5 position-relative js-next">
      <a href="#" class="c-next" @click.prevent="goNext()">
        <i class="fas fa-fw fa-lg fa-angle-double-down"></i>
      </a>
      <div class="row justify-content-center no-gutters">
        <div class="col-lg-4 u-fadeUp">
          <div class="d-flex flex-column justify-content-center
            text-lg-right text-center pt-4 pt-md-0 pr-lg-5 h-100">
            <h3 class="h2-md font-weight-bold mb-md-4">商品分類</h3>
            <p class="u-fz-sm h6-md mb-4">喝咖啡配手工餅乾 | 幸福大降臨：)</p>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="d-flex">
            <div class="flex-fill">
              <router-link class="p-home__nav__link border-right-0"
                to="/products/snacks">
                <span>甜點品項</span>
                <div class="p-home__nav__background"
                  :style="{ 'background-image':
                  'url(' + require('@/assets/images/nav-1.jpg') + ')' }"></div>
              </router-link>
            </div>
            <div class="flex-fill">
              <router-link class="p-home__nav__link" to="/products/beans">
                <span>精選豆單</span>
                <div class="p-home__nav__background"
                  :style="{ 'background-image':
                  'url(' + require('@/assets/images/nav-2.jpg') + ')' }"></div>
              </router-link>
            </div>
            <div class="flex-fill">
              <router-link class="p-home__nav__link border-left-0"
                to="products/gifts"
                >
                <span>禮盒專區</span>
                <div class="p-home__nav__background"
                  :style="{ 'background-image':
                  'url(' + require('@/assets/images/nav-3.jpg') + ')' }"></div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="p-home__intro" id="about">
      <div class="container">
        <div class="row">
          <div class="col-md-6 position-relative mb-md-0 mb-4 u-fadeUp">
            <div class="p-home__intro__image"
              style="background-position: left bottom"
              :style="{ 'background-image':
              'url(' + require('@/assets/images/intro-1.jpg') + ')' }"></div>
          </div>
          <div class="col-md-6 u-fadeUp">
            <div class="p-home__intro__body">
              <h4 class="p-home__intro__heading">《Izzy》</h4>
              <p class="p-home__intro__content">
                {{ infoAbout }}
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <h3 class="p-home__intro__title">About</h3>
          </div>
        </div>
      </div>
    </section>
    <section class="p-home__intro p-home__intro--info" id="news">
      <div class="container">
        <div class="row flex-row-reverse">
          <div class="col-md-6 position-relative mb-md-0 mb-4 u-fadeUp">
            <div class="p-home__intro__image"
              :style="{ 'background-image':
              'url(' + require('@/assets/images/intro-2.jpg') + ')' }"></div>
          </div>
          <div class="col-md-6 u-fadeUp">
            <div class="p-home__intro__body">
              <h4 class="p-home__intro__heading">《拎嘎逼，配好書》</h4>
              <p class="p-home__intro__content mb-3">防疫期間我想大家也都悶壞了...肯定也都很想念當時機車一跨，台南趴趴造的時候。
              </p>
              <p class="p-home__intro__content mb-3">
              這本「悠活台南」每一期都會刊登許多不同的景點、小吃，甚至是巷弄間的小故事，也會介紹新開的店家供讀者可以在放假的時候去溜達～
              </p>
              <p class="p-home__intro__content">
              防疫期間來外帶咖啡的同時，也可以順手拿一本我們提供可以自由拿取的「悠活台南」，舒緩一下想出去趴趴造的心情，更新一下這座美麗慢活的城市，在眨眼間又多了什麼新的風貌。
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <h3 class="p-home__intro__title text-right">News</h3>
          </div>
        </div>
      </div>
    </section>
    <SwiperProduct></SwiperProduct>
  </main>
</template>
<script>
import $ from 'jquery';

import SwiperBanner from '@/components/SwiperBanner.vue';
import SwiperProduct from '@/components/SwiperProduct.vue';

export default {
  name: 'Home',
  data() {
    return {
      infoAbout: `我不會畫畫,只有簡單的線條，
      當初只是喜歡端著熱騰騰的咖啡，
      看到客人滿意的笑容，
      Izzy 源自於 1996 年亞特蘭大奧運～幸運寶寶之名，
      Izzy 原意為 what is it～
      就如同咖啡的世界，處處充滿驚奇～
      `,
    };
  },
  methods: {
    goNext() {
      const navHeight = $('.p-navheader').outerHeight();
      const targetPos = $('.js-next').offset().top - navHeight;

      $('body, html').animate({
        scrollTop: targetPos,
      }, 1000);
    },
  },
  mounted() {
    $(window).scroll(() => {
      const scrollPos = $(window).scrollTop();
      const winHeight = $(window).height();

      // eslint-disable-next-line func-names
      $('.u-fadeUp').each(function () {
        const fadePos = $(this).offset().top;
        if (scrollPos >= fadePos - winHeight) {
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      });
    });
  },
  components: {
    SwiperBanner,
    SwiperProduct,
  },
};
</script>
