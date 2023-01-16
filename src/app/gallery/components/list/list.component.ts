import { Component, Input } from '@angular/core';
import { IItem } from '../item/item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() items!: IItem[];

  public trackByFn(index: number, item: IItem) {
    return item.id;
  }
}
