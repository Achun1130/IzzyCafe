<template>
  <nav class="p-navheader fixed-top">
    <a href="#" class="c-icon d-lg-none"
      @click.prevent="showSidebarMenu = !showSidebarMenu">
      <div class="c-icon__bars"
        :class="{ 'active': showSidebarMenu }">
        <span class="c-icon__bars__item"></span>
        <span class="c-icon__bars__item"></span>
        <span class="c-icon__bars__item"></span>
      </div>
    </a>
    <router-link class="p-navheader__brand offset-lg-0 offset-1" to="/">
      <img src="@/assets/images/logo_izzy_md.jpg" alt="logo_izzy_md"
      class="d-lg-inline-block d-none">
      <img src="@/assets/images/logo_izzy_sm.jpg" alt="logo_izzy_sm" class="d-lg-none">
      <h1 class="sr-only">Izzy Cafe</h1>
    </router-link>
    <div class="pl-lg-2 order-lg-1 ml-lg-0 ml-auto">
      <a href="#" class="text-white py-2 px-1"
        data-toggle="tooltip" data-trigger="hover" title="搜尋"
        @click.prevent="showSearch = true">
        <i class="fas fa-lg fa-dw fa-search"></i>
        <div class="sr-only">搜尋</div>
      </a>
      <div class="p-navheader__search" :class="{ 'active': showSearch }"
        @click.self="showSearch = false">
        <button type="button" class="close
          position-absolute p-4 display-4 text-white" aria-label="Close"
          style="top: 40px; right: 0"
          @click="showSearch = false">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="input-group p-navheader__search__body px-3 rounded-pill">
          <input type="text" id="search" class="form-control form-control-lg
            u-bg-transparent border-0 shadow-none"
            v-model="search" placeholder="找產品..."
            @keyup.enter="goSearch()">
          <div class="input-group-append align-items-center u-bg-transparent">
            <a href="#" class="d-block px-2" @click.prevent="goSearch()">
              <i class="fas fa-lg fa-dw fa-search"></i>
            </a>
          </div>
        </div>
      </div>
      <a href="#" class="text-white position-relative p-2"
        @click.prevent="TOGGLECART()"
          data-toggle="tooltip" data-trigger="hover" title="購物車">
        <i class="fas fa-lg fa-fw fa-shopping-cart position-relative"
          :class="{ 'p-alert': !carts.length }">
          <span v-if="carts.length" class="p-navheader__num">
            {{ carts.length > 9 ? '9+' : carts.length }}
          </span>
        </i>
      </a>
    </div>
    <div class="p-navheader__nav ml-lg-auto"
      :class="{ 'active': showSidebarMenu }"
      @click.self="showSidebarMenu = false">
      <ul class="p-navheader__nav__body">
        <li class="p-navheader__item ml-lg-auto">
          <a href="#about" class="p-navheader__link js-slideId">
            <span class="p-navheader__link__hover">
              關於 Izzy
            </span>
          </a>
        </li>
        <li class="p-navheader__item">
          <a href="#news" class="p-navheader__link js-slideId">
            <span class="p-navheader__link__hover">
              最新消息
            </span>
          </a>
        </li>
        <li class="p-navheader__item">
          <a class="p-navheader__link" href="#"
            :class="{ 'active': showMenu }"
            @click.prevent="showMenu = !showMenu">
            <span class="p-navheader__link__hover">
              <span>商品介紹</span>
              <i class="fas fa-chevron-down ml-lg-2 ml-3 p-rotate180"></i>
            </span>
          </a>
          <ul class="p-navheader__menu">
            <li class="p-navheader__item mt-0">
              <router-link class="p-navheader__link" to="/products">
                <span class="p-navheader__link__hover">
                  所有商品
                </span>
              </router-link>
            </li>
            <li class="p-navheader__item"
              v-for="(item, key) in categories" :key="key">
              <router-link class="p-navheader__link" :to="{ name: item }">
                <span class="p-navheader__link__hover">
                  {{ item }}
                </span>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="p-navheader__item">
          <router-link class="p-navheader__link" to="/location">
            <span class="p-navheader__link__hover">
              門市資訊
            </span>
          </router-link>
        </li>
        <li class="p-navheader__item mt-auto mr-lg-0 mr-2">
          <router-link class="d-block text-lg-white p-2 text-right"
            to="/admin/products_list"
            data-toggle="tooltip" data-trigger="hover" title="後台管理">
            <i class="fas fa-lg fa-fw fa-cog"></i>
            <span class="sr-only">後台管理</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import $ from 'jquery';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Navheader',
  data() {
    return {
      showSidebarMenu: false,
      showMenu: false,
      showSearch: false,
      search: '',
    };
  },
  methods: {
    goSearch() {
      this.showSearch = false;
      this.$router.push({ path: '/products/search', query: { keyword: this.search } });
      this.search = '';
    },
    slideId() {
      const vm = this;
      // eslint-disable-next-line func-names
      $('.js-slideId').on('click', function (e) {
        e.preventDefault();
        if (vm.$route.path === '/') {
          const headerHeight = $('.p-navheader').outerHeight();
          const href = $(this).attr('href');
          const targetPos = $(href).offset().top - headerHeight;

          vm.showSidebarMenu = false;
          vm.showMenu = false;

          $('body, html').animate({
            scrollTop: targetPos,
          }, 1000);
        } else {
          vm.$router.push('/').then(() => {
            const headerHeight = $('.p-navheader').outerHeight();
            const href = $(this).attr('href');
            const targetPos = $(href).offset().top - headerHeight;

            $('body, html').animate({
              scrollTop: targetPos,
            }, 1000);
          });
        }
      });
    },
    slideActive() {
      $(window).scroll(() => {
        // eslint-disable-next-line func-names
        $('.js-slideId').each(function () {
          const href = $(this).attr('href');
          if (document.querySelector(href)) {
            const headerHeight = $('.p-navheader').outerHeight();
            const targetPos = $(href).offset().top - headerHeight;
            const targetHeight = $(href).outerHeight();
            const scrollTop = $(window).scrollTop();

            if (targetPos <= scrollTop && scrollTop < targetPos + targetHeight) {
              $(this).addClass('active');
            } else {
              $(this).removeClass('active');
            }
          } else {
            $('.js-slideId').removeClass('active');
          }
        });
      });
    },
    ...mapMutations('cartModules', ['TOGGLECART']),
  },
  computed: {
    ...mapGetters('cartModules', ['carts']),
    ...mapGetters('productModules', ['categories']),
  },
  watch: {
    showSearch() {
      if (this.showSearch) {
        setTimeout(() => {
          document.querySelector('#search').focus();
        }, 100);
      }
    },
  },
  mounted() {
    const vm = this;
    $('[data-toggle="tooltip"]').tooltip();
    vm.slideId();
    vm.slideActive();
    vm.$router.beforeEach((to, from, next) => {
      vm.showSidebarMenu = false;
      vm.showMenu = false;
      next();
    });
  },
};
</script>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
