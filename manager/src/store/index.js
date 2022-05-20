import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    catalog: [],
    categories: [],
    subcategories: [],
    orders: [],
    user: null,
    clients: [],
  },
  mutations: {
    setGoods(state, goods) {
      state.catalog = goods
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setSubCategories(state, subcategories) {
      state.subcategories = subcategories
    },
    setOrders(state, orders) {
      state.orders = orders
    },
    setUser(state, user) {
      state.user = user
    },
    setClients(state, clients) {
      state.clients = clients
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
    fetchCategories(context) {
      fetch('/api/category')
          .then(response => {
            return response.json()
          })
          .then(data => {
            context.commit('setCategories', data)
          })
    },
    fetchSubcategories(context) {
      fetch('/api/subcategory')
          .then(response => {
            return response.json()
          })
          .then(data => {
            context.commit('setSubCategories', data)
          })
    },
    fetchOrders(context) {
      fetch('/api/orders')
          .then(response => response.json())
          .then(data => {
            context.commit('setOrders', data)
          })
    },
    fetchClients(context) {
      fetch('/api/clients')
          .then(response => response.json())
          .then(data => {
            context.commit('setClients', data)
          })
    }
  },
  modules: {
  },
  getters: {
    goods(state) {
      return state.catalog
    },
    categories(state) {
      return state.categories
    },
    subcategories(state) {
      return state.subcategories
    },
    orders(state) {
      return state.orders
    },
    goodById: state => code => {
      return state.catalog.find(good => good.code === code)
    },
    receivedOrdersQuantity(state) {
      return state.orders.filter(order => {
        return order.receivedDate && !order.approvedDate && !order.shippedDate
      }).length
    },
    user(state) {
      return state.user
    },
    clients(state) {
      return state.clients
    }
  }
})
