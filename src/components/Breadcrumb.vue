<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb js-pagTop">
      <li class="breadcrumb-item">
        <router-link to="/" title="首頁">
          <i class="fas fa-home"></i>
          <span class="sr-only">首頁</span>
        </router-link>
      </li>
      <li class="breadcrumb-item"
        v-for="(item, key) in title" :key="key"
        :class="{ 'active': key + 1 === title.length }"
        :aria-current="key + 1 === title.length ? 'page' : false">
        <router-link :to="{ name: item }" v-if="key + 1 !== title.length">{{ item }}</router-link>
        <template v-if="key + 1 === title.length">{{ item }}</template>
      </li>
    </ol>
  </nav>
</template>
<script>
export default {
  name: 'Breadcrumb',
  props: {
    title: Array,
  },
};
</script>
