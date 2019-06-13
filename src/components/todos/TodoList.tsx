import React from 'react';
import moment from 'moment';
import {Seq} from 'immutable';
import {SortBy, SortOrder} from '../../types';
import {TodoModel} from '../../models/todo';
import settings from '../../settings.json';

type TodoListProps = {
  todos: Seq.Indexed<TodoModel>;
  toggleCompleteHandler: (id: string) => void;
  updateTodoDateHandler: (id: string, date: moment.Moment) => void;
  sortBy: SortBy;
  sortOrder: SortOrder;
  sortChangeHandler: (SortBy: SortBy) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleCompleteHandler,
  updateTodoDateHandler,
  sortBy,
  sortOrder,
  sortChangeHandler,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th />
          <th onClick={() => sortChangeHandler(SortBy.title)}>
            Title
            {sortBy === SortBy.title && sortOrder === SortOrder.desc && (
              <i className='sort-by-desc' />
            )}
            {sortBy === SortBy.title && sortOrder === SortOrder.asc && (
              <i className='sort-by-asc' />
            )}
          </th>
          {!!settings.showDates && (
            <th onClick={() => sortChangeHandler(SortBy.date)}>
              Date
              {sortBy === SortBy.date && sortOrder === SortOrder.desc && (
                <i className='sort-by-desc' />
              )}
              {sortBy === SortBy.date && sortOrder === SortOrder.asc && (
                <i className='sort-by-asc' />
              )}
            </th>
          )}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(({title, id, completed, date}) => {
          return (
            <tr style={completed ? styles.completedContainer : styles.container} key={id}>
              <td>
                <input
                  type='checkbox'
                  checked={completed}
                  onChange={() => toggleCompleteHandler(id)}
                />
              </td>
              <td>{title}</td>
              {!!settings.showDates && <td>{moment(date).format('YYYY-MM-DD')}</td>}
              <td>
                <button onClick={() => updateTodoDateHandler(id, moment(date).add(1, 'days'))}>
                  +
                </button>
                <button onClick={() => updateTodoDateHandler(id, moment(date).subtract(1, 'days'))}>
                  -
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const styles = {
  container: {
    background: 'lightgray',
  },
  completedContainer: {
    background: 'gray',
  },
  completedText: {
    fontSize: 18,
    textDecoration: 'line-through',
  },
  text: {
    fontSize: 18,
  },
};
