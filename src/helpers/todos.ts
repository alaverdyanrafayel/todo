import moment from 'moment';
import {TodoModel} from '../models/todo';
import {Seq} from 'immutable';
import {SortOrder, SortBy, FilterBy} from '../types';

const compareTodoByDate = (a: TodoModel, b: TodoModel, sortOrder: SortOrder) => {
  return sortOrder === SortOrder.desc
    ? moment(a.date).diff(moment(b.date))
    : moment(b.date).diff(moment(a.date));
};

const compareTodoByTitle = (a: TodoModel, b: TodoModel, sortOrder: SortOrder) => {
  return sortOrder === 'desc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
};

const sortCompare = (
  a: TodoModel,
  b: TodoModel,
  sortBy = 'date',
  sortOrder = SortOrder.desc,
): number => {
  switch (sortBy) {
    case SortBy.date:
      return compareTodoByDate(a, b, sortOrder);
    case SortBy.title:
      return compareTodoByTitle(a, b, sortOrder);
    default:
      throw new Error('Incorrect sortBy value');
  }
};

export const sort = (
  todos: Seq.Indexed<TodoModel>,
  sortBy: SortBy,
  sortOrder: SortOrder,
): Seq.Indexed<TodoModel> => {
  return todos.sort((a, b) => {
    return sortCompare(a, b, sortBy, sortOrder);
  });
};

const filterByType = (
  todos: Seq.Indexed<TodoModel>,
  filterBy: FilterBy,
): Seq.Indexed<TodoModel> => {
  return todos.filter((todo: TodoModel) => {
    switch (filterBy) {
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

const filterByTitle = (
  todos: Seq.Indexed<TodoModel>,
  searchText: string,
): Seq.Indexed<TodoModel> => {
  if (!searchText) return todos;
  return todos.filter((todo: TodoModel) => todo.title.includes(searchText));
};
export const filter = (
  todos: Seq.Indexed<TodoModel>,
  filterBy: FilterBy,
  searchText: string,
): Seq.Indexed<TodoModel> => {
  return filterByTitle(filterByType(todos, filterBy), searchText);
};
