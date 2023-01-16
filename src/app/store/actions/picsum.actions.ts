import { createAction, props } from '@ngrx/store';
import { IItem } from 'src/app/gallery/components/item/item.model';

const actionSource = '[PICSUM]';

export const fetchItems = createAction(
  `${actionSource} FETCH ITEMS`,
  props<{ items: IItem[] }>()
);
