import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { ItemComponent } from './components/item/item.component';
import { ListComponent } from './components/list/list.component';
import { SliderComponent } from './components/slider/slider.component';
import { PicsumService } from './services/picsum.service';
import { CardSizeDirective } from './directives/card-size.directive';
import { DownloadImpossibleDialogComponent } from './components/download-impossible-dialog/download-impossible-dialog.component';
import { ImageLoadingDirective } from './directives/image-loading.directive';
import { DetailedInfoDialogComponent } from './components/detailed-info-dialog/detailed-info-dialog.component';
import { ScrollingDirective } from './directives/scrolling.directive';

@NgModule({
  declarations: [
    MainPageComponent,
    ItemComponent,
    ListComponent,
    SliderComponent,
    DownloadImpossibleDialogComponent,
    DetailedInfoDialogComponent,
    CardSizeDirective,
    ImageLoadingDirective,
    ScrollingDirective,
  ],
  imports: [CommonModule, SharedModule, GalleryRoutingModule],
  providers: [PicsumService],
})
export class GalleryModule {}
