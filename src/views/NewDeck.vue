<template>
  <div class="new-deck" @click.stop="autoCompleteToggle(false)">
    <h2>Create new deck</h2>
    <p class="search-text">Search by card name, types, rarity, sets, etc</p>
    <section class="search-section">
      <div class="search-flex-box">
        <div class="search-icon">
          <i class="fas fa-search"></i>
        </div>
        <input
          class="input-card-search"
          type="text"
          placeholder="Ex: Half-Orc"
          @input="callGetAutocomplete"
          v-model="searchText"
          @click.stop="autoCompleteToggle(true)"
        />
        <button class="button-card-search">Search</button>
      </div>
      <AutoCompleteBox
        v-if="autoCompleteShow"
        :words="getAutocomplete"
        @wordClicked="autoCompleteSearch($event), autoCompleteToggle(false)"
      />
    </section>
  </div>
</template>

<script>
import AutoCompleteBox from "@/components/AutoCompleteBox";
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "NewDeck",
  data() {
    return {
      autocomplete: [],
      searchText: "",
      autoCompleteShow: false,
    };
  },
  components: { AutoCompleteBox },
  computed: {
    ...mapGetters(["getAutocomplete"]),
  },
  methods: {
    callGetAutocomplete: _.debounce(function () {
      this.$store.dispatch("fetchAutocomplete", this.searchText);
    }, 600),
    autoCompleteSearch(value) {
      this.searchText = value;
    },
    autoCompleteToggle(state) {
      this.autoCompleteShow = state;
    },
  },
};
</script>

<style scoped>
.new-deck {
  min-height: calc(100vh - 58px);
  width: 100%;
}

.new-deck h2 {
  color: var(--secondary-color);
}

.new-deck p {
  margin: 10px auto;
}

.search-section {
  margin: 0 auto;
  width: 490px;
}

.search-flex-box {
  display: flex;
  place-content: center;
  place-items: center;
  width: 100%;
}

.search-icon {
  background-color: var(--primary-text-color);
  display: inline-block;
  height: 40px;
  width: 40px;
}

.search-icon {
  border-top-left-radius: 5px;
  color: var(--secondary-color);
  font-size: 18px;
  line-height: 40px;
}

.new-deck h2,
.new-deck p,
.search-section {
  text-align: center;
}

.input-card-search {
  background-color: var(--primary-text-color);
  color: var(--secondary-text-color);
  font-size: 18px;
  padding: 5px;
  width: 350px;
}

.button-card-search {
  background-color: var(--secondary-color);
  border-top-right-radius: 5px;
  color: var(--secondary-text-color);
  cursor: pointer;
  width: 100px;
}

.input-card-search,
.button-card-search {
  border: none;
  height: 40px;
  outline: none;
}
</style>
