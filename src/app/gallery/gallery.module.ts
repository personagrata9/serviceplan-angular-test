import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';
import { SliderComponent } from './components/slider/slider.component';
import { PicsumService } from './services/picsum.service';
import { CardSizeDirective } from './directives/card-size.directive';

@NgModule({
  declarations: [
    MainPageComponent,
    CardComponent,
    ListComponent,
    SliderComponent,
    CardSizeDirective,
  ],
  imports: [CommonModule, SharedModule, GalleryRoutingModule],
  providers: [PicsumService],
})
export class GalleryModule {}
