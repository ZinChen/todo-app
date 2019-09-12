import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import firebase from 'firebase'
import App from './App.vue'
import TodoManager from './pages/TodoManager.vue'
import Todo from './pages/TodoDaily.vue'
import ItemNew from './pages/ItemNew.vue'
import ItemEdit from './pages/ItemEdit.vue'
import Login from './pages/Login.vue'

require('./styles/main.scss')

Vue.config.productionTip = false
Vue.use(Router)

let routes = [
  { path: '/', component: TodoManager },
  { path: '/todo', component: Todo },
  { path: '/new', component: ItemNew },
  { path: '/login', component: Login },
  { path: '/todo/:todoId', component: ItemEdit },
]

let router = new Router({
  mode: 'history',
  routes
})

var firebaseConfig = {
  apiKey: "AIzaSyABQ5PQ9tQvVkFoBTvVYKwD9NOXjcSN9Ak",
  authDomain: "fire-app-883f2.firebaseapp.com",
  databaseURL: "https://fire-app-883f2.firebaseio.com",
  projectId: "fire-app-883f2",
  storageBucket: "fire-app-883f2.appspot.com",
  messagingSenderId: "300771870053",
  appId: "1:300771870053:web:74163ac2c109c3b2"
};

let firebaseApp = firebase.initializeApp(firebaseConfig)

new Vue({
  el: '#app',
  router,
  store,
  beforeCreate: function() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        return
      }
      const ref = firebaseApp.firestore()
        .collection('users')
        .doc(user.uid)
        .collection('todos')
       ref.get()
        .then((snap) => {
          this.$store.dispatch('setTodoListStatus', 'loaded')
          this.$store.dispatch('setTodosRef', ref)
        })
      this.$store.dispatch('bindFirestoreRef', ref)
    })
  },
  render: h => h(App),
})
