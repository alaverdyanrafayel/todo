import {fork, all} from 'redux-saga/effects';
import TodosSaga from './TodosSaga';
import SettingsSaga from './SettingsSaga';

export default function*() {
  yield all([fork(TodosSaga), fork(SettingsSaga)]);
}
