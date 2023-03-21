<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main" v-show="todosRef.length > 0">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDoneRef" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{
              completed: item.completed,
              editing: item == eidtingTodoRef,
            }"
            v-for="item in filteredTodosRef"
            :key="item.id"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.completed" />
              <label @dblclick="editTodo(item)">{{ item.title }}</label>
              <button class="destroy" @click="delTodo(item)"></button>
            </div>
            <input class="edit" type="text" v-model="item.title" 
            @blur="doneEdit(item)"
            @keyup.enter="doneEdit(item)"
            @keyup.esc="cancelEdit(item)" />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todosRef.length > 0">
        <span class="todo-count">
          <strong>{{ remainingRef }}</strong>
          <span>item{{ remainingRef === 1 ? "" : "s" }} left</span>
        </span>
        <ul class="filters">
          <li v-for="item in validHash" :key="item">
            <a
              :href="`#/${item}`"
              :class="{ selected: visibilitiyRef === item }"
            >
              {{ item[0].toUpperCase() + item.substring(1) }}
            </a>
          </li>
        </ul>
        <button class="clear-completed" v-show="completedRef > 0" @click="delCompletedTodos">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./composition/useTodoList";
import useNewTodo from "./composition/useNewTodo";
import useFilterList from "./composition/useFilter";
import useEditTodo from "./composition/useEditTodo";
import useDelTodo from "./composition/useDelTodo";
export default {
  setup() {
    const { todosRef } = useTodoList();
    return {
      todosRef,
      ...useNewTodo(todosRef),
      ...useFilterList(todosRef),
      ...useEditTodo(todosRef),
      ...useDelTodo(todosRef)
    };
  },
};
</script>
