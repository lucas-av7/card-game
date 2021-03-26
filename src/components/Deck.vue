<template>
  <div class="deck" @click="$emit('callViewDeck', index)">
    <img :src="deckCards[0].image_uris.small" :alt="deckCards[0].name" />
    <img :src="deckCards[1].image_uris.small" :alt="deckCards[1].name" />
    <img :src="deckCards[2].image_uris.small" :alt="deckCards[2].name" />
  </div>
</template>

<script>
export default {
  name: "Deck",
  props: ["deckCards", "index"],
};
</script>

<style scoped>
.deck {
  cursor: pointer;
  transition: 0.5s;
  min-width: 190px;
  height: 215px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deck:hover {
  transform: scale(1.1);
}

.deck img {
  border-radius: 5px;
  position: absolute;
  transform-origin: 50% 100%;
  transition: 0.5s;
  width: 125px;
}

.deck img:first-child {
  transform: rotateZ(-5deg);
  z-index: 1;
}

.deck img:nth-child(2) {
  z-index: 2;
}

.deck img:last-child {
  transform: rotateZ(5deg);
  z-index: 3;
}

.deck:hover img:first-child {
  transform: rotateZ(-10deg);
}

.deck:hover img:last-child {
  transform: rotateZ(10deg);
}
</style>
