import {
  SettingsActionTypes,
  SettingsState,
  LOAD_SETTINGS_SUCCEED,
  LOAD_SETTINGS_ERROR,
} from './types';

const initialState: SettingsState = {
  settings: {
    themeColor: 'gray',
    showDates: true,
    showFiltersSection: true,
    filters: {all: true, uncompleted: true, completed: true},
  },
  error: '',
};

export const settingsReducer = (
  state = initialState,
  action: SettingsActionTypes,
): SettingsState => {
  switch (action.type) {
    case LOAD_SETTINGS_SUCCEED:
      return {...state, settings: action.payload};
    default:
      return state;

    case LOAD_SETTINGS_ERROR:
      return {...state, error: action.payload};
  }
};
