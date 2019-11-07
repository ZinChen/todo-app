import Vue from 'vue'
import Vuex from 'vuex'
import { firestoreAction } from 'vuexfire'
import { initialTodoTemplate } from '../common/lib'
import { TODO_TYPE } from '../common/constants'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const setCurrentTodo = ({
  commit,
  state,
  getters,
}) => {
  const {
    subTodo,
    todoId,
  } = state.current
  const todo = (todoId && getters.todoById(todoId)) || subTodo || initialTodoTemplate()

  commit('setCurrent', { todo, subTodo: undefined })
}

export default new Vuex.Store({
  state: {
    todos: [],
    user: null,
    current: {}
  },
  mutations,
  getters,
  actions: {
    bindFirestoreRef: firestoreAction(({ bindFirestoreRef, commit, getters, state }, ref) => {
      bindFirestoreRef('todos', ref)
        .then(data => {
          setCurrentTodo({ commit, state, getters })
        })
    }),

    setTodosRef({ commit }, ref) {
      commit('setTodosRef', ref)
    },

    setCurrentTodo({ commit, getters, state }) {
      setCurrentTodo({ commit, state, getters })
    },

    addTodo({ commit }) {
      commit('addTodo')
    },

    updateTodo({ commit, state }, todo) {
      todo = todo || state.current.todo
      this.commit('updateTodo', todo)

      if (state.current.todo.id == todo.id) {
        commit('setCurrent', { todo })
      }
    },

    addSubAndSetParentTodo({ commit, state }) {
      const {
        parentTodo
      } = state.current

      if (parentTodo.type != TODO_TYPE.EPIC) {
        parentTodo.type = TODO_TYPE.EPIC
        commit('updateTodo', parentTodo)
      }

      commit('addTodo')
    },

    setTodoListStatus({ commit }, status) {
      commit('setTodoListStatus', status)
    },

    deleteAllTodos({ commit, state }) {
      (state.todos || []).forEach(todo => {
        console.log('delete todo', todo)
        state.todosRef.doc(todo.id).delete()
      })

      const current = {
        todo: undefined,
      }

      commit('setCurrent', current)
    }
  }
})
