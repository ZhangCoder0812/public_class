import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
 Vue.config.productionTip = false;
 
new Vue({
    router, //=>this.$route  this.$router
    store, //=>this.$store
    render: h => h(App),
}).$mount("#app");
 
