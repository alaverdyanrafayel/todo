import { SortBy, SortOrder } from './../../types/enums';
import { UPDATE_SORTING } from './types';


export const updateSorting = ( data: {sortBy: SortBy, sortOrder: SortOrder} ) => {
    return {
      type: UPDATE_SORTING,
      payload: data
    };
  };
  