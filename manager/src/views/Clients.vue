<template>
  <div class="clients">
    <div class="clients__buttons">
      <button class="clients__button" @click="showPopup">
        Добавить клиента
      </button>
    </div>
    <div class="clients__list">
      <div class="clients__row clients__row--title">
        <div class="clients__cell">ФИО</div>
        <div class="clients__cell">Организация</div>
        <div class="clients__cell">Телефон</div>
        <div class="clients__cell">E-mail</div>
        <div class="clients__cell">Удал.</div>
      </div>
      <div class="clients__row"
           v-for="client in $store.getters.clients">
        <div class="clients__cell">
          {{ client.lastname }} {{ client.name }} {{ client.middlename }}
        </div>
        <div class="clients__cell">
          {{ client.organization }}
        </div>
        <div class="clients__cell">
          {{ client.phone }}
        </div>
        <div class="clients__cell">
          {{ client.eMail }}
        </div>
        <div class="clients__cell">
          <div class="clients__delete" @click="deleteClient(client._id)">
            <div class="clients__icon">
              <img src="@/assets/delete.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddClientPopup
        :is-opened="isPopupOpened"
        @close="closePopup"
        @add="addClient($event)"
    />
  </div>
</template>

<script>
import AddClientPopup from "@/components/AddClientPopup";

export default {
  components: {
    AddClientPopup,
  },
  name: "Clients",
  data() {
    return {
      isPopupOpened: false,
    }
  },
  methods: {
    showPopup() {
      this.isPopupOpened = true
    },
    closePopup() {
      this.isPopupOpened = false
    },
    addClient(event) {
      fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(event)
      })
          .then(response => {
            this.$store.dispatch('fetchClients')
          })
      this.closePopup()
    },
    deleteClient(id){
      fetch(`/api/clients/${id}`, {
        method: 'DELETE'
      }).then(response => response.json()).then(data => {
        this.$store.dispatch('fetchClients')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.clients {
  &__buttons {
    border-bottom: 1px solid #000;
  }

  &__button {
    padding: 10px;
    cursor: pointer;
    background: #33a233;
    border: 1px solid #000;
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(4, 1fr) 60px;
    border-bottom: 1px solid #000;

    &--title {
      text-align: center;
      font-weight: 700;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
  }

  &__delete {
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__cell {
    padding: 10px;

    &:not(:last-child) {
      border-right: 1px solid #000;
    }
  }
}
</style>