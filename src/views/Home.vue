<template>
  <div class="home">
    <button class="create-deck-button" @click="goToNewDeckView">
      Create new deck
    </button>
    <button class="random-deck-button" @click="randomDeck">
      New random deck
    </button>

    <div class="outDecksHub">
      <section class="decksHub">
        <template v-for="(deck, index) in getUsersDecks">
          <Deck
            :key="index"
            :deckCards="deck"
            :index="index"
            @callViewDeck="viewDeck($event)"
          />
        </template>
      </section>
    </div>
  </div>
</template>

<script>
import Deck from "@/components/Deck";
import { scryFallRandomCard } from "@/services/scryfall";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  methods: {
    ...mapActions(["addCardToTmpDeck", "addTextError"]),
    goToNewDeckView() {
      this.$router.push("/new-deck");
    },
    async randomDeck() {
      const minQtyCard = 60;
      this.$store.commit("changeTmpDeck", []);
      this.$store.commit("changeGlobalLoading", true);
      this.$store.commit("changeAmountTrack", { cards: 0, minQtyCard });

      try {
        while (this.tmpDeck.length < minQtyCard) {
          const { data } = await scryFallRandomCard();

          if (data.image_uris == undefined) continue;

          this.addCardToTmpDeck(data);
          this.$store.commit("changeAmountTrack", {
            cards: this.tmpDeck.length,
            minQtyCard,
          });
        }
      } catch {
        this.addTextError("Error fetching random card");
        this.$store.commit("changeGlobalLoading", false);
        this.$store.commit("changeAmountTrack", { cards: 0, minQtyCard: 0 });
        this.$store.commit("changeTmpDeck", []);
        return;
      }

      let userDecks = this.getUsersDecks;
      const newDecks = [...userDecks, this.tmpDeck];

      this.$store.commit("changeUsersDecks", newDecks);
      this.$store.commit("changeGlobalLoading", false);
      this.$store.commit("changeAmountTrack", { cards: 0, minQtyCard: 0 });
      this.$store.commit("changeTmpDeck", []);
    },
    viewDeck(index) {
      this.$router.push({ name: "ViewDeck", params: { id: index + 1 } });
    },
  },
  components: { Deck },
  computed: {
    ...mapGetters({
      tmpDeck: "getTmpDeck",
      getUsersDecks: "getUsersDecks",
    }),
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

.create-deck-button,
.random-deck-button {
  border-radius: 8px;
  border: none;
  cursor: pointer;
  outline: none;
  transition: 0.5s;
  width: 205px;
}

.create-deck-button {
  background-color: var(--primary-color);
  color: var(--primary-text-color);
  font-size: 28px;
  height: 150px;
}

.random-deck-button {
  background-color: var(--secondary-color);
  color: var(--secondary-text-color);
  font-size: 18px;
  height: 50px;
  margin-top: 15px;
}

.create-deck-button:hover,
.random-deck-button:hover {
  transform: scale(1.1);
}

.outDecksHub {
  align-items: center;
  bottom: 5px;
  display: flex;
  justify-content: center;
  left: 50%;
  position: fixed;
  transform: translate(-50%);
  width: 100%;
}

.decksHub {
  display: flex;
  margin: 0 auto;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 10px;
  width: auto;
}

@media screen and (max-height: 580px) {
  .home {
    display: flex;
    flex-direction: row;
    place-content: flex-end;
    place-items: flex-start;
  }

  .create-deck-button {
    font-size: 18px;
    height: 50px;
    width: 175px;
  }

  .random-deck-button {
    margin: 0 10px;
    width: 175px;
  }
}
</style>
