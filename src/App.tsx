import React, {Component} from 'react';
import * as Redux from 'redux';
import {connect} from 'react-redux';
import {Map, Seq} from 'immutable';
import moment from 'moment';
//@ts-ignore
import {buildYup} from 'json-schema-to-yup';
import {TodoList, TodoForm, TodoFilter} from './components';
import './index.css';
import {FilterBy, SortBy, SortOrder} from './types';
import {TodoModel} from './models/todo';
import settings from './settings.json';
import schema from './schema.json';
import * as todoActions from './store/todos/actions';
import {ReduxState} from './store';

type AppProps = {
  todos: Map<string, TodoModel>;
  setTodos: (todos: Map<string, TodoModel>) => void;
  addTodo: (todo: TodoModel) => void;
  toggleComplete: (id: string) => void;
  updateTodo: (id: string, data: {date: moment.Moment}) => void;
};

type AppState = {
  filter: FilterBy;
  searchText: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
  error: string;
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

class App extends Component<AppProps, AppState> {
  state: AppState = {
    filter: FilterBy.all,
    searchText: '',
    sortBy: SortBy.title,
    sortOrder: SortOrder.desc,
    error: '',
  };

  async componentDidMount() {
    try {
      await this.checkSettingsFile();
      this.loadTodoFromSettings();
    } catch (error) {
      this.setState({error: error.message});
    }
  }

  checkSettingsFile() {
    const yupSchema = buildYup(schema, {});
    return yupSchema.validate(settings);
  }

  loadTodoFromSettings = () => {
    if (settings.todos) {
      const todos = settings.todos.reduce((acc, item) => {
        const todo = TodoModel.create({...item, date: moment(item.date, 'YYYY-MM-DD')});
        return acc.set(todo.id, todo);
      }, Map<string, TodoModel>());
      this.props.setTodos(todos);
    }
  };

  addTodoHandler = (data: Partial<TodoModel>, cb: () => void): void => {
    this.props.addTodo(TodoModel.create(data));
    cb();
  };

  changeSearchTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({searchText: event.target.value});
  };

  changeFilterHandler = (filter: FilterBy): void => {
    this.setState({filter});
  };

  toggleCompleteHandler = (id: string): void => {
    this.props.toggleComplete(id);
  };

  updateTodoDateHandler = (id: string, date: moment.Moment): void => {
    this.props.updateTodo(id, {date});
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
    const {filter, searchText, sortBy, sortOrder, error} = this.state;
    if (!!error) return <div>{error}</div>;

    const visibleTodos = this.sort(this.filter(this.props.todos.valueSeq()));
    const visibleFilterButtons = filterButtons.filter((button) => !!settings.filters[button.value]);

    return (
      <div style={styles.appContainer}>
        <TodoForm addTodoHandler={this.addTodoHandler} />
        {!!settings.showFiltersSection && (
          <TodoFilter
            filterButtons={visibleFilterButtons}
            filter={filter}
            searchText={searchText}
            changeFilterHandler={this.changeFilterHandler}
            changeSearchTextHandler={this.changeSearchTextHandler}
          />
        )}
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
    background: settings.themeColor,
    padding: 30,
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

const mapStateToProps = (state: ReduxState) => ({
  todos: state.todos.todos,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>) => ({
  setTodos: (todos: Map<string, TodoModel>) => dispatch(todoActions.setTodos(todos)),
  addTodo: (todo: TodoModel) => dispatch(todoActions.addTodo(todo)),
  updateTodo: (id: string, data: {date: moment.Moment}) =>
    dispatch(todoActions.updateTodo(id, data)),
  toggleComplete: (id: string) => dispatch(todoActions.toggleComplete(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
