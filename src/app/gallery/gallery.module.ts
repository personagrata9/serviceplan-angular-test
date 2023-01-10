import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { ItemComponent } from './components/item/item.component';
import { ListComponent } from './components/list/list.component';
import { PicsumService } from './services/picsum.service';

@NgModule({
  declarations: [MainPageComponent, ItemComponent, ListComponent],
  imports: [CommonModule, SharedModule, GalleryRoutingModule],
  providers: [PicsumService],
})
export class GalleryModule {}
