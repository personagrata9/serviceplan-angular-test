import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {
  public itemsLimit!: number;

  private subscriptions: Subscription[] = [];

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    const subscription = this.stateService.itemsLimit$.subscribe(value => {
      this.itemsLimit = value;
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onInput = (event: Event): void => {
    const { value } = event.target as HTMLInputElement;

    this.stateService.setItemsLimit(+value);
    this.stateService.setCurrentPage(1);
  };
}
