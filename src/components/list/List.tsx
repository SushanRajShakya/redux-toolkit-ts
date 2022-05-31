import { Todo } from '../../state';

export interface ListProps<T> {
  list: T[];
  title: string;
}

export const List: React.FC<ListProps<Todo>> = ({ list, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {!!list.length
          ? list.map((item, index) => (
              <li key={`${item.title} ${index}`}>{item.title}</li>
            ))
          : 'Empty List'}
      </ul>
    </div>
  );
};
