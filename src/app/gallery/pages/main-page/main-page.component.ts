import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { StateService } from 'src/app/core/services/state.service';
import { PicsumService } from '../../services/picsum.service';
import { IItem } from '../../components/item/item.model';
import { selectItems } from 'src/app/store/selectors/picsum.selectors';
import { fetchItems } from 'src/app/store/actions/picsum.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  private currentPage!: number;
  public itemsLimit!: number;
  public itemsMinIndex = 0;
  public itemsMaxIndex!: number;

  private items$!: Observable<IItem[]>;
  public items!: IItem[];

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private stateService: StateService,
    private picsumServise: PicsumService
  ) {}

  ngOnInit(): void {
    this.updateItemsLimit();
    this.updateCurrentPage();

    this.items$ = this.store.select(selectItems);
    this.updateItems();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private updateCurrentPage = (): void => {
    const subscription = this.stateService.currentPage$.subscribe(page => {
      this.currentPage = page;
      this.fetchItems();
    });
    this.subscriptions.push(subscription);
  };

  private updateItemsLimit = (): void => {
    const subscription = this.stateService.itemsLimit$.subscribe(limit => {
      this.itemsLimit = limit;
    });
    this.subscriptions.push(subscription);
  };

  private updateItems = (): void => {
    const subscription = this.items$.subscribe(items => {
      this.items = items;
    });
    this.subscriptions.push(subscription);
  };

  private fetchItems = () => {
    const subscription = this.picsumServise
      .getItems(this.currentPage, this.itemsLimit)
      .subscribe({
        next: (items: IItem[]) => {
          this.store.dispatch(fetchItems({ items }));
        },
        error: () => {
          this.store.dispatch(fetchItems({ items: [] }));
        },
      });

    this.subscriptions.push(subscription);
  };
}
