<template>
  <div class="orders">
    <div class="orders__buttons">
      <button class="orders__button" @click="refreshOrders">
        Обновить список
      </button>
    </div>
    <div class="orders__list">
      <div class="orders__label">
        Новые заказы
      </div>
      <div class="orders__order order" v-if="!receivedOrders.length">
        Нет заказов
      </div>
      <div class="orders__order order" v-for="order in receivedOrders">
        <div class="order__cell">
          <div class="order__date">
            {{ new Date(order.receivedDate).getDay() }}.{{
              new Date(order.receivedDate).getMonth() + 1
            }}.{{ new Date(order.receivedDate).getFullYear() }}
          </div>
          <div class="order__time"></div>
          {{ new Date(order.receivedDate).getHours() }}:{{
            new Date(order.receivedDate).getMinutes()
          }}
        </div>
        <div class="order__cell">
          {{ order.client }}
        </div>
        <div class="order__cell">
          <div class="order__cart">
            <div
                class="order__cart-item"
                v-for="good in order.cart"
                :class="{'order__cart-item--red': $store.getters.goodById(good.good).quantity < good.quantity}"
            >
              {{ $store.getters.goodById(good.good).title }} {{ good.quantity }}
            </div>
          </div>
        </div>
        <div class="order__cell">
          <div
              class="order__button"
              @click="approveOrder(order._id)"
          >
            Одобрить
          </div>
        </div>
      </div>
      <div class="orders__label">
        Одобренные заказы
      </div>
      <div class="orders__order order" v-if="!approvedOrders.length">
        Нет заказов
      </div>
      <div class="orders__order order" v-for="order in approvedOrders">
        <div class="order__cell">
          <div class="order__date">
            {{ new Date(order.receivedDate).getDay() }}.{{
              new Date(order.receivedDate).getMonth() + 1
            }}.{{ new Date(order.receivedDate).getFullYear() }}
          </div>
          <div class="order__time"></div>
          {{ new Date(order.receivedDate).getHours() }}:{{
            new Date(order.receivedDate).getMinutes()
          }}
        </div>
        <div class="order__cell">
          {{ order.client }}
        </div>
        <div class="order__cell">
          <div class="order__cart">
            <div class="order__cart-item" v-for="good in order.cart">
              {{ $store.getters.goodById(good.good).title }} {{ good.quantity }}
            </div>
          </div>
        </div>
        <div class="order__cell">

        </div>
      </div>
      <div class="orders__label">
        Отгруженные заказы
      </div>
      <div class="orders__order order" v-if="!shippedOrders.length">
        Нет заказов
      </div>
      <div class="orders__order order" v-for="order in shippedOrders">
        <div class="order__cell">
          <div class="order__date">
            {{ new Date(order.receivedDate).getDay() }}.{{
              new Date(order.receivedDate).getMonth() + 1
            }}.{{ new Date(order.receivedDate).getFullYear() }}
          </div>
          <div class="order__time"></div>
          {{ new Date(order.receivedDate).getHours() }}:{{
            new Date(order.receivedDate).getMinutes()
          }}
        </div>
        <div class="order__cell">
          {{ order.client }}
        </div>
        <div class="order__cell">
          <div class="order__cart">
            <div class="order__cart-item" v-for="good in order.cart">
              {{ $store.getters.goodById(good.good).title }} {{ good.quantity }}
            </div>
          </div>
        </div>
        <div class="order__cell">

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Orders",
  computed: {
    allOrders() {
      return this.$store.getters.orders
    },
    receivedOrders() {
      return this.allOrders.filter(order => {
        return order.receivedDate && !order.approvedDate && !order.shippedDate
      })
    },
    approvedOrders() {
      return this.allOrders.filter(order => {
        return order.receivedDate && order.approvedDate && !order.shippedDate
      })
    },
    shippedOrders() {
      return this.allOrders.filter(order => {
        return order.receivedDate && order.approvedDate && order.shippedDate
      })
    },
  },
  methods: {
    approveOrder(id) {
      fetch(`/api/approveOrder/${id}`)
          .then(response => response.json())
          .then(data => {
            this.$store.dispatch('fetchOrders')
            this.$store.dispatch('fetchGoods')
          })
    },
    refreshOrders(){
      this.$store.dispatch('fetchOrders')
    },
  },
  created() {
    this.$store.dispatch('fetchOrders')
  }
}
</script>

<style lang="scss" scoped>
.orders{
  &__label {
    border-bottom: 2px solid #000;
    padding: 4px 10px;
  }
  &__buttons {
    border-bottom: 1px solid #000;
  }
  &__button {
    padding: 10px;
    cursor: pointer;
  }
}
.order {
  display: grid;
  grid-template-columns: 100px 100px 1fr 100px;
  border-bottom: 1px solid #000;

  &__cell {
    padding: 10px;

    &:not(:last-child) {
      border-right: 1px solid gray;
    }
  }

  &__cart-item {
    &--red{
      background: rgba(255, 0, 0, 0.18);
    }
  }

  &__button {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
</style>