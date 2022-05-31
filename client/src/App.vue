<template>
  <div class="app">
    <div class="app__nav nav" v-if="$store.getters.user">
      <router-link to="/" class="nav__link">
        <div class="nav__link-icon">
          <img src="@/assets/catalog.png" alt="">
        </div>
        Каталог
      </router-link>
      <router-link to="/cart" class="nav__link">
        <div class="nav__link-icon">
          <img src="@/assets/cart.png" alt="">
        </div>
        Корзина
      </router-link>
      <router-link to="/about" class="nav__link">
        <div class="nav__link-icon">
          <img src="@/assets/info.png" alt="">
        </div>
        О компании
      </router-link>
      <div class="nav__link" @click="getPriceList">
        <div class="nav__link-icon">
          <img src="@/assets/download.png" alt="">
        </div>
        Прайс-лист
      </div>
      <div class="nav__link" @click="logout">
        <div class="nav__link-icon">
          <img src="@/assets/exit.png" alt="">
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
    width: 100%;
    height: 70px;
    background: #e3c607;
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

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &:hover &-icon {
      width: 34px;
      height: 34px;
    }
  }
}
</style>
