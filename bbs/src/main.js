// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// import "babel-polyfill";
import Es6Promise from "es6-promise";

require('es6-promise').polyfill();
Es6Promise.polyfill();

// require axios as global Object.
import axios from 'axios';

// require DatePicker from element-ui
import {
  DatePicker,
  TimePicker,
  Button
} from 'element-ui';

Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Button);

// Set baseURL
axios.defaults.baseURL = 'http://218.249.45.162:1940/index.php?r=forum';

// Mount to the prototype of the Vue instance.
Vue.prototype.$http = axios;

axios.interceptors.response.use(
  function (response) {
    return response.data.data;
  },
  function axiosRetryInterceptor(err) {
    return Promise.reject(err);
  });

// Using routing plug-ins
Vue.use(router);


Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ...App
});
