import {SortBy, SortOrder} from './../../types/enums';
import {updateSorting} from './actions';

export const UPDATE_SORTING = 'UPDATE_SORTING' as 'UPDATE_SORTING';

type UpdateSortingAction = ReturnType<typeof updateSorting>;

export type SortingActionTypes = UpdateSortingAction;

export type SortingState = {
  sortBy: SortBy;
  sortOrder: SortOrder;
};
