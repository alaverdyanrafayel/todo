import React, {Component} from 'react';
import {Map, Seq} from 'immutable';
import moment from 'moment';
import {TodoList} from './TodoList';
import {TodoForm} from './TodoForm';
import {TodoFilter} from './TodoFilter';
import {FilterBy, SortBy, SortOrder} from '../../types';
import {TodoModel} from '../../models/todo';
import settings from '../../settings.json';

type AppProps = {
  todos: Seq.Indexed<TodoModel>;
  setTodos: (todos: Map<string, TodoModel>) => void;
  addTodo: (todo: TodoModel) => void;
  toggleComplete: (id: string) => void;
  updateTodo: (id: string, data: {date: moment.Moment}) => void;
  updateSorting: (data: {sortBy: SortBy; sortOrder: SortOrder}) => void;
  updateFilterBy: (filterBy: FilterBy) => void;
  updateSearchText: (searchText: string) => void;
  sortBy: SortBy;
  sortOrder: SortOrder;
  filterBy: FilterBy;
  searchText: string;
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

export class TodosComponent extends Component<AppProps, {}> {
  async componentDidMount() {
    this.loadTodoFromSettings();
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
    this.props.updateSearchText(event.target.value);
  };

  changeFilterHandler = (filterBy: FilterBy): void => {
    this.props.updateFilterBy(filterBy);
  };

  toggleCompleteHandler = (id: string): void => {
    this.props.toggleComplete(id);
  };

  updateTodoDateHandler = (id: string, date: moment.Moment): void => {
    this.props.updateTodo(id, {date});
  };

  sortChangeHandler = (sortBy: SortBy): void => {
    const {sortBy: prevSortBy, sortOrder: prevSortOrder} = this.props;
    if (prevSortBy === sortBy) {
      const sortOrder = prevSortOrder === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
      this.props.updateSorting({sortBy, sortOrder});
    } else {
      this.props.updateSorting({sortBy, sortOrder: SortOrder.desc});
    }
  };

  render() {
    const {sortBy, sortOrder, filterBy, searchText, todos} = this.props;

    const visibleFilterButtons = filterButtons.filter((button) => !!settings.filters[button.value]);

    return (
      <>
        <TodoForm addTodoHandler={this.addTodoHandler} />
        {!!settings.showFiltersSection && (
          <TodoFilter
            filterButtons={visibleFilterButtons}
            filterBy={filterBy}
            searchText={searchText}
            changeFilterHandler={this.changeFilterHandler}
            changeSearchTextHandler={this.changeSearchTextHandler}
          />
        )}
        <TodoList
          todos={todos}
          sortBy={sortBy}
          sortOrder={sortOrder}
          sortChangeHandler={this.sortChangeHandler}
          toggleCompleteHandler={this.toggleCompleteHandler}
          updateTodoDateHandler={this.updateTodoDateHandler}
        />
      </>
    );
  }
}
