import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailedInfoPageComponent } from './pages/detailed-info-page/detailed-info-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: ':id',
    component: DetailedInfoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
