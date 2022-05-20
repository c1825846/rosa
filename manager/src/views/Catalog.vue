<template>
  <div class="catalog">
    <div class="catalog__buttons">
      <button
          class="catalog__button"
          @click="showAddGoodPopup"
      >
        Добавить Товар
      </button>
      <button
          class="catalog__button"
          @click="showCategoryPopup"
      >
        Добавить Категорию
      </button>
      <button
          class="catalog__button"
          @click="showSubcategoryPopup"
      >
        Добавить Подкатегорию
      </button>
    </div>
    <div class="catalog__body">
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
          <div class="catalog__cell">
            Картинка
          </div>
          <div class="catalog__cell">
            Код
          </div>
          <div class="catalog__cell">
            Наименование
          </div>
          <div class="catalog__cell">
            Цена
          </div>
          <div class="catalog__cell">
            Остаток на складе
          </div>
          <div class="catalog__cell">
            Добавить на склад
          </div>
        </div>
        <div class="catalog__row" v-for="good in filteredGoods">
          <div class="catalog__cell">
            <div class="catalog__image">
              <img :src="good.imagePath" alt="">
            </div>
          </div>
          <div class="catalog__cell">
            {{ good.code }}
          </div>
          <div class="catalog__cell">
            {{ good.title }}
          </div>
          <div class="catalog__cell">
            {{ good.price }}
          </div>
          <div class="catalog__cell">
            {{ good.quantity }}
          </div>
          <div class="catalog__cell">
            <div class="catalog__button" @click="showCapitalizePopup(good.code)">
              <div class="catalog__icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddGoodPopup
        :is-opened="isGoodPopupOpened"
        @close="closeAddGoodPopup"
        @add="addGood($event)"
    />
    <AddCategoryPopup
        :is-opened="isCategoryPopupOpened"
        @close="closeAddCategoryPopup"
        @add="addCategory($event)"
    />
    <AddSubcategoryPopup
        :is-opened="isSubcategoryPopupOpened"
        @close="closeAddSubcategoryPopup"
        @add="addSubcategory($event)"
    />
    <CapitalizePopup
        :is-opened="isCapitalizePopupOpened"
        @close="closeCapitalizePopup"
        @add="capitalize($event)"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import AddGoodPopup from "@/components/AddGoodPopup";
import AddCategoryPopup from "@/components/AddCategoryPopup";
import AddSubcategoryPopup from "@/components/AddSubcategoryPopup";
import CapitalizePopup from "@/components/CapitalizePopup";

export default {
  name: 'Home',
  components: {
    AddGoodPopup,
    AddCategoryPopup,
    AddSubcategoryPopup,
    CapitalizePopup
  },
  data() {
    return {
      isCategoryPopupOpened: false,
      isSubcategoryPopupOpened: false,
      isGoodPopupOpened: false,
      isCapitalizePopupOpened: false,
      goodCodeToCapitalize: null,
      selectedCategory: null,
      selectedSubcategory: null,
    }
  },
  computed: {
    allGoods() {
      return this.$store.getters.goods
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
    showCategoryPopup() {
      this.isCategoryPopupOpened = true
    },
    closeAddCategoryPopup() {
      this.isCategoryPopupOpened = false
    },
    addCategory(event) {
      fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({category: event})
      })
      this.isCategoryPopupOpened = false
      this.$store.dispatch('fetchCategories')
    },
    showSubcategoryPopup() {
      this.isSubcategoryPopupOpened = true
    },
    closeAddSubcategoryPopup() {
      this.isSubcategoryPopupOpened = false
    },
    addSubcategory(event) {
      fetch('/api/subcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
      this.isSubcategoryPopupOpened = false
      this.$store.dispatch('fetchSubcategories')
    },
    showAddGoodPopup() {
      this.isGoodPopupOpened = true
    },
    closeAddGoodPopup() {
      this.isGoodPopupOpened = false
    },
    async addGood(event) {
      let formData = new FormData()
      formData.append('code', event.code)
      formData.append('title', event.title)
      formData.append('price', event.price)
      formData.append('category', event.category)
      formData.append('subcategory', event.subcategory)
      formData.append('image', event.image)
      let response = await fetch('/api/goods', {
        method: 'POST',
        body: formData,
      })
      await this.$store.dispatch('fetchGoods')
      this.isGoodPopupOpened = false
    },
    closeCapitalizePopup() {
      this.isCapitalizePopupOpened = false
    },
    showCapitalizePopup(code) {
      this.goodCodeToCapitalize = code
      this.isCapitalizePopupOpened = true
    },
    async capitalize(quantity) {
      let response = await fetch('/api/capitalize', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          goodCode:this.goodCodeToCapitalize, quantity
        })
      })
      await this.$store.dispatch('fetchGoods')
      this.isCapitalizePopupOpened = false
      this.goodCodeToCapitalize = null
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
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  &__body {
    display: grid;
    grid-template-columns: 300px 1fr;
    height: 100%;
  }

  &__list {
    border-left: 1px solid gray;
  }

  &__row {
    height: 80px;
    display: grid;
    grid-template-columns: 100px 100px 1fr 100px 100px 100px;
    border-bottom: 1px solid #000;
    &--title {
      height: 40px;
      font-size: 14px;
      text-align: center;
      font-weight: 700;
    }
  }

  &__cell {
    &:not(:last-child) {
      border-right: 1px solid gray;
    }
  }

  &__image {
    width: 50px;
    height: 50px;

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
  }

  &__button:hover &__icon {
    svg {
      path {
        stroke-width: 2;
      }
    }
  }

  &__buttons {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #000;
    height: 40px;
  }

  &__buttons &__button {
    padding: 10px;
    width: auto;
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
</style>