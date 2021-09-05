import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "./assets/themes/core.scss";
import "line-awesome/dist/line-awesome/scss/line-awesome.scss";
import router from "./router";
import store from "./store";
import http from "./http";
import LineAwesome from "line-awesome/dist/line-awesome/css/line-awesome.min.css";

import moment from "moment";

Vue.config.productionTip = false;
Vue.use(LineAwesome);

Vue.use(ElementUI, {locale});
Vue.prototype.$http = http;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
