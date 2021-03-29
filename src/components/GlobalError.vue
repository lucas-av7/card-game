<template>
  <div class="global-error">
    <i class="fas fa-exclamation-circle errorIcon"></i>
    <p>{{ error }}</p>
    <i class="fas fa-exclamation-circle errorIcon"></i>
  </div>
</template>

<script>
export default {
  name: "GlobalError",
  props: ["error"],
  created() {
    setTimeout(() => {
      this.$store.dispatch("addTextError", "");
    }, 3500);
  },
};
</script>

<style scoped>
.global-error {
  align-items: center;
  background-color: var(--danger);
  border-radius: 10px;
  box-shadow: -3px 3px 3px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-between;
  left: 50%;
  max-width: 350px;
  padding: 10px;
  position: fixed;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  z-index: 9997;
}

.global-error p {
  color: var(--primary-text-color);
}

.global-error .errorIcon {
  font-size: 20px;
  margin: 0 10px;
}
</style>
