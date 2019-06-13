import {Map} from 'immutable';
import {TodoModel} from '../../models/todo';
import {
  SET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  TOGGLE_COMPLETE,
  TodosActionTypes,
  TodosState,
} from './types';

const initialState: TodosState = {
  todos: Map<string, TodoModel>(),
};

export const todosReducer = (state = initialState, action: TodosActionTypes): TodosState => {
  switch (action.type) {
    case SET_TODOS:
      return {...state, todos: action.payload};

    case ADD_TODO:
      return {...state, todos: state.todos.set(action.payload.id, action.payload)};
    case TOGGLE_COMPLETE:
      return {
        ...state,
        todos: state.todos.update(action.payload, (todo) => todo.set('completed', !todo.completed)),
      };

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.update(action.payload.id, (todo) => {
          return todo.merge(action.payload.data);
        }),
      };

    default:
      return state;
  }
};
