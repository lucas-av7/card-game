<template>
  <div class="new-deck" @click.stop="autoCompleteToggle(false)">
    <h2 v-if="id">Edit deck {{ id }}</h2>
    <h2 v-else>Create new deck</h2>
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
          @keyup.enter="(pagination.page = 1), searchCard()"
        />
        <button
          class="button-card-search"
          @click="(pagination.page = 1), searchCard()"
        >
          Search
        </button>
      </div>
      <transition name="scale-in">
        <AutoCompleteBox
          v-show="autoCompleteShow"
          :words="getAutocomplete"
          @wordClicked="autoCompleteSearch($event), autoCompleteToggle(false)"
        />
      </transition>
    </section>

    <section class="pagination-box" v-show="showPagination">
      <div class="page-info">
        <p>
          The last search founds a total of {{ pagination.totalCards }}
          {{ pagination.totalCards ? "cards" : "card" }}.
        </p>
      </div>
      <div class="buttons-area">
        <button
          :disabled="pagination.page == 1"
          @click="(pagination.page -= 1), searchCard()"
        >
          Previous
        </button>
        <span>{{ pagination.page }}</span>
        <button
          :disabled="!pagination.hasMore"
          @click="(pagination.page += 1), searchCard()"
        >
          Next
        </button>
      </div>
    </section>

    <section class="cards">
      <div class="card-box" v-for="(card, index) in cards" :key="index">
        <img :src="card.image_uris.normal" :alt="card.name" />
        <button class="add-card-button" @click="addCard(card)">&plus;</button>
      </div>
    </section>

    <transition name="scale-in-bottom">
      <TmpDeck v-show="tmpDeck.length > 0" :editId="id" />
    </transition>
  </div>
</template>

<script>
import AutoCompleteBox from "@/components/AutoCompleteBox";
import TmpDeck from "@/components/TmpDeck";
import { scryFallSearchCard } from "@/services/scryfall";
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "NewDeck",
  props: ["id"],
  data() {
    return {
      autocomplete: [],
      autoCompleteShow: false,
      showPagination: false,
      cards: [],
      pagination: {
        hasMore: false,
        page: 1,
        totalCards: 0,
      },
      searchText: "",
    };
  },
  components: { AutoCompleteBox, TmpDeck },
  computed: {
    ...mapGetters({
      tmpDeck: "getTmpDeck",
      getAutocomplete: "getAutocomplete",
    }),
  },
  methods: {
    callGetAutocomplete: _.debounce(function () {
      if (this.searchText.length < 2) return;
      this.$store.dispatch("fetchAutocomplete", this.searchText);
    }, 600),
    autoCompleteSearch(value) {
      this.searchText = value;
      this.pagination.page = 1;
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
      this.showPagination = false;
      this.$store.commit("changeGlobalLoading", true);
      try {
        const { data } = await scryFallSearchCard(
          this.searchText,
          this.pagination.page
        );
        const cards = data.data.filter((card) => {
          return card.image_uris != undefined;
        });
        this.pagination.totalCards = data.total_cards;
        this.pagination.hasMore = data.has_more;
        this.cards = cards;
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        this.pagination.totalCards = 0;
        this.cards = [];
      }
      this.showPagination = true;
      this.$store.commit("changeGlobalLoading", false);
    },
    addCard(card) {
      this.$store.dispatch("addCardToTmpDeck", card);
    },
  },
  watch: {
    searchText: function (value) {
      if (value.length < 2) this.$store.commit("changeAutocomplete", []);
    },
  },
  created() {
    this.$store.commit("changeAutocomplete", []);
    if (this.id) {
      let userDecks = this.$store.getters.getUsersDecks;
      this.$store.commit("changeTmpDeck", userDecks[this.id - 1]);
    }
  },
};
</script>

<style scoped>
.new-deck {
  min-height: calc(100vh - 58px);
  width: 100%;
  padding-bottom: 215px;
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

.pagination-box {
  border-top: 1px solid #77a;
  border-bottom: 1px solid #77a;
  margin-top: 15px;
  width: 100%;
  height: 50px;
  /* background-color: bisque; */
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.pagination-box p {
  display: inline-block;
  width: auto;
  color: var(--secondary-color);
}

.buttons-area button {
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  height: 30px;
  outline: none;
  transition: 0.5s;
  width: 100px;
}

.buttons-area button:first-child {
  background-color: #ccc;
  color: var(--secondary-text-color);
  margin-right: 5px;
}

.buttons-area button:last-child {
  background-color: var(--secondary-color);
  color: var(--secondary-text-color);
  margin-left: 5px;
}

.buttons-area button:hover {
  filter: brightness(1.15);
}

.buttons-area button:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.buttons-area button:disabled:hover {
  filter: none;
}

.cards {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10px;
  width: 100%;
}

.card-box {
  margin: 5px;
  position: relative;
  width: auto;
}

.cards .add-card-button {
  background-color: var(--confirm);
  border-radius: 50%;
  border: none;
  bottom: 7px;
  color: var(--secondary-text-color);
  cursor: pointer;
  font-size: 25px;
  height: 30px;
  left: 50%;
  outline: none;
  position: absolute;
  transform: translate(-50%);
  width: 30px;
  z-index: 2;
}

.cards img {
  background-image: url(../assets/place-holder.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 10px;
  height: 293px;
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

.scale-in-bottom-enter-active {
  animation: scale-in-bt-vr-tp 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.scale-in-bottom-leave-active {
  animation: scale-out-bt-vr-tp 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

@keyframes scale-out-bt-vr-tp {
  0% {
    transform: scaleY(1);
    transform-origin: 0% 100%;
  }
  100% {
    transform: scaleY(0);
    transform-origin: 0% 100%;
  }
}

@keyframes scale-in-bt-vr-tp {
  0% {
    transform: scaleY(0);
    transform-origin: 0% 100%;
  }
  100% {
    transform: scaleY(1);
    transform-origin: 0% 100%;
  }
}
</style>
