import {Map} from 'immutable';
import moment from 'moment';
import {
  TOGGLE_COMPLETE,
  UPDATE_TODO,
  LOAD_TODOS,
  LOAD_TODOS_SUCCEED,
  ADD_TODO_SUCCEED,
  ADD_TODO_FAILED,
  ADD_TODO,
} from './types';
import {TodoModel} from '../../models/todo';

export const loadTodos = () => {
  return {
    type: LOAD_TODOS,
  };
};
export const loadTodosSucceed = (todos: Map<string, TodoModel>) => {
  return {
    type: LOAD_TODOS_SUCCEED,
    payload: todos,
  };
};
export const addTodo = (todo: TodoModel) => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};
export const addTodoSucceed = (todo: TodoModel) => {
  return {
    type: ADD_TODO_SUCCEED,
    payload: todo,
  };
};

export function addTodoFailed(todo: TodoModel) {
  return {
    type: ADD_TODO_FAILED,
    payload: todo,
  };
}

export const toggleComplete = (id: string) => {
  return {
    type: TOGGLE_COMPLETE,
    payload: id,
  };
};

export const updateTodo = (id: string, data: {date: moment.Moment}) => {
  return {
    type: UPDATE_TODO,
    payload: {id, data},
  };
};
