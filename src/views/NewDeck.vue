<template>
  <div class="new-deck">
    <h2>Create new deck</h2>
    <p class="search-text">Search by card name, types, rarity, sets, etc</p>
    <section class="search-section">
      <input
        class="input-card-search"
        type="text"
        placeholder="Ex: Half-Orc"
        @input="callGetAutocomplete"
        v-model="searchText"
      />
      <button class="button-card-search">Search</button>
      <div>
        <p v-for="(word, index) in getAutocomplete" :key="index">
          {{ word }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "NewDeck",
  data() {
    return {
      autocomplete: [],
      searchText: "",
    };
  },
  computed: {
    ...mapGetters(["getAutocomplete"]),
  },
  methods: {
    callGetAutocomplete: _.debounce(function () {
      this.$store.dispatch("fetchAutocomplete", this.searchText);
    }, 1000),
  },
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
