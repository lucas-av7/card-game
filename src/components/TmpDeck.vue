<template>
  <div class="tmp-deck">
    <section class="cards">
      <template v-for="(card, index) in tmpDeck">
        <div class="card-box" v-for="x in card.amount" :key="x + card.id">
          <img :src="card.image_uris.normal" :alt="card.name" />
          <button class="remove-card-buttom" @click="removeCard(index)">
            &ndash;
          </button>
        </div>
      </template>
    </section>
    <section class="status-deck">
      <p>Total cards: {{ totalCards }}/60</p>
      <button class="save-deck" :disabled="totalCards < 60" @click="saveDeck">
        Save
      </button>
      <button class="cancel-deck" @click="cancelDeck">Cancel</button>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TmpDeck",
  props: ["editId"],
  computed: {
    ...mapGetters({ tmpDeck: "getTmpDeck" }),
    totalCards() {
      let count = 0;
      this.tmpDeck.map((card) => {
        count = count + card.amount;
      });
      return count;
    },
  },
  methods: {
    saveDeck() {
      let userDecks = this.$store.getters.getUsersDecks;
      const newDeck = [...userDecks];

      if (this.editId) {
        newDeck[this.editId - 1] = this.tmpDeck;
      } else {
        newDeck.push(this.tmpDeck);
      }

      this.$store.commit("changeUsersDecks", newDeck);
      this.$store.commit("changeTmpDeck", []);
      this.$router.push("/");
    },
    cancelDeck() {
      this.$store.commit("changeTmpDeck", []);
      this.$router.push("/");
    },
    removeCard(index) {
      this.$store.dispatch("removeCardFromTmpDeck", index);
    },
  },
};
</script>

<style scoped>
.tmp-deck {
  background-color: var(--primary-color);
  bottom: 0;
  box-shadow: 0 -7px 5px 2px rgba(0, 0, 0, 0.4);
  display: flex;
  height: 205px;
  justify-content: center;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 9;
}

.cards {
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: flex-start;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
}

.card-box {
  animation: up-card 0.5s ease-in-out;
  height: 160px;
  margin-left: -90px;
  position: relative;
  transform: rotateZ(-10deg) rotateY(-60deg);
  transition: 0.5s;
  width: auto;
}

.card-box:first-child {
  margin-left: 0px;
}

.card-box:hover {
  margin-left: -70px;
  margin-right: 75px;
  transform: rotateZ(0deg) rotateY(0deg);
  z-index: 10;
}

.card-box:hover img {
  box-shadow: 0px 0px 7px 7px #f0e68caa;
}

.card-box:first-child:hover {
  margin-left: 10px;
}

.card-box:hover .remove-card-buttom {
  display: block;
}

.card-box img {
  border-radius: 10px;
  box-shadow: -4px 0 0 0 rgba(0, 0, 0, 0.4);
  height: 160px;
  width: 115px;
}

.card-box .remove-card-buttom {
  background-color: var(--danger);
  border-radius: 50%;
  border: none;
  bottom: 0;
  color: var(--secondary-text-color);
  cursor: pointer;
  display: none;
  font-size: 20px;
  height: 25px;
  left: 50%;
  outline: none;
  position: absolute;
  transform: translate(-50%);
  width: 25px;
  z-index: 11;
}

.status-deck {
  text-align: center;
  align-items: center;
  border-left: 3px solid var(--secondary-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 175px;
}

.status-deck button {
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  height: 40px;
  outline: none;
  transition: 0.5s;
  width: 95px;
}

.status-deck button:hover {
  filter: brightness(1.15);
}

.status-deck .save-deck {
  background-color: var(--confirm);
  margin: 10px 0;
}

.status-deck .cancel-deck {
  background-color: #ccc;
  color: var(--secondary-text-color);
}

.status-deck button:disabled {
  cursor: not-allowed;
  opacity: 0.2;
}

.status-deck button:disabled:hover {
  filter: none;
}

@media screen and (max-height: 450px) {
  .tmp-deck {
    height: 150px;
  }

  .card-box {
    height: 110px;
    margin-left: -60px;
  }

  .card-box:hover {
    margin-left: -55px;
    margin-right: 45px;
  }

  .card-box img {
    border-radius: 10px;
    box-shadow: -4px 0 0 0 rgba(0, 0, 0, 0.4);
    height: 110px;
    width: 79px;
  }
}
</style>
