import Vue from 'vue'
import Vuex from 'vuex'
import { firestoreAction, vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    user: null,
  },
  mutations: {
    ...vuexfireMutations,
    addTodo(state, todo) {
      state.todosRef.add(todo)
    },
    updateTodo(state, todo) {
      state.todosRef.doc(todo.id).update(todo)
    },
    deleteTodo(state, id) {
      state.todosRef.doc(id).delete()
    },
    setTodosRef(state, ref) {
      state.todosRef = ref
    }
  },
  getters: {
    todoById: state => id => {
      return state.todos.find((todo) => todo.id === id)
    }
  },
  actions: {
    setTodosRef({ commit }, ref) {
      commit('setTodosRef', ref)
    },
    bindFirestoreRef: firestoreAction(({ bindFirestoreRef }, ref) => {
      bindFirestoreRef('todos', ref)
    })
  }
})
