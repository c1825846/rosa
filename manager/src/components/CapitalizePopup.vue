<template>
  <div class="popup" :class="{'popup--opened':isOpened}">
    <div class="popup__title">Добавление товара на склад</div>
    <div class="popup__body">
      <input type="number" v-model="quantity">
    </div>
    <div class="popup__buttons">
      <button class="popup__button" @click="add">Добавить</button>
      <button class="popup__button" @click="close">Отмена</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddGoodPopup",
  props: {
    isOpened: Boolean
  },
  data(){
    return {
      quantity: 0,
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.quantity = 0
    },
    add() {
      this.$emit('add', this.quantity)
      this.quantity = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000;
  padding: 20px;
  background: white;

  &--opened {
    display: block;
  }

  &__title {
    margin-bottom: 10px;
  }

  &__body {
    margin-bottom: 10px;
    input {
      padding: 4px 8px;
      font-size: 18px;
      border: 1px solid #000;
    }
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  &__button {
    padding: 4px 10px;
    cursor: pointer;
  }
}
</style>