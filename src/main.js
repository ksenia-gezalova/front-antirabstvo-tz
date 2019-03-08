import Vue from 'vue'
import App from './App.vue'
import Multiselect from 'vue-multiselect'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.component('VueSlider', VueSlider)
Vue.component('multiselect', Multiselect)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')