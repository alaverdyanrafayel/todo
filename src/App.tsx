import React, {Component} from 'react';
import {Map, Seq} from 'immutable';
import moment from 'moment';
import {TodoList, TodoForm, TodoFilter} from './components';
import './index.css';
import {Todo} from './types';

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

type AppState = {
  todos: Map<string, Todo>;
  filter: string;
  searchText: string;
  sortBy: string;
  sortOrder: string;
};

type AppProps = {};

class App extends Component<AppProps, AppState> {
  state = {
    todos: Map<string, Todo>(),
    filter: 'all',
    searchText: '',
    sortBy: 'date',
    sortOrder: 'desc',
  };

  addTodoHandler = (data: Todo, cb: Function): void => {
    this.setState(
      ({todos}: {todos: Map<string, Todo>}) => ({
        todos: todos.set(data.id, data),
      }),
      cb(),
    );
  };

  changeSearchTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({searchText: event.target.value});
  };

  changeFilterHandler = (filter: string): void => {
    this.setState({filter});
  };

  toggleCompleteHandler = (id: string): void => {
    this.setState(({todos}: {todos: Map<string, Todo>}) => ({
      todos: todos.updateIn([id, 'completed'], (completed) => !completed),
    }));
  };

  updateTodoDateHandler = (id: string, date: moment.Moment): void => {
    this.setState(({todos}: {todos: Map<string, Todo>}) => ({
      todos: todos.setIn([id, 'date'], date),
    }));
  };

  sortChangeHandler = (sortBy: string): void => {
    const {sortBy: prevSortBy} = this.state;
    if (prevSortBy === sortBy) {
      this.setState(({sortOrder}: {sortOrder: string}) => ({
        sortOrder: sortOrder === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      this.setState({sortBy, sortOrder: 'desc'});
    }
  };

  sortCompare(a: Todo, b: Todo, sortBy = 'date', sortOrder = 'desc'): number {
    switch (sortBy) {
      case 'date':
        return sortOrder === 'desc'
          ? moment(a.date).diff(moment(b.date))
          : moment(b.date).diff(moment(a.date));
      case 'title':
        return sortOrder === 'desc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      default:
        throw new Error('Incorrect sortBy value');
    }
  }

  sort = (todos: Seq.Indexed<Todo>): Seq.Indexed<Todo> => {
    const {sortBy, sortOrder} = this.state;
    return todos.sort((a, b) => {
      return this.sortCompare(a, b, sortBy, sortOrder);
    });
  };
  filter = (todos: Seq.Indexed<Todo>): Seq.Indexed<Todo> => {
    const {filter: filterValue, searchText} = this.state;
    return todos.filter((todo: Todo) => {
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
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;
