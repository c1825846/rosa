<template>
  <div class="app">
    <div class="app__nav nav" v-if="$store.getters.user">
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
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
               stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
        Корзина
      </router-link>
      <router-link to="/about" class="nav__link">
        <div class="nav__link-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
               stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        О компании
      </router-link>
      <div class="nav__link" @click="getPriceList">
        <div class="nav__link-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
               stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        Прайс-лист
      </div>
      <div class="nav__link" @click="logout">
        <div class="nav__link-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
               stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
        </div>
        Выход
      </div>
    </div>
    <router-view class="app__main"/>
    <div class="app__footer" v-if="$store.getters.user">
      В корзине <b>
      {{ $store.getters.cart.length }}
    </b> наименований на сумму <b>
      {{ cartSum }}
    </b> рублей
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    cartSum() {
      const cartSum = this.$store.getters.cart.reduce((acc, good) => {
        return acc + good.good.price * good.quantity
      }, 0)
      return Math.trunc(cartSum * 100) / 100
    }
  },
  methods: {
    logout() {
      this.$store.commit('setUser', null)
      localStorage.user = null
      this.$router.push('/login')
    },
    getPriceList() {
      fetch('/api/priceList')
          .then(response => response.json)
          .then(data => {
            window.location = 'uploads/priceList.pdf'
          })
    }
  },
  created() {
    if (!localStorage.user) {
      this.$router.push('/login')
    } else {
      this.$store.commit('setUser', JSON.parse(localStorage.user))
    }
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
    cursor: pointer;

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
