import Vue from 'vue';
import App from './App.vue';
Vue.config.productionTip = false;
import './directive'
import api from './api/index';
Vue.config.productionTip = false;
Vue.prototype.$api = api;
new Vue({
  render: h => h(App)
}).$mount('#app');