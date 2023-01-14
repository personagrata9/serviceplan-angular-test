import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  public itemsLimit = 5;

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.itemsLimit$.subscribe(value => {
      this.itemsLimit = value;
    });
  }

  public onInput = (event: Event): void => {
    const { value } = event.target as HTMLInputElement;

    this.stateService.setItemsLimit(+value);
  };
}
