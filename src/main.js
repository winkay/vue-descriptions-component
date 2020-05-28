import Descriptions from './components/Descriptions'
import Vue from 'vue'
import App from './App.vue'
Vue.use(Descriptions)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
