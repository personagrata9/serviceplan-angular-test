import { Directive, DoCheck, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';

@Directive({
  selector: '[appScrolling]',
})
export class ScrollingDirective implements OnInit, DoCheck {
  private currentPage!: number;

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.currentPage$.subscribe(page => {
      this.currentPage = page;
    });
  }

  ngDoCheck(): void {
    this.moveCurrentListToTop();
  }

  private moveCurrentListToTop = (): void => {
    const currentListElement = document.querySelector(
      `#list-${this.currentPage}`
    );
    currentListElement?.scrollIntoView(false);
  };
}
