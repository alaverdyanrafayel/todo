import React from 'react';
import moment from 'moment';

export const TodoList = ({
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
          <th onClick={() => sortChangeHandler('title')}>
            Title
            {sortBy === 'title' && sortOrder === 'desc' && <i className='sort-by-desc' />}
            {sortBy === 'title' && sortOrder === 'asc' && <i className='sort-by-asc' />}
          </th>
          <th onClick={() => sortChangeHandler('date')}>
            Date
            {sortBy === 'date' && sortOrder === 'desc' && <i className='sort-by-desc' />}
            {sortBy === 'date' && sortOrder === 'asc' && <i className='sort-by-asc' />}
          </th>
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
              <td>{moment(date).format('YYYY-MM-DD')}</td>
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
