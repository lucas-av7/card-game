<template>
  <div class="view-deck">
    <h2>Deck: {{ id }}</h2>
    <section class="cards">
      <img
        v-for="(card, index) in getUsersDecks[id - 1]"
        :key="index"
        :src="card.image_uris.normal"
        :alt="card.name"
      />
    </section>
    <div class="deck-status">
      <p>Total cards: {{ totalCards }}</p>
      <p>Basic land cards: {{ basicLandCards }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ViewDeck",
  props: ["id"],
  computed: {
    ...mapGetters(["getUsersDecks"]),
    basicLandCards() {
      let count = 0;
      this.getUsersDecks[this.id - 1].map((card) => {
        if (card.type_line.includes("Basic Land")) count += 1;
      });
      return count;
    },
    totalCards() {
      return this.getUsersDecks[this.id - 1].length;
    },
  },
};
</script>

<style>
.view-deck {
  width: 100%;
}

.view-deck h2 {
  color: var(--secondary-color);
  text-align: center;
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
  border-radius: 10px;
  margin: 10px 0;
  width: 210px;
}

.deck-status {
  margin: 10px;
}
</style>
