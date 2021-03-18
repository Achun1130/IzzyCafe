<template>
  <main>
    <SwiperBanner></SwiperBanner>
    <section class="container py-md-5 position-relative js-next mb-md-0 mb-3">
      <a href="#" class="c-next" @click.prevent="goNext()">
        <i class="fas fa-fw fa-lg fa-angle-double-down"></i>
      </a>
      <div class="row justify-content-center no-gutters flex-lg-row-reverse">
        <div class="col-lg-4">
          <div class="d-flex flex-column
            justify-content-center align-items-lg-start
            text-lg-left text-center pt-4 pt-md-0 pl-lg-5 h-100">
            <h3 class="p-home__square h2-md font-weight-bold mb-md-4">
              商品分類
            </h3>
            <p class="u-fz-sm h6-md mb-4">喝咖啡配手工餅乾 | 幸福大降臨：)</p>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="d-flex">
            <div class="flex-fill"
              data-aos="flip-left"
              data-aos-duration="1000"
              data-aos-delay="500">
              <router-link class="p-home__nav__link border-right-0"
                to="/products/snacks">
                <span>甜點品項</span>
                <div class="p-home__nav__background"
                  :style="{ 'background-image':
                  'url(' + require('@/assets/images/nav-1.jpg') + ')' }"></div>
              </router-link>
            </div>
            <div class="flex-fill"
              data-aos="flip-left"
              data-aos-duration="1000"
              data-aos-delay="250">
              <router-link class="p-home__nav__link" to="/products/beans">
                <span>精選豆單</span>
                <div class="p-home__nav__background"
                  :style="{ 'background-image':
                  'url(' + require('@/assets/images/nav-2.jpg') + ')' }"></div>
              </router-link>
            </div>
            <div class="flex-fill"
              data-aos="flip-left"
              data-aos-duration="1000">
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
    <section class="container mb-5 pb-lg-4 p-home__intro  p-home__intro--reverse" id="about">
      <div class="row no-gutters justify-content-center flex-row-reverse">
        <div class="col-lg-6">
          <div class="d-flex flex-column h-100">
            <div class="p-home__intro__image mb-3"
              style="background-position: left bottom"
              :style="{ 'background-image':
              'url(' + require('@/assets/images/intro-1.jpg') + ')' }"
              data-aos="zoom-in"
              data-aos-duration="1000"></div>
            <h3 class="p-home__intro__title mb-lg-0 mb-3">About</h3>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="p-home__intro__border"></div>
          <div class="p-home__intro__body">
              <h4 class="p-home__intro__heading">《Izzy》</h4>
              <p class="p-home__intro__content"
                data-aos="fade-up"
                data-aos-duration="1000">
                {{ infoAbout }}
              </p>
            </div>
        </div>
      </div>
    </section>
    <section class="container mb-4" id="news">
      <div class="row no-gutters justify-content-center">
        <div class="col-lg-6">
          <div class="d-flex flex-column h-100">
            <div class="p-home__intro__image mb-3"
              style="background-position: top"
              :style="{ 'background-image':
              'url(' + require('@/assets/images/intro-2.jpg') + ')' }"
              data-aos="zoom-in"
              data-aos-duration="1000"></div>
            <h3 class="p-home__intro__title mb-lg-0 mb-3">News</h3>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="p-home__intro__border"></div>
          <div class="p-home__intro__body">
              <h4 class="p-home__intro__heading">《拎嘎逼，配好書》</h4>
              <p class="p-home__intro__content mb-3"
                data-aos="fade-up"
                data-aos-duration="1000">
                防疫期間我想大家也都悶壞了...肯定也都很想念當時機車一跨，台南趴趴造的時候。
              </p>
              <p class="p-home__intro__content mb-3"
                data-aos="fade-up"
                data-aos-duration="1000">
                這本「悠活台南」每一期都會刊登許多不同的景點、小吃，甚至是巷弄間的小故事，也會介紹新開的店家供讀者可以在放假的時候去溜達～
              </p>
              <p class="p-home__intro__content mb-3"
                data-aos="fade-up"
                data-aos-duration="1000">
                防疫期間來外帶咖啡的同時，也可以順手拿一本我們提供可以自由拿取的「悠活台南」，舒緩一下想出去趴趴造的心情，更新一下這座美麗慢活的城市，在眨眼間又多了什麼新的風貌。
              </p>
            </div>
        </div>
      </div>
    </section>
    <SwiperProduct></SwiperProduct>
    <section class="p-home__subscribe p-3">
      <div class="container py-4">
        <div class="border border-white text-white text-center">
          <div class="row justify-content-center my-5">
            <div class="col-md-5 mb-md-0 mb-4">
              <div class="d-flex flex-column align-items-center
                justify-content-center h-100">
                <div class="p-home__subscribe__text p-md-4 p-3">
                  <div class="mb-2">回台南喝咖啡</div>
                  <div>Izzy Cafe 祝福您 美好沒有限止</div>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="d-flex flex-column h-100 px-3">
                <h3 class="font-weight-bold h2 mb-4">S u b s c r i b e</h3>
                <label class="u-fz-sm mb-3" for="subscribe">訂閱我們，隨時收到最新優惠通知！</label>
                <form>
                  <div class="input-group mb-0">
                    <input type="email" class="form-control" placeholder="請輸入 Email..."
                      id="subscribe">
                    <div class="input-group-append">
                      <button class="btn btn-primary" type="button">訂閱</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      infoAbout: `我不會畫畫,只有簡單的線條
      當初只是喜歡端著熱騰騰的咖啡
      看到客人滿意的笑容
      Izzy 源自於 1996 年亞特蘭大奧運～幸運寶寶之名
      Izzy 原意為 what is it
      就如同咖啡的世界，處處充滿驚奇
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
