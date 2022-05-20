<template>
<div class="notification" v-if="isShow">
  {{ text }}
</div>
</template>

<script>
export default {
  name: "Notification",
  data(){
    return {
      text: '',
      isShow: false,
    }
  },
  methods: {
    showNotification(text) {
      this.text = text
      this.isShow = true
      setTimeout(() => {
        this.text = ''
        this.isShow = false
      }, 4000)
    }
  },
  mounted() {
    this.$root.$on('notification', text => {
      this.showNotification(text)
    })
  }
}
</script>

<style lang="scss" scoped>
.notification{
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border: 1px solid #000;
  padding: 20px;
}
</style>