export const timehash = () =>
  (+new Date).toString(36);

const initalTodoTemplate = () => ({
  type: 'simple',
  created: Date.now()
})

export const initialTodo = initalTodoTemplate()
