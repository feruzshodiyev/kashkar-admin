import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null,
    mainSidebarCollapsed: true,
    user: {},
    tableSize: "mini"
  },
  mutations: {
    authenticate(state, tokenResponse) {
      state.accessToken = tokenResponse;
    },
    userData(state, userData) {
      this.state.user = userData;
    },
    signOut(state) {
      state.accessToken = null;
    },
    toggleMainSidebar(state, mainSidebarCollapsed) {
      state.mainSidebarCollapsed = mainSidebarCollapsed;
    },
    updateTableSize(state, size) {
      this.state.tableSize = size;
    }
  },
  actions: {
    changeTableSize(ctx, size) {
      ctx.commit("updateTableSize", size);
    }
  },
  plugins: [
    createPersistedState({
      key: "kashkar-admin",
      paths: [
        "accessToken",
        "mainSidebarCollapsed",
        "user",
        "tableSize"
      ],
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ]
});
