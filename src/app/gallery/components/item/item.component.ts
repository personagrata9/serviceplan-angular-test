import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IItem } from './item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  public title!: string;
  public imageSrc!: string;

  constructor(private router: Router) {}

  @Input()
  public item!: IItem;

  ngOnInit(): void {
    this.title = this.item.author;
    this.imageSrc = this.item.download_url;
  }
}
