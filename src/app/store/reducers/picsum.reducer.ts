import { createReducer, on } from '@ngrx/store';
import { fetchItems } from '../actions/picsum.actions';
import { InitialPicsumState, IPicsumState } from '../state.model';

export const picsumReducer = createReducer(
  InitialPicsumState,
  on(
    fetchItems,
    (state, { items }): IPicsumState => ({
      ...state,
      items,
    })
  )
);
