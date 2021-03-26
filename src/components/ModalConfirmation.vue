<template>
  <div class="modal-confirmation">
    <div class="overlay" @click="$emit('close')"></div>
    <div class="modal-box">
      <p>{{ msg }}</p>
      <div class="buttons">
        <button class="cancel" @click="$emit('close')">Cancel</button>
        <button class="confirm" @click="$emit('confirm')">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalConfirmation",
  props: ["msg"],
};
</script>

<style scoped>
.modal-confirmation,
.overlay {
  left: 0;
  top: 0;
  width: 100%;
}

.modal-confirmation {
  height: 100vh;
  position: fixed;
}

.overlay {
  background-color: #000000bb;
  height: 100%;
  position: absolute;
}

.modal-box {
  align-items: center;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  height: 155px;
  justify-content: space-around;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
}

.modal-box p {
  color: var(--secondary-text-color);
  font-size: 25px;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.buttons button {
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  height: 40px;
  outline: none;
  transition: 0.5s;
  width: 125px;
}

.buttons button:hover {
  filter: brightness(1.15);
}

.buttons button:first-child {
  background-color: #ccc;
  color: var(--secondary-text-color);
}

.buttons button:last-child {
  background-color: var(--confirm);
}
</style>
