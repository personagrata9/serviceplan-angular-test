import { IItem } from '../gallery/components/item/item.model';

export interface IAppState {
  picsumState: IPicsumState;
}

export interface IPicsumState {
  items: IItem[];
}

export const InitialPicsumState: IPicsumState = {
  items: [],
};

export const InitialAppState: IAppState = {
  picsumState: InitialPicsumState,
};
