import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItem } from 'src/app/gallery/components/item/item.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public fetchedPages$ = new BehaviorSubject<Set<number>>(new Set());
  public currentPage$ = new BehaviorSubject<number>(1);
  public itemsLimit$ = new BehaviorSubject<number>(5);
  public items$ = new BehaviorSubject<IItem[]>([]);

  public addFetchedPage = (page: number): void => {
    this.fetchedPages$.next(this.fetchedPages$.value.add(page));
  };

  public clearFetchedPage = (): void => {
    this.fetchedPages$.next(new Set());
  };

  public setCurrentPage = (page: number): void => {
    this.currentPage$.next(page);
  };

  public setItemsLimit = (limit: number): void => {
    this.itemsLimit$.next(limit);
  };

  public addItems = (items: IItem[]): void => {
    this.items$.next([...this.items$.value, ...items]);
  };

  public getItemById = (id: string): IItem | undefined =>
    this.items$.value.find(item => item.id === id);

  public clearItems = (): void => {
    this.items$.next([]);
  };
}
