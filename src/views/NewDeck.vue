<template>
  <div class="new-deck">
    <h2>Create new deck</h2>
    <p class="search-text">Search by card name</p>
    <section class="search-section">
      <input type="text" class="input-card-search" />
      <button class="button-card-search">Search</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "NewDeck",
};
</script>

<style scoped>
.new-deck {
  width: 100%;
}

.new-deck h2 {
  color: var(--secondary-color);
}

.new-deck p {
  margin: 10px auto;
}

.new-deck h2,
.new-deck p,
.search-section {
  text-align: center;
}

.input-card-search {
  width: 350px;
  padding: 5px;
}

.button-card-search {
  width: 100px;
  background-color: var(--secondary-color);
  color: var(--secondary-text-color);
  cursor: pointer;
}

.input-card-search,
.button-card-search {
  height: 40px;
  outline: none;
  border: none;
}
</style>
