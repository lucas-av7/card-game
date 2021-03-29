<template>
  <div id="app">
    <router-link to="/" active-class="site-title">
      <h1>Card Game</h1>
    </router-link>
    <router-view />
    <GlobalLoading v-show="getGlobalLoading" />
  </div>
</template>

<script>
import GlobalLoading from "@/components/GlobalLoading";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { GlobalLoading },
  computed: {
    ...mapGetters(["getGlobalLoading"]),
  },
};
</script>

<style>
@import "./animations/animations.css";
@import "./animations/transitions.css";

:root {
  --confirm: #5cc42c;
  --danger: #d62828;
  --primary-color: #6a040f;
  --primary-text-color: #fff;
  --secondary-color: #ffba08;
  --secondary-text-color: #000;
  --warning: #f4a261;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: linear-gradient(to right, #302b63, #24243e);
  color: var(--primary-text-color);
  font-family: "Roboto", sans-serif;
}

.site-title {
  color: var(--primary-text-color);
  text-decoration: none;
  display: inline-block;
  margin: 10px;
}
</style>
