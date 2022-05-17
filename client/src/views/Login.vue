<template>
<div class="login">
  логин
  <input type="text" class="login__input" v-model="login">
  пароль
  <input type="password" class="login__input" v-model="password">
  <div class="login__message" v-if="message">
    {{ message }}
  </div>
  <button class="login__button" @click="signIn">Войти</button>
</div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      login: '',
      password: '',
      message: '',
    }
  },
  methods: {
    signIn(){
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: this.login,
          password: this.password
        })
      })
      .then(
          response => response.json()
      )
      .then(data => {
        if (data.user && data.user.role === 'client') {
          this.$store.commit('setUser', data.user)
          localStorage.user = JSON.stringify(data.user)
          this.$router.push('/')
        }
        this.message = data.message
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  &__input{
    border: 1px solid #000;
    display: block;
    padding: 2px 10px;
    margin-bottom: 10px;
    font-size: 18px;
  }
  &__button{
    border: 1px solid #000;
    display: block;
    padding: 6px 20px;
    cursor: pointer;
  }
  &__message {
    margin-bottom: 10px;
  }
}
</style>