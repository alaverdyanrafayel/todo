import React, {Component} from 'react';
import {Map} from 'immutable';
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
    todos: Map({}),
    filter: 'all',
    searchText: '',
    sortBy: 'date',
    sortOrder: 'desc',
  };

  addTodoHandler = (data, cb) => {
    this.setState(
      ({todos}) => ({
        todos: todos.set(data.id, data),
      }),
      cb,
    );
  };

  changeSearchTextHandler = ({target: {value: searchText}}) => {
    this.setState({searchText});
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

  sortChangeHandler = (sortBy) => {
    const {sortBy: prevSortBy} = this.state;
    if (prevSortBy === sortBy) {
      this.setState(({sortOrder}) => ({sortOrder: sortOrder === 'asc' ? 'desc' : 'asc'}));
    } else {
      this.setState({sortBy, sortOrder: 'desc'});
    }
  };

  compareTodoByDate(a, b) {
    return this.state.sortOrder === 'desc'
      ? moment(a.date).diff(moment(b.date))
      : moment(b.date).diff(moment(a.date));
  }

  compareTodoByTitle(a, b) {
    return this.state.sortOrder === 'desc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  }

  sortCompare(a, b) {
    const {sortBy} = this.state;
    switch (sortBy) {
      case 'date':
        return this.compareTodoByDate(a, b);
      case 'title':
        return this.compareTodoByTitle(a, b);
      default:
        throw new Error('Incorrect sortBy value');
    }
  }

  sort = (todos) => {
    const {sortBy, sortOrder} = this.state;
    return todos.sort((a, b) => {
      return this.sortCompare(a, b, sortBy, sortOrder);
    });
  };
  filter = (todos) => {
    const {filter: filterValue, searchText} = this.state;
    return todos.filter((todo) => {
      switch (filterValue) {
        case 'all':
          return todo.title.includes(searchText);
        case 'completed':
          return todo.completed && todo.title.includes(searchText);
        case 'uncompleted':
          return !todo.completed && todo.title.includes(searchText);
        default:
          throw new Error('Unknown filter');
      }
    });
  };

  render() {
    const {todos, filter, searchText, sortBy, sortOrder} = this.state;
    const visibleTodos = this.sort(this.filter(todos.valueSeq()));

    return (
      <div style={styles.appContainer}>
        <TodoForm addTodoHandler={this.addTodoHandler} />
        <TodoFilter
          filterButtons={filterButtons}
          filter={filter}
          searchText={searchText}
          changeFilterHandler={this.changeFilterHandler}
          changeSearchTextHandler={this.changeSearchTextHandler}
        />
        <TodoList
          todos={visibleTodos}
          sortBy={sortBy}
          sortOrder={sortOrder}
          sortChangeHandler={this.sortChangeHandler}
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
