import { Directive, ElementRef, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';

@Directive({
  selector: '[appCardSize]',
})
export class CardSizeDirective implements OnInit {
  public itemsLimit!: number;
  private initialCardHeight = 'calc((85vh / 2) - 1rem)';
  public cardHeight!: string;

  constructor(
    private element: ElementRef,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.element.nativeElement.style.height = this.initialCardHeight;

    this.stateService.initialCardHeightPx =
      this.element.nativeElement.clientHeight;

    this.stateService.itemsLimit$.subscribe(value => {
      this.itemsLimit = value;
      this.calculateCardHeight();
      this.resize();
    });
  }

  private resize = (): void => {
    this.element.nativeElement.style.height = this.cardHeight;
  };

  private calculateCardHeight = () => {
    if (this.itemsLimit < 7) {
      this.cardHeight = this.initialCardHeight;
    } else if (this.itemsLimit < 15) {
      this.cardHeight = 'calc((85vh / 3) - 2rem)';
    } else if (this.itemsLimit < 20) {
      this.cardHeight = 'calc((85vh / 3.1) - 2rem)';
    } else {
      this.cardHeight = 'calc((85vh / 3.5) - 2rem)';
    }
  };
}
