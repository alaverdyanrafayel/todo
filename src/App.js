import React, {Component} from 'react';
import {Map} from 'immutable';
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
    todos: Map({}),
    filter: 'all',
  };

  addTodoHandler = (data, cb) => {
    this.setState(
      ({todos}) => ({
        todos: todos.set(data.id, data),
      }),
      cb,
    );
  };

  changeFilterHandler = (filter) => {
    this.setState({filter});
  };

  toggleCompleteHandler = (id) => {
    this.setState(({todos}) => ({
      todos: todos.updateIn([id, 'completed'], (completed) => !completed),
    }));
  };

  updateTodoDateHandler = (id, date) => {
    this.setState(({todos}) => ({
      todos: todos.setIn([id, 'date'], date),
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
        default:
          throw new Error('Unknown filter');
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
          todos={visibleTodos.valueSeq()}
          toggleCompleteHandler={this.toggleCompleteHandler}
          updateTodoDateHandler={this.updateTodoDateHandler}
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
