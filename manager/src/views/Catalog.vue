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
          <div class="catalog__cell">
            Удалить
          </div>
        </div>
        <div class="catalog__row" v-for="good in filteredGoods">
          <div class="catalog__cell">
            <div class="catalog__image">
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
          <div class="catalog__cell catalog__cell--text-center">
            {{ good.quantity }}
          </div>
          <div class="catalog__cell">
            <div class="catalog__button" @click="showCapitalizePopup(good.code)">
              <div class="catalog__icon">
                <img src="@/assets/add.png" alt="">
              </div>
            </div>
          </div>
          <div class="catalog__cell">
            <div class="catalog__button" @click="deleteGood(good.code)">
              <div class="catalog__icon">
                <img src="@/assets/delete.png" alt="">
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
    <UploadCatalogPopup
        :is-opened="isUploadCatalogPopupOpened"
        @close="closeUploadCatalogPopup"
        @add="uploadCatalog($event)"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import AddGoodPopup from "@/components/AddGoodPopup";
import AddCategoryPopup from "@/components/AddCategoryPopup";
import AddSubcategoryPopup from "@/components/AddSubcategoryPopup";
import CapitalizePopup from "@/components/CapitalizePopup";
import UploadCatalogPopup from "@/components/UploadCatalogPopup";

export default {
  name: 'Home',
  components: {
    AddGoodPopup,
    AddCategoryPopup,
    AddSubcategoryPopup,
    CapitalizePopup,
    UploadCatalogPopup
  },
  data() {
    return {
      isCategoryPopupOpened: false,
      isSubcategoryPopupOpened: false,
      isGoodPopupOpened: false,
      isCapitalizePopupOpened: false,
      isUploadCatalogPopupOpened: false,
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
      if (quantity <= 0) {
        this.$root.$emit('notification', 'Невозможно добавить отрицательное число товаров')
        return
      }
      let response = await fetch('/api/capitalize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          goodCode: this.goodCodeToCapitalize, quantity
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
    deleteGood(event) {
      fetch(`/api/good/${event}`, {
        method: 'DELETE',
      }).then(response => response.json()).then(data => {
        this.$store.dispatch('fetchGoods')
        this.$root.$emit('notification', 'Товар удалён')
      })
    },
    closeUploadCatalogPopup() {
      this.isUploadCatalogPopupOpened = false
    },
    showUploadCatalogPopup() {
      this.isUploadCatalogPopupOpened = true
    },
    uploadCatalog(event) {
      console.log(event)
      this.isUploadCatalogPopupOpened = false
    }
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
    grid-template-columns: 100px 100px 1fr 100px 100px 100px 100px;
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
    &--text-center {
      text-align: center;
    }
  }

  &__image {
    width: 99px;
    height: 79px;

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

  &__buttons {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #000;
    height: 40px;
  }

  &__buttons &__button {
    padding: 10px;
    width: auto;
    background: #33a233;
    border: 1px solid #000;
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