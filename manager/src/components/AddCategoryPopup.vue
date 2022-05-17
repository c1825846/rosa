<template>
  <div class="popup" :class="{'popup--opened':isOpened}">
    <div class="popup__title">Добавление категории</div>
    <div class="popup__body">
      <input type="text" v-model="category">
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
      category: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.category = ''
    },
    add() {
      this.$emit('add', this.category)
      this.category = ''
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