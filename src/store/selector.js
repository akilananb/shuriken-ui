// src/store/selectors.js

// Selector to get the user data
export const selectUser = (state) => state.user;

// Selector to get the todo list
export const selectTodos = (state) => state.todos;

// Selector to get the loading state
export const selectLoading = (state) => state.loading;

// More complex selector: get todos count
export const selectTodosCount = (state) => state.todos.length;

// Selector with some logic: get completed todos
export const selectCompletedTodos = (state) =>
  state.todos.filter((todo) => todo.completed);

// You can add more selectors based on your state structure and needs
