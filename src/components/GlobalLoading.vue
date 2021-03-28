<template>
  <div class="global-loading">
    <div class="loading-icon">
      <i class="fas fa-gamepad"></i>
      <p>Loading, please wait<span>.</span><span>.</span><span>.</span></p>
    </div>

    <AmountTrack class="amount-track" v-if="amount.expected" />
  </div>
</template>

<script>
import AmountTrack from "@/components/AmountTrack";
import { mapGetters } from "vuex";

export default {
  name: "GlobalLoading",
  components: { AmountTrack },
  computed: {
    ...mapGetters({ amount: "getAmountTrack" }),
  },
};
</script>

<style scoped>
.global-loading {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000bb;
}

.loading-icon {
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
  left: 50%;
  top: 50%;
}

.loading-icon i {
  -webkit-animation: rotating 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  -moz-animation: rotating 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  -ms-animation: rotating 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  -o-animation: rotating 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  animation: rotating 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  font-size: 80px;
  margin-bottom: 20px;
}

.loading-icon p {
  font-size: 20px;
}

.loading-icon p span {
  font-size: 30px;
}

.loading-icon p span {
  animation: hide-show 2s linear infinite;
}

.loading-icon p span:first-child {
  animation-delay: 0.5s;
}

.loading-icon p span:nth-child(2) {
  animation-delay: 1s;
}

.loading-icon p span:last-child {
  animation-delay: 1.5s;
}

.amount-track {
  right: 10px;
  bottom: 10px;
  position: absolute;
}

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes hide-show {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
