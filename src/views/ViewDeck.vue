<template>
  <div class="view-deck">
    <h2>Deck: {{ id }}</h2>
    <section class="cards">
      <div
        class="card-box"
        v-for="(card, index) in getUsersDecks[id - 1]"
        :key="index"
      >
        <p>{{ card.amount }}</p>
        <img :src="card.image_uris.normal" :alt="card.name" />
      </div>
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

<style scoped>
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

.card-box {
  position: relative;
  width: auto;
}

.cards p {
  background-color: var(--primary-color);
  border-radius: 50%;
  color: var(--primary-text-color);
  font-size: 14px;
  height: 30px;
  left: 50%;
  line-height: 30px;
  position: absolute;
  text-align: center;
  top: -7px;
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
  margin: 5px;
  width: 210px;
  z-index: 1;
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

@media screen and (max-width: 440px) {
  .cards img {
    height: 244px;
    margin: 5px 2px;
    width: 175px;
  }
}
</style>
