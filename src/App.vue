<template>
  <div id="app">
    <router-link to="/" active-class="site-title">
      <h1>Card Game</h1>
    </router-link>
    <router-view />
  </div>
</template>

<style>
:root {
  --primary-color: #6a040f;
  --secondary-color: #ffba08;
  --danger: #e76f51;
  --primary-text-color: #fff;
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
}

#app h1 {
  text-align: center;
  margin: 10px 0;
  transition: 0.5s;
}

#app h1:hover {
  text-align: center;
  opacity: 0.75;
}

.default-views {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 58px);
  place-content: center;
  place-items: center;
  width: 100%;
}
</style>
