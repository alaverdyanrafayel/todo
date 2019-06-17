import {FilterBy} from './enums';
export type Settings = {
  themeColor: string;
  showDates: boolean;
  showFiltersSection: boolean;
  filters: {[key in FilterBy]: boolean};
};
