import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public initialCardHeightPx!: number;

  public itemsLimit$ = new BehaviorSubject<number>(5);
  public pageNumber$ = new BehaviorSubject<number>(1);
  // public itemsMinIndex$ = new BehaviorSubject<number>(0);

  public setItemsLimit = (value: number): void => {
    this.itemsLimit$.next(value);
  };

  public setPageNumber = (value: number): void => {
    this.pageNumber$.next(value);
  };

  public setInitialCardHeight = (value: number): void => {
    this.initialCardHeightPx = value;
  };
}
