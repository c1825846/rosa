<template>
  <div class="popup" :class="{'popup--opened':isOpened}">
    <div class="popup__title">
      Добавление в корзину
    </div>
    <div class="popup__body">
      <div class="popup__button" @click="dec">
        <div class="popup__icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
          </svg>
        </div>
      </div>
      <input type="number" class="popup__input" v-model="quantity">
      <div class="popup__button" @click="inc">
        <div class="popup__icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </div>
    </div>
    <div class="popup__buttons">
      <button class="popup__button" @click="add">Добавить</button>
      <button class="popup__button" @click="close">Отмена</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpened: Boolean
  },
  name: "AddGoodPopup",
  data() {
    return {
      quantity: 1,
    }
  },
  methods: {
    dec(){
      this.quantity--
      if (this.quantity <= 0) {
        this.close()
      }
    },
    inc(){
      this.quantity++
    },
    close() {
      this.quantity = 1
      this.$emit('close')
    },
    add(){
      this.$emit('add', this.quantity)
      this.quantity = 1
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
  background: white;
  border: 1px solid #000;
  padding: 20px;
  &__title{
    margin-bottom: 10px;
  }
  &__body{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 20px;
  }
  &__icon{
    width: 30px;
    height: 30px;
    svg {
      path {
        stroke-width: 1.5;
      }
    }
  }
  &__input{
    width: 40px;
  }
  &__button{
    display: grid;
    place-items: center;
    cursor: pointer;
  }
  &__buttons{
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  &__buttons &__button{
    padding: 2px 8px;
  }
  &--opened {
    display: block;
  }
}
</style>