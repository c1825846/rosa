<template>
  <div class="cart">
    <div class="cart__title-row">
      <div class="cart__title-cell">Код</div>
      <div class="cart__title-cell">Наименование</div>
      <div class="cart__title-cell">Метки</div>
      <div class="cart__title-cell">Цена</div>
      <div class="cart__title-cell">Убавить</div>
      <div class="cart__title-cell">Количество</div>
      <div class="cart__title-cell">Добавить</div>
      <div class="cart__title-cell">Сумма</div>
    </div>
    <div class="cart__list">
      <CartItem/>
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/CartItem";

export default {
  name: "Cart",
  components: {
    CartItem,
  }
}
</script>

<style lang="scss" scoped>
.cart {
  &__title {
    &-row {
      display: grid;
      grid-template-columns: 60px 1fr 100px 100px 100px 100px 100px 100px;
      border-bottom: 1px solid #000;
      min-height: 28px;
      font-weight: 700;
    }

    &-cell {
      display: grid;
      place-items: center;
      &:not(:last-child){
        border-right: 1px solid gray;
      }
    }
  }
}
</style>