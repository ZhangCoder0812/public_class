import Vue from "vue";
import Vuex from "vuex";
import logger from "vuex/dist/logger";

export default new Vuex.Store({
    state: {
        cur: 0,
        list: [],
    },
    mutations: {},
    actions: {},
    plugins: [logger()],
});
