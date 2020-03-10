import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueCarousel from '@chenfengyuan/vue-carousel';
import { routes } from './routes';
import store from './store/store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'

Vue.use(VeeValidate);
Vue.use(VueRouter);
Vue.use(VueCarousel);

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})

const router = new VueRouter({
  mode:'history',
  routes,
});


new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
