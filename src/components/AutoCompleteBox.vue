<template>
  <div class="auto-complete-box">
    <p
      v-for="(word, index) in words"
      :key="index"
      @click="$emit('wordClicked', word)"
    >
      {{ word }}
    </p>
  </div>
</template>

<script>
export default {
  name: "AutoCompleteBox",
  props: ["words"],
};
</script>

<style scoped>
.auto-complete-box {
  animation: scale-in-ver-top 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  background-color: var(--secondary-color);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  color: var(--secondary-text-color);
  font-size: 18px;
  left: 0;
  max-height: 300px;
  overflow-y: auto;
  padding: 0 10px;
  position: absolute;
  top: 40px;
  width: 100%;
}

.auto-complete-box p {
  margin: 10px 0;
  text-align: left;
}

.auto-complete-box p:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
