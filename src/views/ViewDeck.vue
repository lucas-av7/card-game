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
      <div>
        <p>Total cards: {{ totalCards }}</p>
        <p>Basic land cards: {{ basicLandCards }}</p>
      </div>
      <button class="delete-deck" @click="showModal = true">Delete deck</button>
    </div>

    <ModalConfirmation
      v-if="showModal"
      @close="showModal = false"
      @confirm="deleteDeck"
      msg="Delete deck?"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalConfirmation from "@/components/ModalConfirmation";

export default {
  name: "ViewDeck",
  data() {
    return {
      showModal: false,
    };
  },
  components: { ModalConfirmation },
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
  methods: {
    deleteDeck() {
      this.$router.push("/");
      this.$store.dispatch("removeDeck", this.id - 1);
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
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

.delete-deck {
  background-color: var(--danger);
  border-radius: 5px;
  border: none;
  color: var(--primary-text-color);
  cursor: pointer;
  font-size: 15px;
  height: 40px;
  outline: none;
  transition: 0.5s;
  width: 125px;
}

.delete-deck:hover {
  filter: brightness(1.15);
}
</style>
