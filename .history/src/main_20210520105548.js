import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import api from "./api/index";
Vue.config.productionTip = false;
Vue.prototype.$api = api;
new Vue({
    router, //=>this.$route  this.$router
    store, //=>this.$store
    render: h => h(App),
}).$mount("#app");
~(function() {
    let evt = "onorientationchange" in window ? "orientationchange" : "resize";

    function computed() {
        let HTML = document.documentElement,
            deviceW = HTML.clientWidth,
            designW = 750,
            ratio = (deviceW / designW) * 100;
        if (deviceW >= designW) ratio = 100;
        HTML.style.fontSize = ratio + "px";
    }
    computed();
    window.addEventListener(evt, computed);
})();
