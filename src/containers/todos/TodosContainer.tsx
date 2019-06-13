import {connect} from 'react-redux';
import * as Redux from 'redux';
import moment from 'moment';
import {Map} from 'immutable';
import * as todoActions from '../../store/todos/actions';
import {ReduxState} from '../../store';
import {TodoModel} from '../../models/todo';
import {TodosComponent} from '../../components';

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

export const TodosContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodosComponent);
