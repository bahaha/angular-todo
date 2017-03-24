export interface Todo {
  text: string;
  isCompleted: boolean;
}


export type Filters = 'All' | 'Active' | 'Completed';
export interface FilterTypes {
  all: Filters,
  active: Filters,
  completed: Filters,
}
export const filterTypes: FilterTypes = {
  all: 'All' as Filters,
  active: 'Active' as Filters,
  completed: 'Completed' as Filters,
};
