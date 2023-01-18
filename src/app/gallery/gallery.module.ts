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
import { DetailedInfoPageComponent } from './pages/detailed-info-page/detailed-info-page.component';
import { DownloadImpossibleDialogComponent } from './components/download-impossible-dialog/download-impossible-dialog.component';
import { ImageLoadingDirective } from './directives/image-loading.directive';

@NgModule({
  declarations: [
    MainPageComponent,
    ItemComponent,
    ListComponent,
    SliderComponent,
    CardSizeDirective,
    DetailedInfoPageComponent,
    DownloadImpossibleDialogComponent,
    ImageLoadingDirective,
  ],
  imports: [CommonModule, SharedModule, GalleryRoutingModule],
  providers: [PicsumService],
})
export class GalleryModule {}
