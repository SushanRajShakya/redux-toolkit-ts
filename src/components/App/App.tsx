import { ChangeEventHandler, useState } from 'react';

import { ReactAppDispatch } from '../../common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addTodo,
  removeTodo,
  StoreDispatch,
  Todo,
  TodoStatus,
  updateTodo,
} from '../../state';

import './App.scss';

export const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');

  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todos);
  const pendingTodos = _filterTodoList(todoList, TodoStatus.PENDING);
  const completedTodos = _filterTodoList(todoList, TodoStatus.COMPLETED);

  return (
    <div>
      <h1>Todo App</h1>
      <input value={todo} onChange={_handleChange(setTodo)} />
      <button onClick={_addTodo(dispatch, todo, setTodo)}>Add Todo</button>
      <br />
      <br />
      {!!todoList?.length && (
        <>
          <hr />
          <h2>Todo List</h2>
          <ul className="checkbox">
            {todoList.map((item) => (
              <li key={item.title}>
                <input
                  checked={item.status === TodoStatus.COMPLETED}
                  type="checkbox"
                  name="todo"
                  onChange={_changeStatus(item, dispatch)}
                />
                {item.title}
                <button onClick={_removeTodo(item.title, dispatch)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <div className="flex-container">
            <div>
              <h2>Pending</h2>
              <ul>
                {!!pendingTodos.length
                  ? pendingTodos.map((todo) => (
                      <li key={todo.title}>{todo.title}</li>
                    ))
                  : 'No pending todos'}
              </ul>
            </div>
            <div>
              <h2>Completed</h2>
              <ul>
                {!!completedTodos.length
                  ? completedTodos.map((todo) => (
                      <li key={todo.title}>{todo.title}</li>
                    ))
                  : 'No completed todos'}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const _handleChange =
  (setTodo: ReactAppDispatch<string>): ChangeEventHandler<HTMLInputElement> =>
  (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(event.target.value);
  };

const _addTodo =
  (dispatch: StoreDispatch, value: string, setTodo: ReactAppDispatch<string>) =>
  (): void => {
    dispatch(addTodo(value));
    setTodo('');
  };

const _changeStatus = (todo: Todo, dispatch: StoreDispatch) => (): void => {
  dispatch(
    updateTodo({
      ...todo,
      status:
        todo.status === TodoStatus.COMPLETED
          ? TodoStatus.PENDING
          : TodoStatus.COMPLETED,
    })
  );
};

const _removeTodo = (title: string, dispatch: StoreDispatch) => (): void => {
  dispatch(removeTodo(title));
};

const _filterTodoList = (todoList: Todo[], status: TodoStatus): Todo[] =>
  todoList.filter((item) => item.status === status);

export default App;
