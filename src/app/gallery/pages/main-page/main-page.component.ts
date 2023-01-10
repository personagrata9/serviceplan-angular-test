import { Component, OnInit } from '@angular/core';
import { IItem } from '../../components/item/item.model';
import { PicsumService } from '../../services/picsum.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public items!: IItem[];
  public itemsLimit = 25;

  constructor(private picsumServise: PicsumService) {}

  ngOnInit(): void {
    this.picsumServise
      .getItems(this.itemsLimit)
      .subscribe(value => (this.items = value));
  }
}
