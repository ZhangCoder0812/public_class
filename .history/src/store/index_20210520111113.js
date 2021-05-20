import Vue from "vue";
import Vuex from "vuex";
import logger from "vuex/dist/logger";
import api from "../api/index";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cur: 0,
        list: [],
    },
    mutations: {
        queryDataM(state, payload) {
            let { id, data } = payload;
            state.cur = parseInt(id);
            if (data) {
                state.list.push(data);
            }
        },
    },
    actions: {
      asybc  queryDataA({ state, commit }, id) {
            let result = state.list.find(item => parseInt(item.id) === parseInt(id));
            if (result) {
                commit("queryDataM", { id });
                return;
            }
        },
    },
    plugins: [logger()],
});
