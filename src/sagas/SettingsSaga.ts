import {put, takeLatest} from 'redux-saga/effects';
//@ts-ignore
import {buildYup} from 'json-schema-to-yup';
import * as actions from '../store/settings/actions';
import settingsFile from '../settings.json';
import schema from '../schema.json';
import {LOAD_SETTINGS} from '../store/settings/types';

function* loadSettings() {
  try {
    const storageSettings = localStorage.getItem('settings');
    let settings;
    if (!storageSettings) {
      localStorage.setItem('settings', JSON.stringify(settingsFile));
      settings = settingsFile;
    } else {
      settings = JSON.parse(storageSettings);
    }
    const yupSchema = buildYup(schema, {});
    yield yupSchema.validate(settings);
    yield put(actions.loadSettingsSucceed(settings));
  } catch (error) {
    yield put(actions.loadSettingsError(error.message));
  }
}

function* SettingsSaga() {
  yield takeLatest(LOAD_SETTINGS, loadSettings);
}

export default SettingsSaga;
