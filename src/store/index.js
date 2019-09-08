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
    },
    setCurrent(state, prop) {
      state.current = Object.assign({}, state.current, prop)
    }
  },
  getters: {
    todoById: state => id => {
      return state.todos.find((todo) => todo.id === id)
    },
    currentTodo: (state, getters) => () => {
      const id = (state.current || {}).todoId
      return id ?
        getters.todoById(id)
        : {
          type: 'simple'
        }
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
