<template>
  <nav aria-label="Page navigation" v-if="getPageTotal > 1">
    <ul class="pagination justify-content-center mt-3">
      <li class="page-item"
        :class="{ 'disabled': current_page === 1 || !data.length }">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="filterData(current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-if="which_page !== 1">
        <a class="page-link" href="#" @click.prevent="chageCurrentPage(current_page - page)">...</a>
      </li>
      <li class="page-item" v-for="item in getPageItemNum" :key="item"
        :class="{ 'active': current_page === item }">
        <a class="page-link" href="#" @click.prevent="filterData(item)">{{ item }}</a>
      </li>
      <li class="page-item" v-if="which_page !== Math.ceil(getPageTotal / page) && data.length">
        <a class="page-link" href="#" @click.prevent="chageCurrentPage(current_page + page)">...</a>
      </li>
      <li class="page-item"
        :class="{ 'disabled': current_page === getPageTotal || !data.length }">
        <a class="page-link" href="#" aria-label="Next"
          @click.prevent="filterData(current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
</nav>
</template>
<script>
import $ from 'jquery';

export default {
  name: 'ProductPagination',
  props: {
    data: Array,
    perPage: {
      type: Number,
      default: 6,
    },
    page: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      current_page: 1,
      which_page: 1,
    };
  },
  watch: {
    data() {
      this.filterData();
    },
  },
  methods: {
    filterData(currentPage = 1) {
      const vm = this;
      vm.current_page = currentPage;
      const filterData = vm.data.filter((el, key) => (
        vm.perPage * (vm.current_page - 1) < key + 1 && key + 1 <= vm.perPage * vm.current_page));
      vm.$emit('filterData', filterData);
      vm.pagTop();
    },
    chageCurrentPage(page) {
      if (page > this.getPageTotal) {
        this.current_page = this.getPageTotal;
      } else {
        this.current_page = page;
      }
      this.filterData(this.current_page);
    },
    pagTop() {
      if (document.querySelector('.js-pagTop')) {
        const headerHeight = $('.p-navheader').height();
        const targetPos = $('.js-pagTop').offset().top - headerHeight - 16;
        $('html, body').animate({
          scrollTop: targetPos,
        }, 1000);
      }
    },
  },
  computed: {
    getPageTotal() {
      const pageTotal = Math.ceil(this.data.length / this.perPage);
      return pageTotal;
    },
    getPageItemNum() {
      const vm = this;
      const arr = [];
      vm.which_page = Math.ceil(vm.current_page / vm.page);
      for (let i = 1; i < vm.getPageTotal + 1; i += 1) {
        arr.push(i);
      }
      const pageItemNum = arr.filter((el, key) => (
        vm.page * (vm.which_page - 1) < key + 1 && key + 1 <= vm.page * vm.which_page));
      return pageItemNum;
    },
  },
  created() {
    this.filterData();
  },
};
</script>
