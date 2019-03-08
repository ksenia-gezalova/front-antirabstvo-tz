<template>
  <div class="adviser">
    <img class="adviser__photo" :src="adviser.photo">
    <div class="adviser__description">
      <h3 class="adviser__header">{{ adviser.name }}</h3>
      <p class="adviser__info">
        <b class="adviser__label">Отрасли:&nbsp;</b>
        <span>{{adviser.industries.map(industry => industry.title).join('; ')}}</span>
      </p>
      <p class="adviser__info">
        <b class="adviser__label">Уровень позиции:</b>
        {{adviser.career_levels.map(level => level.title).join(', ')}}
      </p>
      <p class="adviser__info">
        <b class="adviser__label">Локация:</b>
        {{adviser.country}}
        <span
          v-if="adviser.cities.length > 0"
        >({{adviser.cities.join(', ')}})</span>
      </p>
    </div>
    <div class="adviser__price">
      <span class="adviser__label">Тариф</span>
      <span class="adviser__value--red adviser__value--big">{{adviser.price}} р/час</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Adviser",
  props: ["adviser"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.adviser {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  background-color: #ebebeb;
  margin: 1rem 0;
  padding: 0.5rem;
  @media (min-width: 480px) {
    margin: 1rem;
    border-radius: 0.5rem;
    grid-template-columns: 2fr 3fr 2fr;
  }
  &__photo {
    margin: auto;
    height: 8rem;
    width: 8rem;
    border-radius: 4rem;
  }
  &__header {
    text-transform: uppercase;
  }
  &__description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 1rem;
  }
  &__info {
    margin-bottom: 1rem;
  }
  &__price {
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 480px) {
      flex-direction: column;
      justify-content: center;
    }
  }
  &__value {
    &--big {
      font-size: 1.4rem;
      padding-left: 1rem;
      @media (min-width: 480px) {
        padding-left: 0;
        padding-top: 1rem;
      }
    }
    &--red {
      color: red;
    }
  }
}
</style>
