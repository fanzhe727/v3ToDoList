import { ref } from "vue";
import {generateId } from '../util/todoStorage'
export default function useNewTodo(todosRef) {
  // 新任务的标题
  const newTodoRef = ref('')

  const addTodo = function () {
    const value = newTodoRef.value && newTodoRef.value.trim();
    if (!value) {
      return;
    }
    // 生成一个任务对象 使其加入到任务列表中
    const todo = {
      id:generateId,
      title:value,
      completed:false
    }

    todosRef.value.push(todo)
    newTodoRef.value = ''
  }

  return {
    newTodoRef,
    addTodo
  }
}