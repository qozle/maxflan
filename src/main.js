import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import P5 from "p5"

Vue.config.productionTip = false;
Vue.prototype.$P5 = P5;


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
