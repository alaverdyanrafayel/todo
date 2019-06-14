import {createSelector} from 'reselect';
import {ReduxState} from '../store';
import {TodoModel} from '../models/todo';
import {sort, filter} from '../helpers/todos';
import {Seq} from 'immutable';

const getTodos = (state: ReduxState) => state.todos.todos;
const getFilterBy = (state: ReduxState) => state.filter.filterBy;
const getSearchText = (state: ReduxState) => state.filter.searchText;
const getSorting = (state: ReduxState) => state.sorting;

export const getSortedAndFileredTodos = createSelector(
  getTodos,
  getFilterBy,
  getSearchText,
  getSorting,
  (todos, filterBy, searchText, {sortOrder, sortBy}): Seq.Indexed<TodoModel> => {
    const filteredTodos = filter(todos.valueSeq(), filterBy, searchText);
    return sort(filteredTodos, sortBy, sortOrder);
  },
);
