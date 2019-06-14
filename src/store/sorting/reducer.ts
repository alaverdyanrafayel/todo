import {SortBy, SortOrder} from '../../types/enums';
import {UPDATE_SORTING, SortingActionTypes, SortingState} from './types';

const initialState: SortingState = {
  sortBy: SortBy.title,
  sortOrder: SortOrder.desc,
};

export const sortingReducer = (state = initialState, action: SortingActionTypes): SortingState => {
  switch (action.type) {
    case UPDATE_SORTING:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
