import {connect} from 'react-redux';
import * as Redux from 'redux';
import moment from 'moment';
import {Map} from 'immutable';
import * as todoActions from '../../store/todos/actions';
import * as sortingActions from '../../store/sorting/actions';
import * as filterActions from '../../store/filter/actions';
import {ReduxState} from '../../store';
import {TodoModel} from '../../models/todo';
import {TodosComponent} from '../../components';
import {SortBy, SortOrder, FilterBy} from '../../types';
import {getSortedAndFileredTodos} from '../../selectors';

const mapStateToProps = (state: ReduxState) => ({
  todos: getSortedAndFileredTodos(state),
  sortBy: state.sorting.sortBy,
  sortOrder: state.sorting.sortOrder,
  filterBy: state.filter.filterBy,
  searchText: state.filter.searchText,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>) => ({
  setTodos: (todos: Map<string, TodoModel>) => dispatch(todoActions.setTodos(todos)),
  addTodo: (todo: TodoModel) => dispatch(todoActions.addTodo(todo)),
  updateTodo: (id: string, data: {date: moment.Moment}) =>
    dispatch(todoActions.updateTodo(id, data)),
  toggleComplete: (id: string) => dispatch(todoActions.toggleComplete(id)),
  updateSorting: (data: {sortBy: SortBy; sortOrder: SortOrder}) =>
    dispatch(sortingActions.updateSorting(data)),
  updateFilterBy: (filterBy: FilterBy) => dispatch(filterActions.updateFilterBy(filterBy)),
  updateSearchText: (searchText: string) => dispatch(filterActions.updateSearchText(searchText)),
});

export const TodosContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodosComponent);
