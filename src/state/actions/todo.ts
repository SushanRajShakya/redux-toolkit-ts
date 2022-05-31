import { createActionWithPayload } from '../../utils';

export enum TodoActions {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
}

export enum TodoStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
}

export const addTodo = createActionWithPayload<string>(TodoActions.ADD_TODO);

export const removeTodo = createActionWithPayload<number>(
  TodoActions.REMOVE_TODO
);

export const updateTodo = createActionWithPayload<number>(
  TodoActions.UPDATE_TODO
);
