<template>
  <a href="#" class="c-top">
    <i class="fas fa-lg fa-arrow-up"></i>
    <span class="sr-only">移動到最上方</span>
  </a>
</template>
<script>
import $ from 'jquery';

export default {
  name: 'ScrollTop',
  mounted() {
    $('.c-top').on('click', (e) => {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0,
      }, 1000);
    });

    $(window).on('scroll', () => {
      const scrollTop = $(window).scrollTop();
      const height = $(window).height();
      if (scrollTop > height / 2) {
        $('.c-top').css('opacity', '1');
      } else {
        $('.c-top').css('opacity', '0');
      }
    });
  },
};
</script>
