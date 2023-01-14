import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/core/services/state.service';
import { IItem } from './item.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  public id!: string;
  public title!: string;
  public imageSrc!: string;

  constructor(private router: Router, private stateService: StateService) {}

  @Input()
  public item!: IItem;

  ngOnInit(): void {
    this.id = `card-${this.item.id}`;
    this.title = this.item.author;
    this.imageSrc = this.item.download_url;
  }
}
