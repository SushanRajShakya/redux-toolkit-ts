import { createReducer } from '@reduxjs/toolkit';

import { addTodo, removeTodo, Todo, TodoStatus, updateTodo } from '../actions';

const INITIAL_STATE: Todo[] = [];

export const todoReducer = createReducer(INITIAL_STATE, (builder) =>
  builder
    .addCase(addTodo, (state, action) => {
      const latestId = state.slice(-1)?.[0]?.id | 0;

      state.push({
        id: latestId + 1,
        title: action.payload,
        status: TodoStatus.PENDING,
      });
    })
    .addCase(removeTodo, (state, action) =>
      state.filter((item) => item.id !== action.payload)
    )
    .addCase(updateTodo, (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      const todo = state[index];
      state[index] = {
        ...todo,
        status:
          todo.status === TodoStatus.COMPLETED
            ? TodoStatus.PENDING
            : TodoStatus.COMPLETED,
      };
    })
);
