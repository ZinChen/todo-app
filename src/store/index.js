import Vue from 'vue'
import Vuex from 'vuex'
import { firestoreAction, vuexfireMutations } from 'vuexfire'
import { initialTodoTemplate } from '../common/lib'
import { TODO_TYPE } from '../common/constants'

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
  mutations: {
    ...vuexfireMutations,
    addTodo(state) {
      const { todo } = state.current
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
    },
    setTodoListStatus(state, status) {
      state.todoListStatus = status
    },
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
      return state.todos.filter((todo) =>
        [TODO_TYPE.EPIC, TODO_TYPE.SCHEDULED].includes(todo.type)
        && !todo.parentTodoId
      )
    },
    dailyTodos: state => () => {
      return state.todos.filter((todo) =>
        todo.type == TODO_TYPE.SIMPLE
      )
    }
  },
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
      if (!todo) {
        todo = state.current.todo
      }
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
