import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/core/services/state.service';
import { PicsumService } from '../../services/picsum.service';
import { IItem } from '../../components/item/item.model';
import { splitArrayIntoChunks } from 'src/app/helpers/split-array-into-chunks';
import { throttleScroll } from 'src/app/helpers/throttle-scroll';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  private fetchedPages!: Set<number>;
  private currentPage!: number;

  public itemsLimit!: number;
  public itemsMinIndex = 0;
  public itemsMaxIndex!: number;

  private items!: IItem[];
  public lists!: IItem[][];

  private isScrolled = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private stateService: StateService,
    private picsumServise: PicsumService
  ) {}

  ngOnInit(): void {
    this.updateFetchedPages();
    this.updateItemsLimit();
    this.updateItems();

    this.updateCurrentPage();

    window.addEventListener('scroll', throttleScroll(this.onScroll, 2000));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private updateFetchedPages = (): void => {
    const subscription = this.stateService.fetchedPages$.subscribe(pages => {
      this.fetchedPages = pages;
    });
    this.subscriptions.push(subscription);
  };

  private updateCurrentPage = (): void => {
    const subscription = this.stateService.currentPage$.subscribe(page => {
      this.currentPage = page;
      this.itemsMaxIndex = this.currentPage * this.itemsLimit;
      this.itemsMinIndex = this.itemsMaxIndex - this.itemsLimit + 1;

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
    const subscription = this.stateService.items$.subscribe(items => {
      this.items = items;
      this.lists = splitArrayIntoChunks(this.items, this.itemsLimit);
    });
    this.subscriptions.push(subscription);
  };

  private fetchItems = (): void => {
    if (this.fetchedPages.has(this.currentPage)) {
      return;
    }

    const subscription = this.picsumServise
      .getItems(this.currentPage, this.itemsLimit)
      .subscribe({
        next: (items: IItem[]) => {
          this.stateService.addFetchedPage(this.currentPage);
          this.stateService.addItems(items);
        },
        error: () => {
          this.stateService.addItems([]);
        },
      });

    this.subscriptions.push(subscription);
  };

  public onScroll = (): void => {
    if (
      !this.isScrolled &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      this.isScrolled = true;
      this.stateService.setCurrentPage(this.currentPage + 1);
      this.isScrolled = false;
    }
  };
}
