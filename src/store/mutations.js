import { vuexfireMutations } from 'vuexfire'

export default {
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
}