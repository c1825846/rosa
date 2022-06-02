<template>
  <div class="image-wrapper">
    Чтобы закрыть картинку, нажмите в любом месте экрана
    <div class="image">
      <img :src="src" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "ImagePopup",
  props: {
    src: String
  }
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #000;
  padding: 20px;
  background: #fff;
}

.image {

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-height: 800px;
  }
}
</style>