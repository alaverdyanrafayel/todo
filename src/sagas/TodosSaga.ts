import moment from 'moment';
import {Map} from 'immutable';
import {TodoModel} from './../models/todo';
import {put, takeLatest} from 'redux-saga/effects';
import * as actions from '../store/todos/actions';
import {ADD_TODO, LOAD_TODOS, AddToDoAction} from '../store/todos/types';

function* addTodo(action: AddToDoAction) {
  try {
    const storageTodos = localStorage.getItem('todos');
    const todos = !!storageTodos ? JSON.parse(storageTodos) : [];
    todos.push(action.payload.toJS());
    localStorage.setItem('todos', JSON.stringify(todos));
    yield put(actions.addTodoSucceed(action.payload));
  } catch (error) {
    yield put(actions.addTodoFailed(error.message));
  }
}

function* loadTodos() {
  try {
    const storageTodos = localStorage.getItem('todos');
    const todos = !!storageTodos ? JSON.parse(storageTodos) : [];
    const todosMap = todos.reduce((acc: Map<string, TodoModel>, item: TodoModel) => {
      const todo = TodoModel.create({...item, date: moment(item.date, 'YYYY-MM-DD')});
      return acc.set(todo.id, todo);
    }, Map<string, TodoModel>());
    yield put(actions.loadTodosSucceed(todosMap));
  } catch (err) {
    console.log(err);
  }
}

function* TodosSaga() {
  yield takeLatest(ADD_TODO, addTodo);
  yield takeLatest(LOAD_TODOS, loadTodos);
}

export default TodosSaga;
