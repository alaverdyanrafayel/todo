import React, {Component} from 'react';
import {Map, Seq} from 'immutable';
import moment from 'moment';
import {TodoList, TodoForm, TodoFilter} from './components';
import './index.css';
import {Todo} from './types';
import {Filter, SortBy, SortOrder} from './enums';

type AppState = {
  todos: Map<string, Todo>;
  filter: Filter;
  searchText: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
};

const filterButtons = [
  {
    value: Filter.all,
    label: 'All',
  },
  {
    value: Filter.uncompleted,
    label: 'Uncompleted',
  },
  {
    value: Filter.completed,
    label: 'Completed',
  },
];

class App extends Component<{}, AppState> {
  state: AppState = {
    todos: Map<string, Todo>(),
    filter: Filter.all,
    searchText: '',
    sortBy: SortBy.title,
    sortOrder: SortOrder.desc,
  };

  addTodoHandler = (data: Todo, cb: () => void): void => {
    this.setState(
      ({todos}: {todos: Map<string, Todo>}) => ({
        todos: todos.set(data.id, data),
      }),
      cb,
    );
  };

  changeSearchTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({searchText: event.target.value});
  };

  changeFilterHandler = (filter: Filter): void => {
    this.setState({filter});
  };

  toggleCompleteHandler = (id: string): void => {
    this.setState(({todos}: {todos: Map<string, Todo>}) => ({
      todos: todos.update(id, (todo) => {
        todo.completed = !todo.completed;
        return todo;
      }),
    }));
  };

  updateTodoDateHandler = (id: string, date: moment.Moment): void => {
    this.setState(({todos}: {todos: Map<string, Todo>}) => ({
      todos: todos.update(id, (todo) => {
        todo.date = date;
        return todo;
      }),
    }));
  };

  sortChangeHandler = (sortBy: SortBy): void => {
    const {sortBy: prevSortBy} = this.state;
    if (prevSortBy === sortBy) {
      this.setState(({sortOrder}: {sortOrder: string}) => ({
        sortOrder: sortOrder === SortOrder.asc ? SortOrder.desc : SortOrder.asc,
      }));
    } else {
      this.setState({sortBy, sortOrder: SortOrder.desc});
    }
  };

  compareTodoByDate(a: Todo, b: Todo) {
    return this.state.sortOrder === 'desc'
      ? moment(a.date).diff(moment(b.date))
      : moment(b.date).diff(moment(a.date));
  }

  compareTodoByTitle(a: Todo, b: Todo) {
    return this.state.sortOrder === 'desc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  }

  sortCompare(a: Todo, b: Todo, sortBy = 'date', sortOrder = 'desc'): number {
    switch (sortBy) {
      case SortBy.date:
        return this.compareTodoByDate(a, b);
      case SortBy.title:
        return this.compareTodoByTitle(a, b);
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

  filterByType = (todos: Seq.Indexed<Todo>): Seq.Indexed<Todo> => {
    const {filter: filterValue} = this.state;
    return todos.filter((todo: Todo) => {
      switch (filterValue) {
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
  };

  filterByTitle = (todos: Seq.Indexed<Todo>): Seq.Indexed<Todo> => {
    const {searchText} = this.state;
    if (!searchText) return todos;
    return todos.filter((todo: Todo) => todo.title.includes(searchText));
  };
  filter = (todos: Seq.Indexed<Todo>): Seq.Indexed<Todo> => {
    return this.filterByTitle(this.filterByType(todos));
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
