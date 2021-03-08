<template>
  <div class="c-alert__message">
    <div class="overflow-hidden"
      v-for="(item, i) in messages" :key="i">
      <div class="alert alert-dismissible animate__animated animate__slideInDown text-nowrap"
        :class="'alert-' + item.status">
        <i class="fas fa-lg fa-check-circle
          animate__animated animate__rubberBand animate__repeat-2 text-success align-middle"
          v-if="item.status === 'success'"></i>
        <i class="fas fa-lg fa-exclamation-circle
          animate__animated animate__rubberBand animate__repeat-2 text-danger align-middle"
          v-if="item.status === 'danger'"></i>
        <span class="ml-2">{{ item.message }}</span>
        <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Alert',
  methods: {
    removeMessage(num) {
      this.$store.commit('alertModules/MESSAGESSPLICE', num);
    },
  },
  computed: {
    ...mapGetters('alertModules', ['messages']),
  },
};
</script>
