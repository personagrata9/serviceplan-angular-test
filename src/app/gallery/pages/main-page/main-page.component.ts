import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';
import { PicsumService } from '../../services/picsum.service';
import { IItem } from '../../components/card/item.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public listHeightPx!: number;
  public items!: IItem[];
  public itemsLimit!: number;
  private pageNumber!: number;
  public itemsMinIndex = 0;
  public itemsMaxIndex!: number;

  constructor(
    private stateService: StateService,
    private picsumServise: PicsumService
  ) {}

  ngOnInit(): void {
    this.items = [];

    this.stateService.itemsLimit$.subscribe(value => {
      this.itemsLimit = value;
      this.itemsMaxIndex = this.itemsMinIndex + this.itemsLimit;

      this.fetchGalleryItems();
    });
  }

  private fetchGalleryItems = () =>
    this.picsumServise
      .getItems(this.pageNumber, this.itemsLimit)
      .subscribe(value => (this.items = value));
}
