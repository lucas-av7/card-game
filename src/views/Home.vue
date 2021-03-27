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
import { mapGetters } from "vuex";

export default {
  name: "Home",
  methods: {
    goToNewDeckView() {
      this.$router.push("/new-deck");
    },
    async randomDeck() {
      const minQtyCard = 60;
      let cards = 0;
      let deck = [];

      this.$store.commit("changeGlobalLoading", true);
      this.$store.commit("changeAmountTrack", { cards, minQtyCard });

      try {
        while (cards < minQtyCard) {
          const { data } = await scryFallRandomCard();

          if (data.image_uris == undefined) continue;

          const isBasicLand = data.type_line.includes("Basic Land");

          let sameCard = 0;
          let indexSameCard = 0;

          deck.map((card, index) => {
            if (card.id == data.id) {
              sameCard = deck[index].amount;
              indexSameCard = index;
            }
          });

          if (sameCard) {
            if (isBasicLand || sameCard < 4) {
              deck[indexSameCard].amount += 1;
              cards += 1;
              this.$store.commit("changeAmountTrack", { cards, minQtyCard });
              continue;
            } else {
              continue;
            }
          }

          const card = {
            object: data.object,
            id: data.id,
            name: data.name,
            image_uris: data.image_uris,
            type_line: data.type_line,
            amount: 1,
          };

          cards += 1;
          this.$store.commit("changeAmountTrack", { cards, minQtyCard });

          deck.push(card);
        }

        let userDecks = this.$store.getters.getUsersDecks;
        const newDeck = [...userDecks, deck];

        this.$store.commit("changeUsersDecks", newDeck);
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      this.$store.commit("changeGlobalLoading", false);
      this.$store.commit("changeAmountTrack", { cards: 0, minQtyCard: 0 });
    },
    viewDeck(index) {
      this.$router.push({ name: "ViewDeck", params: { id: index + 1 } });
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
</style>
