export default function useDelTodo(todosRef) {
  const delTodo = function (todo) {
    const index = todosRef.value.findIndex(item => item.id === todo.id)
    todosRef.value.splice(index, 1)
  }

  const delCompletedTodos = function () {
    todosRef.value = todosRef.value.filter(item => !item.completed)
  }
  return {
    delTodo,
    delCompletedTodos
  }
}