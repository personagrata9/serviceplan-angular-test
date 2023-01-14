import { Component, Input } from '@angular/core';
import { IItem } from '../card/item.model';

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
