<script setup>
import MyButton from '../elements/MyButton.vue'
import MyIconFood from '../elements/MyIconFood.vue'

defineProps({
  id: Number,
  imageAlt: String,
  imageSrc: String,
  title: String,
  rating: Number,
  price: Number,
  buttonLabel: String
})
</script>
<template>
  <div class="card">
    <div class="card__image">
      <img :src="imageSrc" :alt="imageAlt" />
    </div>

    <div class="card__content">
      <div class="card__firstline">
        <h2 size="small">{{ title }}</h2>
        <div class="card__rating">
          <MyIconFood name="StarFilled" size="tiny" background="no-bg" color="orange" />
          <h3>{{ rating }}</h3>
        </div>
      </div>
      <div class="card__secondline">
        <MyButton class="card__button" variant="rounded" size="small">
          <RouterLink :to="`/recipes/${id}`">Plus d'infos</RouterLink>
        </MyButton>
        <h3>${{ price }}</h3>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
* {
  margin: 0;
}
.card {
  max-width: 450px;
  min-width: 400px;
  // height: 300px;
  border-radius: rem(35);
  box-shadow: 0 0 rem(5) 0 $gray;
  // overflow: hidden;

  &__image {
    overflow: hidden;
    border-radius: rem(35) rem(35) 0 0;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    font-family: $primary-font-family;
    padding: rem(20) rem(30);
    h2 {
      font-size: rem(30);
      font-weight: 600;
    }
  }
  &__firstline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &__rating {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: rem(3);

    h3 {
      font-size: rem(18);
      font-weight: normal;
    }
  }

  &__secondline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: rem(20);

    h3 {
      font-size: rem(26);
      font-weight: normal;
    }
  }
  &__button {
    text-align: center;
  }
}
</style>
