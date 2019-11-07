import getters from './getters'
import { initialTodoTemplate } from '../common/lib'
import { TODO_TYPE } from '../common/constants'

describe('vuex getters', () => {
  it('should return isTodosLoaded', () => {
    const state = {
      todoListStatus: 'loaded'
    }
    expect(getters.isTodosLoaded(state)()).toBeTruthy()
  })

  it('should return todoById', () => {
    const todoId = 'uniquetodoid'
    const todo = {
      id: todoId,
      ...initialTodoTemplate()
    }
    const state = {
      todos: [ todo ]
    }
    expect(getters.todoById(state)(todoId)).toEqual(todo)
  })

  it('should return subTodos', () => {
    const parentTodoId = 'parentodoid'
    const parentTodo = {
      id: parentTodoId,
      ...initialTodoTemplate()
    }
    const todoChildOne = {
      parentTodoId,
      ...initialTodoTemplate()
    }
    const todoChildTwo = {
      parentTodoId,
      ...initialTodoTemplate()
    }
    const state = {
      todos: [
        parentTodo,
        todoChildOne,
        todoChildTwo
      ]
    }
    expect(getters.subTodos(state)(parentTodoId)).toEqual(
      expect.arrayContaining([todoChildOne, todoChildTwo])
    )
  })

  it('should return currentTodo', () => {
    const currentTodo = {
      ...initialTodoTemplate()
    }
    const state = {
      current: {
        todo: currentTodo
      }
    }
    expect(getters.currentTodo(state)()).toEqual(currentTodo)
  })

  it('should return masterTodos', () => {
    const epicTodo = {
      ...initialTodoTemplate(),
      type: TODO_TYPE.EPIC
    }
    const scheduledTodo = {
      ...initialTodoTemplate(),
      type: TODO_TYPE.SCHEDULED
    }
    const simpleTodo = {
      ...initialTodoTemplate(),
      type: TODO_TYPE.SIMPLE
    }
    const state = {
      todos: [
        epicTodo,
        scheduledTodo,
        simpleTodo
      ]
    }

    expect(getters.masterTodos(state)()).toEqual(expect.arrayContaining([
      epicTodo,
      scheduledTodo
    ]))
    expect(getters.masterTodos(state)()).not.toContain(simpleTodo)
  })

  it('should return dailyTodos', () => {
    const epicTodo = {
      ...initialTodoTemplate(),
      type: TODO_TYPE.EPIC
    }
    const scheduledTodo = {
      ...initialTodoTemplate(),
      type: TODO_TYPE.SCHEDULED
    }
    const simpleTodo = {
      ...initialTodoTemplate(),
      type: TODO_TYPE.SIMPLE
    }
    const state = {
      todos: [
        epicTodo,
        scheduledTodo,
        simpleTodo
      ]
    }

    expect(getters.dailyTodos(state)()).not.toEqual(expect.arrayContaining([
      epicTodo,
      scheduledTodo
    ]))
    expect(getters.dailyTodos(state)()).toContain(simpleTodo)
  })
})
