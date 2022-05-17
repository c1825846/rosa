import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    catalog: [],
    categories: [],
    subcategories: [],
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
    }
  }
})
