<template>
  <nav aria-label="Page navigation mt-5" v-if="pagination">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'disabled': !pagination.has_pre }">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="changePage(pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
        v-for="(item, key) in pagination.total_pages"
        :key="key"
        :class="{ 'active': item === pagination.current_page }">
        <a class="page-link" href="#"
          @click.prevent="changePage(item)"
          v-if="item !== pagination.current_page">{{ item }}</a>
        <span class="page-link" v-if="item === pagination.current_page">
          {{ item }}
          <span class="sr-only">(current)</span>
        </span>
      </li>
      <li class="page-item" :class="{ 'disabled': !pagination.has_next }">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent="changePage(pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
</nav>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    pagination: Object,
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    },
  },
};
</script>
