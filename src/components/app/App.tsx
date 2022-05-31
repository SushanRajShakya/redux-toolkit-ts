import { ChangeEventHandler, useState } from 'react';

import { List } from '../list';
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
import {
  ADD_TODO,
  APP_TITLE,
  COMPLETED,
  MANAGE_TODOS,
  PENDING,
  REMOVE,
} from '../../constants';

import './App.scss';

export const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');

  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todos);
  const pendingTodos = _filterTodoList(todoList, TodoStatus.PENDING);
  const completedTodos = _filterTodoList(todoList, TodoStatus.COMPLETED);

  return (
    <div>
      <h1>{APP_TITLE}</h1>
      <input value={todo} onChange={_handleChange(setTodo)} />
      <button
        onClick={_addTodo(dispatch, todo, setTodo)}
        disabled={todo === ''}
      >
        {ADD_TODO}
      </button>
      <br />
      <br />
      {!!todoList?.length && (
        <>
          <hr />
          <h2>{MANAGE_TODOS}</h2>
          <ul className="checkbox">
            {todoList.map((item: Todo) => (
              <li key={item.id}>
                <input
                  checked={item.status === TodoStatus.COMPLETED}
                  type="checkbox"
                  name="todo"
                  onChange={_changeStatus(item.id, dispatch)}
                />
                {item.title}
                <button onClick={_removeTodo(item.id, dispatch)}>
                  {REMOVE}
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <div className="flex-container">
            <List title={PENDING} list={pendingTodos} />
            <List title={COMPLETED} list={completedTodos} />
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

const _changeStatus = (id: number, dispatch: StoreDispatch) => (): void => {
  dispatch(updateTodo(id));
};

const _removeTodo = (id: number, dispatch: StoreDispatch) => (): void => {
  dispatch(removeTodo(id));
};

const _filterTodoList = (todoList: Todo[], status: TodoStatus): Todo[] =>
  todoList.filter((item) => item.status === status);

export default App;
