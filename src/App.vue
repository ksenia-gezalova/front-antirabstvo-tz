<template>
  <div id="app">
    <Filters
      v-if="maxPrice > 0 && locations.length > 0"
      :max-price="maxPrice"
      :industries="industries"
      :levels="careerLevels"
      :locations="locations"
      @set-level-filter="setLevelFilter"
      @set-location-filter="setLocationFilter"
      @set-industries-filter="setIndustriesFilter"
      @set-min-price="setMinPrice"
      @set-max-price="setMaxPrice"
    />
    <Adviser v-for="adviser in filteredAdvisers" :key="adviser.id" :adviser="adviser"/>
  </div>
</template>

<script>
import axios from "axios";

import Adviser from "./components/Adviser";
import Filters from "./components/Filters";

export default {
  name: "app",
  data() {
    return {
      advisers: [],
      industries: [],
      careerLevels: [],
      levelFilter: [],
      locationFilter: "",
      industriesFilter: [],
      minPrice: 0,
      maxPrice: 0
    };
  },
  components: {
    Adviser,
    Filters
  },
  methods: {
    getAdvisers() {
      axios.get("/advisers.json").then(resp => {
        this.advisers = resp.data;
        this.advisers.forEach(adviser => {
          adviser.industries = adviser.industries.map(
            industry => this.industries.filter(i => industry == i.id)[0]
          );
          adviser.career_levels = adviser.career_levels.map(
            level => this.careerLevels.filter(l => level == l.id)[0]
          );
          if (this.maxPrice < adviser.price) this.maxPrice = adviser.price;
        });
      });
    },
    getIndustries() {
      return axios.get("/industries.json").then(resp => {
        this.industries = resp.data;
      });
    },
    getCareerLevels() {
      return axios.get("/career_levels.json").then(resp => {
        this.careerLevels = resp.data;
      });
    },
    setLevelFilter(value) {
      this.levelFilter = value;
    },
    setLocationFilter(value) {
      this.locationFilter = value;
    },
    setIndustriesFilter(value) {
      this.industriesFilter = value;
    },
    setMaxPrice(value) {
      this.maxPrice = value;
    },
    setMinPrice(value) {
      this.minPrice = value;
    }
  },
  computed: {
    filteredAdvisers() {
      let advisers = this.advisers;
      if (advisers.length === 0) return advisers;
      // career level filter
      if (this.levelFilter.length > 0 && this.levelFilter[0] !== "")
        advisers = advisers.filter(a =>
          a.career_levels.some(e =>
            this.levelFilter.map(l => l.id).includes(e.id)
          )
        );
      // location filter
      if (this.locationFilter && this.locationFilter !== "") {
        advisers = advisers.filter(
          a =>
            this.locationFilter === a.country ||
            a.cities.includes(this.locationFilter)
        );
      }
      // industries filter
      if (this.industriesFilter.length > 0 && this.industriesFilter[0] !== "")
        advisers = advisers.filter(a =>
          a.industries.some(e =>
            this.industriesFilter.map(i => i.id).includes(e.id)
          )
        );
      // price filter
      advisers = advisers.filter(
        a => a.price <= this.maxPrice && a.price >= this.minPrice
      );
      return advisers;
    },
    locations() {
      let locations = this.advisers
        .map(a => a.country)
        .filter((value, i, obj) => obj.indexOf(value) === i);
      this.advisers.forEach(a => {
        a.cities.forEach(c => {
          if (!locations.includes(c)) locations.push(c);
        });
      });
      return locations;
    }
  },
  beforeMount() {
    this.getCareerLevels()
      .then(this.getIndustries)
      .then(this.getAdvisers);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 2rem;
}
html,
body {
  margin: 0;
  padding: 0;
}
</style>
