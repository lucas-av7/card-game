<template>
  <div class="deck">
    <img :src="deckCards[0].image_uris.png" :alt="deckCards[0].name" />
    <img :src="deckCards[1].image_uris.png" :alt="deckCards[1].name" />
    <img :src="deckCards[2].image_uris.png" :alt="deckCards[2].name" />
  </div>
</template>

<script>
export default {
  name: "Deck",
  props: ["deckCards"],
};
</script>

<style scoped>
.deck {
  cursor: pointer;
  display: flex;
  margin: 0 35px;
  position: relative;
  transition: 0.5s;
  width: 110px;
}

.deck:hover {
  transform: scale(1.1);
}

.deck img {
  bottom: 0;
  position: absolute;
  transform-origin: 50% 100%;
  transition: 0.5s;
  width: 100%;
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
