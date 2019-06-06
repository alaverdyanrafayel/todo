import React, {Component} from 'react';
import moment from 'moment';
import {TodoList, TodoForm, TodoFilter} from './components';
import './index.css';

const filterButtons = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'uncompleted',
    label: 'Uncompleted',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
];

class App extends Component {
  state = {
    todos: [],
    filter: 'all',
  };

  addTodoHandler = (data, cb) => {
    this.setState(({todos}) => ({todos: [...todos, data]}), cb);
  };

  changeFilterHandler = (filter) => {
    this.setState({filter});
  };

  toggleCompleteHandler = (id) => {
    this.setState(({todos}) => ({
      todos: todos.map((todo) => {
        if (todo.id === id) return {...todo, completed: !todo.completed};
        else return todo;
      }),
    }));
  };

  incrDateHandler = (id) => {
    this.setState(({todos}) => ({
      todos: todos.map((todo) => {
        if (todo.id === id)
          return {
            ...todo,
            date: moment(todo.date)
              .add(1, 'days')
              .format('YYYY-MM-DD'),
          };
        else return todo;
      }),
    }));
  };

  decrDateHandler = (id) => {
    this.setState(({todos}) => ({
      todos: todos.map((todo) => {
        if (todo.id === id)
          return {
            ...todo,
            date: moment(todo.date)
              .subtract(1, 'days')
              .format('YYYY-MM-DD'),
          };
        else return todo;
      }),
    }));
  };

  render() {
    const {todos, filter} = this.state;
    const visibleTodos = todos.filter((todo) => {
      switch (filter) {
        case 'all':
          return true;
        case 'completed':
          return todo.completed;
        case 'uncompleted':
          return !todo.completed;
      }
    });
    return (
      <div style={styles.appContainer}>
        <TodoForm addTodoHandler={this.addTodoHandler} />
        <TodoFilter
          filterButtons={filterButtons}
          filter={filter}
          changeFilterHandler={this.changeFilterHandler}
        />
        <TodoList
          todos={visibleTodos}
          toggleCompleteHandler={this.toggleCompleteHandler}
          decrDateHandler={this.decrDateHandler}
          incrDateHandler={this.incrDateHandler}
        />
      </div>
    );
  }
}

const styles = {
  appContainer: {
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;
