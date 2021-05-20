import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.prototype.$api = api;
new Vue({ router, store, render: h => h(App) }).$mount("#app");
