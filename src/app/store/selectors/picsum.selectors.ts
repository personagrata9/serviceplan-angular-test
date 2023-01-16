import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPicsumState } from '../state.model';

const selectPiscumState = createFeatureSelector<IPicsumState>('picsumState');

export const selectItems = createSelector(
  selectPiscumState,
  state => state.items
);

export const selectItemById = (id: string) =>
  createSelector(selectPiscumState, state =>
    state.items.find(item => item.id === id)
  );
