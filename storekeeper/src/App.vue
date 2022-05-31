<template>
  <div class="app">
    <div class="app__nav nav" v-if="$store.getters.user">
      <router-link to="/" class="nav__link">
        <div class="nav__link-icon">
          <img src="@/assets/orders.png" alt="">
        </div>
        Заявки
      </router-link>
      <div class="nav__link" @click="logout">
        <div class="nav__link-icon">
          <img src="@/assets/exit.png" alt="">
        </div>
        Выход
      </div>
    </div>
    <router-view class="app__main"/>
    <div class="app__footer" v-if="$store.getters.user">
      Заявок на отгрузку: <b>{{ $store.getters.orders.length }}</b>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('setUser', null)
      localStorage.user = null
      this.$router.push('/login')
    }
  },
  created() {
    if (!localStorage.user) {
      this.$router.push('/login')
    } else {
      this.$store.commit('setUser', JSON.parse(localStorage.user))
    }
    this.$store.dispatch('fetchGoods')
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
    background: #e3c607;
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
