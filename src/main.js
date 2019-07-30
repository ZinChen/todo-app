import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import App from './App.vue'
import Main from './components/Main.vue'
import NewItem from './components/NewItem.vue'
import Login from './components/Login.vue'

require('./styles/main.scss')

Vue.config.productionTip = false
Vue.use(Router)

let routes = [
  { path: '/', component: Main },
  { path: '/new', component: NewItem },
  { path: '/login', component: Login}
]

let router = new Router({
  mode: 'history',
  routes
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
