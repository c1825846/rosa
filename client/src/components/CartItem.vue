<template>
  <div class="item">
    <div class="item__code">
      {{ good.good.code }}
    </div>
    <div class="item__title">
      {{ good.good.title }}
    </div>
    <div class="item__marks">

    </div>
    <div class="item__price">
      {{ good.good.price }}
    </div>
    <div class="item__button item__button--dec" @click="dec">
      <div class="item__button-icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6"/>
        </svg>
      </div>
    </div>
    <div class="item__quantity">
      {{ good.quantity }}
    </div>
    <div class="item__button item__button--inc" @click="inc">
      <div class="item__button-icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
      </div>
    </div>
    <div class="item__sum">
      {{ sum }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    good: Object,
  },
  data() {
    return {
    }
  },
  computed: {
    sum() {
      return Math.trunc(this.good.good.price * this.good.quantity * 100) / 100
    }
  },
  methods: {
    inc() {
      this.$store.commit('incGood', this.good.good.code)
    },
    dec() {
      this.$store.commit('decGood', this.good.good.code)
    },
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: grid;
  grid-template-columns: 60px 1fr 100px 100px 100px 100px 100px 100px;
  border-bottom: 1px solid #000;
  min-height: 28px;

  &__code {
    border-right: 1px solid gray;
  }

  &__title {
    border-right: 1px solid gray;
  }

  &__marks {
    border-right: 1px solid gray;
  }

  &__quantity {
    border-right: 1px solid gray;
  }

  &__price {
    border-right: 1px solid gray;
  }

  &__sum {
  }

  &__button {
    display: grid;
    place-items: center;
    cursor: pointer;

    &--inc {
      border-right: 1px solid gray;
    }

    &--dec {
      border-right: 1px solid gray;
    }

    &-icon {
      width: 24px;
      height: 24px;

      svg {
        path {
          stroke-width: 1.5;
        }
      }

    }

    &:hover &-icon {
      svg {
        path {
          stroke-width: 2;
        }
      }
    }
  }
}
</style>