import React, {Component} from 'react';
import {Map, Seq} from 'immutable';
import moment from 'moment';
import {TodoList, TodoForm, TodoFilter} from './components';
import './index.css';
import {FilterBy, SortBy, SortOrder} from './types';
import {TodoModel} from './models/todo';

type AppState = {
  todos: Map<string, TodoModel>;
  filter: FilterBy;
  searchText: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
};
const filterButtons = [
  {
    value: FilterBy.all,
    label: 'All',
  },
  {
    value: FilterBy.uncompleted,
    label: 'Uncompleted',
  },
  {
    value: FilterBy.completed,
    label: 'Completed',
  },
];

class App extends Component<{}, AppState> {
  state: AppState = {
    todos: Map({}),
    filter: FilterBy.all,
    searchText: '',
    sortBy: SortBy.title,
    sortOrder: SortOrder.desc,
  };

  addTodoHandler = (data: TodoModel, cb: () => void): void => {
    this.setState(({todos}: {todos: Map<string, TodoModel>}) => {
      const todo = TodoModel.create(data);
      return {
        todos: todos.set(todo.id, todo),
      };
    }, cb);
  };

  changeSearchTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({searchText: event.target.value});
  };

  changeFilterHandler = (filter: FilterBy): void => {
    this.setState({filter});
  };

  toggleCompleteHandler = (id: string): void => {
    this.setState(({todos}: {todos: Map<string, TodoModel>}) => ({
      todos: todos.update(id, (todo) => {
        return todo.set('completed', !todo.completed);
      }),
    }));
  };

  updateTodoDateHandler = (id: string, date: moment.Moment): void => {
    this.setState(({todos}: {todos: Map<string, TodoModel>}) => ({
      todos: todos.update(id, (todo) => {
        return todo.set('date', date);
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

  compareTodoByDate(a: TodoModel, b: TodoModel) {
    return this.state.sortOrder === SortOrder.desc
      ? moment(a.date).diff(moment(b.date))
      : moment(b.date).diff(moment(a.date));
  }

  compareTodoByTitle(a: TodoModel, b: TodoModel) {
    return this.state.sortOrder === 'desc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  }

  sortCompare(a: TodoModel, b: TodoModel, sortBy = 'date'): number {
    switch (sortBy) {
      case SortBy.date:
        return this.compareTodoByDate(a, b);
      case SortBy.title:
        return this.compareTodoByTitle(a, b);
      default:
        throw new Error('Incorrect sortBy value');
    }
  }

  sort = (todos: Seq.Indexed<TodoModel>): Seq.Indexed<TodoModel> => {
    const {sortBy} = this.state;
    return todos.sort((a, b) => {
      return this.sortCompare(a, b, sortBy);
    });
  };

  filterByType = (todos: Seq.Indexed<TodoModel>): Seq.Indexed<TodoModel> => {
    const {filter: filterValue} = this.state;
    return todos.filter((todo: TodoModel) => {
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

  filterByTitle = (todos: Seq.Indexed<TodoModel>): Seq.Indexed<TodoModel> => {
    const {searchText} = this.state;
    if (!searchText) return todos;
    return todos.filter((todo: TodoModel) => todo.title.includes(searchText));
  };
  filter = (todos: Seq.Indexed<TodoModel>): Seq.Indexed<TodoModel> => {
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
