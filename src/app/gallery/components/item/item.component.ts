import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IItem } from './item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  public id!: string;
  public title!: string;
  public imageSrc!: string;

  constructor(private router: Router) {}

  @Input()
  public item!: IItem;

  ngOnInit(): void {
    this.title = this.item.author;
    this.imageSrc = this.item.download_url;
  }

  public onClick = () => {
    console.log('card clicked');
    this.redirectToDetailedInfoPage();
  };

  private redirectToDetailedInfoPage = (): void => {
    const { id } = this.item;
    this.router.navigate(['gallery', id]);
  };

  public onDownloadButtonClick = ($event: Event) => {
    $event.stopPropagation();
    console.log('btn clicked');
  };
}
