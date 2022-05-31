import { createReducer } from '@reduxjs/toolkit';

import { addTodo, removeTodo, Todo, TodoStatus, updateTodo } from '../actions';

const INITIAL_STATE: Todo[] = [];

export const todoReducer = createReducer(INITIAL_STATE, (builder) =>
  builder
    .addCase(addTodo, (state, action) => {
      state.push({
        title: action.payload,
        status: TodoStatus.PENDING,
      });
    })
    .addCase(removeTodo, (state, action) =>
      state.filter(
        (item) =>
          !item.title.toLowerCase().includes(action.payload.toLowerCase())
      )
    )
    .addCase(updateTodo, (state, action) => {
      const todoIndex = state.findIndex(
        (todo) => todo.title === action.payload.title
      );

      if (todoIndex > -1) {
        state[todoIndex] = action.payload;
      }
    })
);
