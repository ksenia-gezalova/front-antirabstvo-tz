<template>
  <div class="filters">
    <div class="filters__icon" @click="isShow=!isShow">
      <img src="https://img.icons8.com/dotty/32/000000/advanced-search.png">
    </div>
    <div class="filters__holder" v-if="isShow">
      <div class="filters__wrapper">
        <span>{{ value[0] }}</span>
        <vue-slider
          class="filters__range"
          v-model="value"
          :data="Array.from(Array(max+1).keys())"
          :min-range="0"
          :max-range="max"
          :enable-cross="false"
        ></vue-slider>
        <span>{{ value[1] }}</span>
      </div>
      <multiselect
        class="filters__select"
        v-model="locationFilter"
        :options="locations"
        placeholder="Выберите локацию"
        :searchable="true"
        :allow-empty="true"
      ></multiselect>
      <multiselect
        class="filters__select"
        v-model="industriesFilter"
        :options="industries"
        :multiple="true"
        label="title"
        track-by="id"
        placeholder="Выберите отрасль"
        :searchable="true"
      ></multiselect>
      <multiselect
        class="filters__select"
        v-model="levelFilter"
        :options="levels"
        :multiple="true"
        label="title"
        track-by="id"
        placeholder="Выберите уровень"
      ></multiselect>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filters",
  props: ["max-price", "industries", "levels", "locations"],
  data() {
    return {
      isShow: false,
      priceMax: 0,
      minPrice: 0,
      levelFilter: [],
      locationFilter: "",
      industriesFilter: [],
      value: [0, 0],
      max: 0
    };
  },
  watch: {
    industriesFilter() {
      this.$emit("set-industries-filter", this.industriesFilter);
    },
    levelFilter() {
      this.$emit("set-level-filter", this.levelFilter);
    },
    locationFilter() {
      this.$emit("set-location-filter", this.locationFilter);
    },
    value() {
      this.$emit("set-min-price", this.value[0]);
      this.$emit("set-max-price", this.value[1]);
    }
  },
  created() {
    this.priceMax = this.maxPrice;
    this.value[1] = this.maxPrice;
    this.max = this.maxPrice;
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.filters {
  position: fixed;
  padding: 0.5rem 0;
  top: 0;
  background-color: #fff;
  width: 100%;
  height: max-content;
  border-bottom: 1px solid #ccc;
  &__icon {
    cursor: pointer;
    text-align: right;
    padding-right: 2rem;
  }
  &__range {
    width: 80% !important;
  }
  &__wrapper {
    display: flex;
    padding: 0 2rem;
    justify-content: space-between;
  }
  &__select {
    margin: 1rem 0;
  }
}
</style>
