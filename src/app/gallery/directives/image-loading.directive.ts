import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Directive({
  selector: '[appImageLoading]',
})
export class ImageLoadingDirective implements OnInit {
  constructor(
    private element: ElementRef,
    private loadingService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
  }

  @HostListener('load')
  onLoad() {
    this.element.nativeElement.classList.add('visible');
    this.loadingService.setLoading(false);
  }
}
