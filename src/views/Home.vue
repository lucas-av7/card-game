<template>
  <div class="home">
    <button class="create-deck-button" @click="goToNewDeckView">
      Create new deck
    </button>
    <button class="random-deck-button">New random deck</button>

    <section class="decksHub">
      <template v-for="(deck, index) in getUsersDecks[0]">
        <Deck :key="index" :deckCards="deck" />
      </template>
    </section>
  </div>
</template>

<script>
import Deck from "@/components/Deck";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  methods: {
    goToNewDeckView() {
      this.$router.push("/new-deck");
    },
  },
  components: { Deck },
  computed: {
    ...mapGetters(["getUsersDecks"]),
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 175px);
  place-content: center;
  place-items: center;
  width: 100%;
}

.create-deck-button {
  background-color: var(--primary-color);
  border-radius: 10px;
  border: none;
  color: var(--primary-text-color);
  cursor: pointer;
  display: block;
  font-size: 28px;
  height: 150px;
  outline: none;
  padding: 15px;
  transition: 0.5s;
  width: 205px;
}

.random-deck-button {
  background-color: var(--secondary-color);
  border-radius: 8px;
  border: none;
  color: var(--secondary-text-color);
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 15px;
  outline: none;
  transition: 0.5s;
  width: 205px;
}

.create-deck-button:hover,
.random-deck-button:hover {
  transform: scale(1.1);
}

.decksHub {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
}
</style>
