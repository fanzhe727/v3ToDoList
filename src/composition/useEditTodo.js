import { ref, computed } from "vue";
export default function useEditTodo(todosRef) {
	// 缓存之前的值
	let originTitle = null
	// 当前正在修改的哪一个todo
	const eidtingTodoRef = ref(null);

	const editTodo = function (todo) {
		eidtingTodoRef.value = todo
		originTitle = todo.title
	}

	const doneEdit = function (todo) {
		eidtingTodoRef.value = null

		const title = todo.title.trim()
		if (title) {
			todo.title = title
		} else {
			const index = todosRef.value.indexOf(todo);
			if (index >= 0) {
				todosRef.value.splice(index, 1);
			}
		}
	}

	const cancelEdit = function (todo) {
		eidtingTodoRef.value = null
		todo.title = originTitle
	}

	const allDoneRef = computed({
		get() {
			if (todosRef.value.length === 0) {
				return false
			}
			return todosRef.value.filter(item => !item.completed).length === 0
		},
		set(checked) {
			todosRef.value.forEach(item => {
				item.completed = checked
			})
		}
	})

	return {
		eidtingTodoRef,
		editTodo,
		doneEdit,
		cancelEdit,
		allDoneRef
	}
}