import {FilterBy} from './../../types/enums';
import {updateFilterBy, updateSearchText} from './actions';

export const UPDATE_FILTER = 'UPDATE_FILTER' as 'UPDATE_FILTER';
export const UPDATE_SEARCHTEXT = 'UPDATE_SEARCHTEXT' as 'UPDATE_SEARCHTEXT';

type updateFilterByAction = ReturnType<typeof updateFilterBy>;
type updateSearchTextAction = ReturnType<typeof updateSearchText>;

export type FilterActionTypes = updateFilterByAction | updateSearchTextAction;

export type FilterState = {
  filterBy: FilterBy;
  searchText: string;
};
