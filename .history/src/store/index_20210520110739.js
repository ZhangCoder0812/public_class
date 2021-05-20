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
    mutations: {},
    actions: {
        queryDataA({ state, commit }, id) {
            let result = state.list.find(item=>parseInt(item.id)===parseInt(id));
			if(result){
				return ;
			}
        },
    },
    plugins: [logger()],
});
