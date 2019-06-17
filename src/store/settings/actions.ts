import {LOAD_SETTINGS, LOAD_SETTINGS_SUCCEED, LOAD_SETTINGS_ERROR} from './types';
import {Settings} from '../../types';

export const loadSettings = () => {
  return {
    type: LOAD_SETTINGS,
  };
};

export const loadSettingsSucceed = (settings: Settings) => {
  return {
    type: LOAD_SETTINGS_SUCCEED,
    payload: settings,
  };
};

export const loadSettingsError = (error: string) => {
  return {
    type: LOAD_SETTINGS_ERROR,
    payload: error,
  };
};
