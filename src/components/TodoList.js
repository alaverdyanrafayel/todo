import React from 'react';

export const TodoList = ({todos, toggleCompleteHandler, incrDateHandler, decrDateHandler}) => {
  return (
    <div>
      {todos.map(({title, id, completed, date}) => {
        return (
          <div style={completed ? styles.completedContainer : styles.container} key={id}>
            <input type='checkbox' checked={completed} onChange={() => toggleCompleteHandler(id)} />
            <p style={completed ? styles.completedText : styles.text}>
              {title} - {date}
            </p>
            <button onClick={() => incrDateHandler(id)}>+</button>
            <button onClick={() => decrDateHandler(id)}>-</button>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: 3,
    width: 400,
    background: 'lightgray',
    borderRadius: 4,
  },
  completedContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: 3,
    width: 400,
    background: 'gray',
    borderRadius: 4,
  },
  completedText: {
    fontSize: 18,
    textDecoration: 'line-through',
  },
  text: {
    fontSize: 18,
  },
};
