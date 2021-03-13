<template>
  <ValidationProvider class="input-group" :class="qtyClass"
    name="數量" rules="required|min_value:1|max_value:99|numeric"
    v-slot="{ errors }">
    <div class="input-group-prepend">
      <button class="btn btn-outline-secondary text-dark" type="button"
        @click="qty--">
        <i class="fas fa-sm fa-minus"></i>
      </button>
    </div>
    <input type="number" class="form-control text-center"
      v-model.number="qty" min="1" max="99">
    <div class="input-group-append">
      <button class="btn btn-outline-secondary text-dark" type="button"
        @click="qty++">
        <i class="fas fa-sm fa-plus"></i>
      </button>
    </div>
    <span class="d-block invalid-feedback">{{ errors[0] }}</span>
  </ValidationProvider>
</template>
<script>
export default {
  name: 'QtyButton',
  props: {
    data: Object,
    qtyClass: Array,
    isId: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      qty: this.data.qty,
    };
  },
  watch: {
    data: {
      handler() {
        this.qty = this.data.qty;
      },
      deep: true,
    },
    qty() {
      if (this.qty < 1) {
        this.qty = 1;
      }
      if (this.data.id) {
        this.$store.dispatch('cartModules/changeCart', {
          qty: this.qty,
          id: this.data.id,
        });
      } else {
        this.$emit('getQty', this.qty);
      }
    },
  },
  mounted() {
    if (this.isId) {
      document.querySelector('input[type="number"]').setAttribute('id', 'qty');
    }
  },
};
</script>
