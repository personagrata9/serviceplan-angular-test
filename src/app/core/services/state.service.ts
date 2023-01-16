import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public initialCardHeightPx!: number;

  public currentPage$ = new BehaviorSubject<number>(1);
  public itemsLimit$ = new BehaviorSubject<number>(5);

  public setItemsLimit = (value: number): void => {
    this.itemsLimit$.next(value);
  };

  public setCurrentPage = (value: number): void => {
    this.currentPage$.next(value);
  };

  public setInitialCardHeight = (value: number): void => {
    this.initialCardHeightPx = value;
  };
}
