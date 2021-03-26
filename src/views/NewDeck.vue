<template>
  <div class="new-deck" @click.stop="autoCompleteToggle(false)">
    <h2>Create new deck</h2>
    <p class="search-text">Search by card name</p>
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
          @keyup.enter="searchCard"
        />
        <button class="button-card-search" @click="searchCard">Search</button>
      </div>
      <transition name="scale-in">
        <AutoCompleteBox
          v-show="autoCompleteShow"
          :words="getAutocomplete"
          @wordClicked="autoCompleteSearch($event), autoCompleteToggle(false)"
        />
      </transition>
    </section>
    <section class="cards">
      <img
        v-for="(card, index) in cards"
        :key="index"
        :src="card.image_uris.normal"
        :alt="card.name"
      />
    </section>
  </div>
</template>

<script>
import AutoCompleteBox from "@/components/AutoCompleteBox";
import { scryFallSearchCard } from "@/services/scryfall";
import { mapGetters } from "vuex";
import _ from "lodash";

import { userDecksMock } from "../../tests/unit/testUtils/decks";

export default {
  name: "NewDeck",
  data() {
    return {
      autocomplete: [],
      searchText: "",
      autoCompleteShow: false,
      cards: userDecksMock[0],
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
      this.searchCard();
      this.callGetAutocomplete();
    },
    autoCompleteToggle(state) {
      this.autoCompleteShow = state;
    },
    async searchCard() {
      if (this.searchText.length < 3) return;
      this.autoCompleteShow = false;
      this.cards = [];
      this.$store.commit("changeGlobalLoading", true);
      try {
        const { data } = await scryFallSearchCard(this.searchText);
        const cards = data.data.filter((card) => {
          return card.image_uris != undefined;
        });
        this.cards = cards;
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        this.cards = [];
      }
      this.$store.commit("changeGlobalLoading", false);
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
  position: relative;
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
  color: var(--secondary-color);
  display: inline-block;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  width: 40px;
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

.cards {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10px;
  width: 100%;
}

.cards img {
  background-size: 210px;
  background: url(../assets/place-holder.jpg) no-repeat scroll 0 0;
  border-radius: 10px;
  height: 293px;
  margin: 5px;
  width: 210px;
}

.scale-in-enter-active {
  animation: scale-in-ver-top 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.scale-in-leave-active {
  animation: scale-out-ver-top 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

@keyframes scale-out-ver-top {
  0% {
    transform: scaleY(1);
    transform-origin: 100% 0%;
  }
  100% {
    transform: scaleY(0);
    transform-origin: 100% 0%;
  }
}

@keyframes scale-in-ver-top {
  0% {
    transform: scaleY(0);
    transform-origin: 100% 0%;
  }
  100% {
    transform: scaleY(1);
    transform-origin: 100% 0%;
  }
}
</style>
