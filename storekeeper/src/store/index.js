import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    catalog: [],
    orders: [],
    user: null,
  },
  mutations: {
    setGoods(state, goods) {
      state.catalog = goods
    },
    setOrders(state, orders) {
      state.orders = orders
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    fetchGoods(context) {
      fetch('/api/goods')
          .then(response => {
            return response.json()
          })
          .then(data => {
            context.commit('setGoods', data)
          })
    },
    fetchOrders(context) {
      fetch('/api/approvedOrders')
          .then(response => response.json())
          .then(data => {
            context.commit('setOrders', data)
          })
    }
  },
  modules: {
  },
  getters: {
    goods(state) {
      return state.catalog
    },
    orders(state) {
      return state.orders
    },
    goodById: state => code => {
      return state.catalog.find(good => good.code === code)
    },
    user(state) {
      return state.user
    }
  }
})
