<template>
  <div class="amount-track">{{ amount.current }}/{{ amount.expected }}</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AmountTrack",
  computed: {
    ...mapGetters({ amount: "getAmountTrack" }),
  },
};
</script>

<style scoped></style>
