import {FilterBy} from './../../types/enums';
import {UPDATE_FILTER, UPDATE_SEARCHTEXT, FilterActionTypes, FilterState} from './types';

const initialState: FilterState = {
  filterBy: FilterBy.all,
  searchText: '',
};

export const filterReducer = (state = initialState, action: FilterActionTypes): FilterState => {
  switch (action.type) {
    case UPDATE_FILTER:
      return {
        ...state,
        filterBy: action.payload,
      };
    case UPDATE_SEARCHTEXT:
      return {
        ...state,
        searchText: action.payload,
      };
    default:
      return state;
  }
};
