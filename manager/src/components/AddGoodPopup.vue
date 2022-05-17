<template>
  <div class="popup" :class="{'popup--opened':isOpened}">
    <div class="popup__title">Добавление в каталог</div>
    <div class="popup__body">
      <div class="popup__input-wrapper">
        <div class="popup__label">
          Код
        </div>
        <input type="number" v-model="code">
      </div>
      <div class="popup__input-wrapper">
        <div class="popup__label">
          Наименование
        </div>
        <input type="text" v-model="title">
      </div>
      <div class="popup__input-wrapper">
        <div class="popup__label">
          Цена
        </div>
        <input type="number" v-model="price">
      </div>
      <div class="popup__input-wrapper">
        <div class="popup__label">
          Категория
        </div>
        <select v-model="category">
          <option value="">
            Без категории
          </option>
          <option v-for="category in $store.getters.categories">
            {{ category.category }}
          </option>
        </select>
      </div>
      <div class="popup__input-wrapper" v-if="category !== ''">
        <div class="popup__label">
          Подкатегория
        </div>
        <select v-model="subcategory">
          <option value="">
            Без подкатегории
          </option>
          <option v-for="category in $store.getters.subcategories.filter(item => item.parent === category)">
            {{ category.subcategory }}
          </option>
        </select>
      </div>
      <div class="popup__input-wrapper">
        <div class="popup__label">
          Картинка
        </div>
        <input type="file" @change="handleFileInput($event)">
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
  name: "AddGoodPopup",
  props: {
    isOpened: Boolean
  },
  data() {
    return {
      code: 0,
      title: '',
      price: '',
      category: '',
      subcategory: '',
      image: null,
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.clearForm()
    },
    add() {
      this.$emit('add', {
        code: this.code,
        title: this.title,
        price: this.price,
        category: this.category,
        subcategory: this.subcategory,
        image: this.image,
      })
      this.clearForm()
    },
    handleFileInput(event) {
      this.image = event.target.files[0]
    },
    clearForm() {
      this.code = 0
      this.title = ''
      this.price = ''
      this.category = ''
      this.subcategory = ''
      this.image = null
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

  &__body{
    margin-bottom: 10px;
  }

  &__input-wrapper{
    margin-bottom: 10px;
    input, select{
      width: 100%;
      font-size: 18px;
      border: 1px solid #000;
      padding: 6px 10px;
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