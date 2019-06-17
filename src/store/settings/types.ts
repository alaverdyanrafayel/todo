import {loadSettings, loadSettingsSucceed, loadSettingsError} from './actions';
import {Settings} from '../../types';

export const LOAD_SETTINGS = 'LOAD_SETTINGS' as 'LOAD_SETTINGS';
export const LOAD_SETTINGS_SUCCEED = 'LOAD_SETTINGS_SUCCEED' as 'LOAD_SETTINGS_SUCCEED';
export const LOAD_SETTINGS_ERROR = 'LOAD_SETTINGS_ERROR' as 'LOAD_SETTINGS_ERROR';

type LoadSettingsAction = ReturnType<typeof loadSettings>;

type LoadSettingsSucceedAction = ReturnType<typeof loadSettingsSucceed>;

type LoadSettingsErrorAction = ReturnType<typeof loadSettingsError>;

export type SettingsActionTypes =
  | LoadSettingsAction
  | LoadSettingsSucceedAction
  | LoadSettingsErrorAction;

export type SettingsState = {
  settings: Settings;
  error: string;
};
