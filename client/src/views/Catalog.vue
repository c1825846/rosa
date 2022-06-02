<template>
  <div class="catalog">
    <div class="catalog__menu menu">
      <div class="menu__category">
        <div class="menu__category-header" @click="clearCategory">
          <div class="menu__category-title">
            Все товары
          </div>
        </div>
      </div>
      <div
          class="menu__category"
          v-for="category in $store.getters.categories"
      >
        <div class="menu__category-header"
             :class="{'menu__category-header--selected': category === selectedCategory}"
             @click="selectCategory(category)">
          <div class="menu__category-title">
            {{ category.category }}
          </div>
        </div>
        <div class="" v-if="category === selectedCategory">
          <div
              class="menu__subcategory"
              :class="{'menu__subcategory--selected': subcategory === selectedSubcategory}"
              v-for="subcategory in $store.getters.subcategories.filter(item => item.parent === category.category)"
              @click="selectSubcategory(subcategory)"
          >
            {{ subcategory.subcategory }}
          </div>
        </div>
      </div>
    </div>
    <div class="catalog__list">
      <div class="catalog__row catalog__row--title">
        <div class="catalog__cell">Картинка</div>
        <div class="catalog__cell">Код</div>
        <div class="catalog__cell">Наименование</div>
        <div class="catalog__cell">Цена, руб.</div>
        <div class="catalog__cell">Добавить</div>
      </div>
      <div class="catalog__row" v-for="good in filteredGoods">
        <div class="catalog__cell">
          <div class="catalog__image" @click.stop="openedImage=good.imagePath">
            <img :src="good.imagePath" alt="">
          </div>
        </div>
        <div class="catalog__cell catalog__cell--text-center">
          {{ good.code }}
        </div>
        <div class="catalog__cell">
          {{ good.title }}
        </div>
        <div class="catalog__cell catalog__cell--text-center">
          {{ good.price }}
        </div>
        <div class="catalog__cell">
          <div class="catalog__button" @click="openPopup(good)">
            <div class="catalog__icon">
              <img src="@/assets/addToCart.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddGoodPopup
        :is-opened="popupOpened"
        @close="closePopup"
        @add="addGood($event)"/>
    <ImagePopup
      v-if="openedImage"
      :src="openedImage"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import AddGoodPopup from "@/components/AddGoodPopup";
import ImagePopup from "@/components/ImagePopup";

export default {
  name: 'Home',
  components: {
    AddGoodPopup,
    ImagePopup,
  },
  data() {
    return {
      goods: [],
      popupOpened: false,
      selectedGood: null,
      selectedCategory: null,
      selectedSubcategory: null,
      openedImage: '',
    }
  },
  computed: {
    allGoods() {
      return this.$store.getters.goods.filter(good => {
        return good.quantity > 0
      })
    },
    filteredGoods() {
      if (this.selectedCategory && !this.selectedSubcategory) {
        return this.allGoods.filter(good => good.category === this.selectedCategory.category)
      } else if (this.selectedSubcategory) {
        return this.allGoods.filter(good => good.subcategory === this.selectedSubcategory.subcategory)
      } else {
        return this.allGoods
      }
    }
  },
  methods: {
    openPopup(good) {
      this.popupOpened = true
      this.selectedGood = good

    },
    closePopup() {
      this.popupOpened = false
    },
    addGood(event) {
      this.$store.commit('addGood', {
        good: this.selectedGood,
        quantity: event,
      })
      this.popupOpened = false
    },
    selectSubcategory(event) {
      this.selectedSubcategory = event
    },
    clearCategory() {
      this.selectedCategory = null
      this.selectedSubcategory = null
    },
    selectCategory(event) {
      if (event === this.selectedCategory) {
        this.selectedCategory = null
        this.selectedSubcategory = null
      } else {
        this.selectedCategory = event
        this.selectedSubcategory = null
      }
    },
  },
  created() {
    this.$store.dispatch('fetchGoods')
  },
  watch: {
    openedImage(newValue, oldValue) {
      if (newValue !== '') {
        document.body.addEventListener('click', e => {
          this.openedImage = ''
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  display: grid;
  grid-template-columns: 300px 1fr;

  &__list {
    border-left: 1px solid gray;
  }

  &__row {
    height: 80px;
    display: grid;
    grid-template-columns: 100px 60px 1fr 100px 100px;
    border-bottom: 1px solid #000;
    &--title {
      height: 30px;
      font-weight: 700;
    }
  }

  &__cell {
    &:not(:last-child) {
      border-right: 1px solid gray;
    }
    &--text-center {
      text-align: center;
    }
  }

  &__row--title &__cell {
    display: grid;
    place-items: center;
  }

  &__image {
    width: 99px;
    height: 79px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__button {
    cursor: pointer;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;

  }

  &__icon {
    width: 30px;
    height: 30px;

    svg {
      path {
        stroke-width: 1.5;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__button:hover &__icon {
    svg {
      path {
        stroke-width: 2;
      }
    }
  }

  .menu {
    &__category {
      cursor: pointer;

      &-header {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #000;
        font-weight: 700;
        &--selected {
          background: #e7e7e7;
        }
      }

      &-open {
        padding-right: 10px;
      }
    }

    &__subcategory {
      cursor: pointer;
      padding: 10px 10px 10px 30px;
      border-bottom: 1px solid #000;
      &--selected {
        background: #f5f5f5;
      }
    }
  }
}
</style>