<template>
<div class="about">
  <div class="about__info">
    <b>О компании</b> <br>
    Оптово-розничная фирма ООО Роса занимается: эпиген-гелем, подушками, покрывалами и одеялами, зубными пастами, продажей канцелярских товаров, гелями и шампунями для душа, подарочными сертификатами и наборами, зубной пастой White, хозтоварами оптом и в розницу, туалетным мылом, продажей бытовой химии, Сплат, гигиеническими товарами, пастой Lacalut, полосками 3d White.
    <br>
    Также мы занимаемся: средствами от ржавчины, Антинакипином, Ванишем для чистки ковров, таблетками для унитаза, большим ассортиментом, средствами для холодильников, средствами для посудомоечных машин, Саноксом, жидкостями для пола, хорошими стиральными порошками, Tide, обычными порошками, средствами бытовой химии, Персолем, профессиональными моющими средствами.
  </div>
  <div class="about__contacts">
    <div class="about__title">Контакты</div>
    <div class="about__contact">
      <div class="about__icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      Адрес: 656922, Барнаул, Попова, 179Б - 1 этаж
    </div>
    <div class="about__contact">
      <div class="about__icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      Телефон: <a href="tel:+73852500644">+7 (3852) 500-644</a>
    </div>
    <div class="about__contact">
      <div class="about__icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      Факс: +7 (3852) 500-644
    </div>
    <div class="about__contact">
      <div class="about__icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
      </div>
      Электронная почта: <a href="mailto:info@rosa22.ru">info@rosa22.ru</a>
    </div>
    <div class="about__contact">
      <div class="about__icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      Сайт: <a href="https://rosa22.ru">rosa22.ru</a>
    </div>
    <div class="about__contact">
      <div class="about__icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      Часы работы: ПН-СБ 09:10-21:00; ВC 10:00-21:00
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style lang="scss" scoped>
.about {
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  &__info{
     line-height: 1.5;
    margin-bottom: 40px;
   }
  &__icon{
    width: 30px;
    height: 30px;
    margin-right: 10px;
    svg {
      path {
        stroke-width: 1.5;
      }
    }
  }
  &__contact{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  &__title{
    margin-bottom: 10px;
    font-weight: 700;
  }
}
</style>