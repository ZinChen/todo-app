import Vue from 'vue'
import Vuex from 'vuex'
import { firestoreAction, vuexfireMutations } from 'vuexfire'
import { initialTodo } from '../common/lib'

Vue.use(Vuex)

const updateCurrentTodo = ({
  commit,
  state,
  getters,
}) => {
  const {
    todoId,
    subTodo,
  } = state.current
  const todo = getters.todoById(todoId) || subTodo || initialTodo

  commit('setCurrent', { todo, subTodo: undefined })
}

export default new Vuex.Store({
  state: {
    todos: [],
    user: null,
    current: {}
  },
  mutations: {
    ...vuexfireMutations,
    addTodo(state) {
      const { todo } = state.current
      state.todosRef.add(todo)
    },
    updateTodo(state) {
      const { todo } = state.current
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
    },
    setTodoListStatus(state, status) {
      state.todoListStatus = status
    },
    deleteAllTodos(state) {
      (state.todos || []).forEach(todo => {
        state.todosRef.doc(todo.id).delete()
      })

      const current = {
        todo: undefined,
        todoId: undefined,
        subTodo: undefined,
      }

      state.current = Object.assign({}, state.current, current)
    }
  },
  getters: {
    isTodosLoaded: state => () => {
      state.todoListStatus == 'loaded'
    },
    todoById: state => id => {
      return id && state.todos.find((todo) => todo.id === id)
    },
    subTodos: state => parentId => {
      return state.todos.filter((todo) => todo.parentTodoId === parentId)
    },
    currentTodo: state => () => {
      return state.current.todo
    },
    masterTodos: state => () => {
      return state.todos.filter((todo) => ['epic', 'schedule'].includes(todo.type) && !todo.parentTodoId)
    },
    dailyTodos: state => () => {
      return state.todos.filter((todo) => todo.type == 'simple')
    }
  },
  actions: {
    setTodosRef({ commit }, ref) {
      commit('setTodosRef', ref)
    },
    setCurrentTodo({ commit, getters, state }, id) {
      updateCurrentTodo({ commit, state, getters })
    },
    bindFirestoreRef: firestoreAction(({ bindFirestoreRef, commit, getters, state }, ref) => {
      bindFirestoreRef('todos', ref)
        .then(data => {
          updateCurrentTodo({ commit, state, getters })
        })
    }),
    setTodoListStatus({ commit }, status) {
      commit('setTodoListStatus', status)
    }
  }
})
