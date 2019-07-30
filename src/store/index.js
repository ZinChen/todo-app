import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const todos = [
  {
    id: '1',
    title: "Develop TODO App",
    description: "Create first page",
    scheduled: true
  },
  {
    id: '2',
    title: "Daily excercise",
    description: "Do gym",
    scheduled: false
  }
]

export default new Vuex.Store({
  state: {
    todos,
    user: null,
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo)
    },
    updateTodo(state, todo) {
      let todoIndex = state.todos.findIndex(sTodo => sTodo.id == todo.id)
      if (todoIndex > -1) {
        state.todos[todoIndex] = todo
      }
    },
    deleteTodo(state, id) {
      let todoIndex = state.todos.findIndex(sTodo => sTodo.id == id)
      todoIndex > -1 && state.todos.splice(todoIndex, 1)
    }
  }
})
