<template>
  <div class="popup" :class="{'popup--opened':isOpened}">
    <div class="popup__title">Добавление подкатегории</div>
    <div class="popup__body">
      Название
      <input type="text" v-model="subcategory">
      Родительская категория
      <br>
      <select v-model="parent">
        <option v-for="category in $store.getters.categories">
          {{ category.category }}
        </option>
      </select>
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
  data() {
    return {
      subcategory: '',
      parent: '',
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.subcategory = ''
      this.parent = ''
    },
    add(){
      this.$emit('add', {subcategory: this.subcategory, parent: this.parent})
      this.subcategory = ''
      this.parent = ''
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
  &--opened{
    display: block;
  }
  &__title{
    margin-bottom: 10px;
  }
  &__body{
    margin-bottom: 10px;
    input {
      display: block;
      margin-bottom: 10px;
      padding: 4px 8px;
      font-size: 18px;
      border: 1px solid #000;
    }
    select{
      padding: 4px 8px;
      font-size: 18px;
      border: 1px solid #000;
      width: 100%;
    }
  }
  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  &__button {
    padding: 4px 10px;
  }
}
</style>