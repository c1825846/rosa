<template>
  <div class="app">
    <div class="app__nav nav">
      <router-link to="/" class="nav__link">
        <div class="nav__link-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
               stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        </div>
        Каталог
      </router-link>
      <router-link to="/cart" class="nav__link">
        <div class="nav__link-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        Заявки
      </router-link>
      <router-link to="/discounts" class="nav__link">
        <div class="nav__link-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        Акции
      </router-link>
      <router-link to="/login" class="nav__link">
        <div class="nav__link-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
               stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
        </div>
        Выход
      </router-link>
    </div>
    <router-view class="app__main"/>
    <div class="app__footer">
      В корзине <b>6</b> наименований на сумму <b>23000</b> рублей
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('fetchGoods')
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchSubcategories')
  }
}
</script>

<style lang="scss">
*, *:after, *:before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

a {
  text-decoration: none;
  color: inherit;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__nav {
    border-bottom: 1px solid #000;
    position: fixed;
    left: 0;
    top: 0;
    background: white;
    width: 100%;
    height: 70px;
  }

  &__main {
    flex: 1;
    padding: 70px 0 40px;
  }

  &__footer {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
    padding: 10px 20px;
    border-top: 1px solid #000;
    height: 40px;
  }
}

.nav {
  display: flex;
  align-items: center;

  &__link {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 125px;
    text-align: center;

    &-icon {
      width: 30px;
      svg {
        path {
          stroke-width: 1.5;
        }
      }
    }

    &:hover &-icon {
      width: 34px;
      height: 34px;
    }
  }
}
</style>
