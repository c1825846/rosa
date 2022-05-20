import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        catalog: [],
        cart: [],
        user: null,
        categories: [],
        subcategories: [],
    },
    mutations: {
        addGood(state, payload) {
            const code = payload.good.code
            let hasGood = false
            state.cart.forEach(good => {
                if (good.good.code === code) {
                    good.quantity += payload.quantity
                    hasGood = true
                }
            })
            if (!hasGood)
                state.cart.push(payload)
        },
        incGood(state, code) {
            state.cart.forEach(good => {
                if (good.good.code === code) {
                    good.quantity++
                }
            })
        },
        decGood(state, code) {
            state.cart.forEach((good, index) => {
                if (good.good.code === code) {
                    good.quantity--
                    if (good.quantity <= 0) {
                        state.cart.splice(index, 1)
                    }
                }
            })
        },
        setGoods(state, goods) {
            state.catalog = goods
        },
        clearCart(state) {
            state.cart = []
        },
        setCategories(state, categories) {
            state.categories = categories
        },
        setSubCategories(state, subcategories) {
            state.subcategories = subcategories
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
        sendOrder(context) {
            const order = {
                client: context.getters.user.login,
                cart: context.getters.cart.map(good => {
                    return {
                        good: good.good.code,
                        quantity: good.quantity
                    }
                })
            }
            fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
                .then(response => response.json())
                .then(data => {
                    context.commit('clearCart')
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
    modules: {},
    getters: {
        goods(state) {
            return state.catalog
        },
        cart(state) {
            return state.cart
        },
        categories(state) {
            return state.categories
        },
        subcategories(state) {
            return state.subcategories
        },
        user(state) {
            return state.user
        }
    }
})
