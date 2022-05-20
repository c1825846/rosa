<template>
  <div class="popup" :class="{'popup--opened':isOpened}">
    <div class="popup__title">Добавление клиента</div>
    <div class="popup__body">
      <div class="popup__input-wrapper">
        <div class="popup__label">Фамилия</div>
        <input class="popup__input" type="text" v-model="lastname">
      </div>
      <div class="popup__input-wrapper">
        <div class="popup__label">Имя</div>
        <input class="popup__input" type="text" v-model="name">
      </div>
      <div class="popup__input-wrapper">
        <div class="popup__label">Отчество</div>
        <input class="popup__input" type="text" v-model="middlename">
      </div>
      <div class="popup__input-wrapper">
        <div class="popup__label">Организация</div>
        <input class="popup__input" type="text" v-model="organization">
      </div>
      <div class="popup__input-wrapper">
        <div class="popup__label">E-mail</div>
        <input class="popup__input" type="text" v-model="eMail">
      </div>
      <div class="popup__input-wrapper">
        <div class="popup__label">Телефон</div>
        <input class="popup__input" type="text" v-model="phone">
      </div>
      <div class="popup__input-wrapper">
        <div class="popup__label">Логин</div>
        <input class="popup__input" type="text" v-model="login">
      </div>
      <div class="popup__input-wrapper">
        <div class="popup__label">Пароль</div>
        <input class="popup__input" type="text" v-model="password">
      </div>
    </div>
    <div class="popup__buttons">
      <button class="popup__button" @click="add">Добавить</button>
      <button class="popup__button" @click="close">Отмена</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddGoodPopup",
  props: {
    isOpened: Boolean
  },
  data() {
    return {
      login: '',
      password: '',
      lastname: '',
      middlename: '',
      organization: '',
      name: '',
      eMail: '',
      phone: '',
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.category = ''
    },
    add() {
      this.$emit('add', {
        login: this.login,
        password: this.password,
        lastname: this.lastname,
        middlename: this.middlename,
        name: this.name,
        organization: this.organization,
        eMail: this.eMail,
        phone: this.phone,
      })
      this.login = ''
      this.password = ''
      this.lastname = ''
      this.middlename = ''
      this.name = ''
      this.organization = ''
      this.eMail = ''
      this.phone = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000;
  padding: 20px;
  background: white;

  &--opened {
    display: block;
  }

  &__title {
    margin-bottom: 10px;
  }

  &__body {
    margin-bottom: 10px;

    input {
      padding: 4px 8px;
      font-size: 18px;
      border: 1px solid #000;
    }
  }

  &__input-wrapper{
    margin-bottom: 10px;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  &__button {
    padding: 4px 10px;
    cursor: pointer;
  }
}
</style>