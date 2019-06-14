import {FilterBy} from './../../types/enums';
import {UPDATE_FILTER, UPDATE_SEARCHTEXT} from './types';

export const updateFilterBy = (filterBy: FilterBy) => {
  return {
    type: UPDATE_FILTER,
    payload: filterBy,
  };
};

export const updateSearchText = (searchText: string) => {
  return {
    type: UPDATE_SEARCHTEXT,
    payload: searchText,
  };
};
