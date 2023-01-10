import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatSliderModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, ...MATERIAL_MODULES],
  exports: [CommonModule, HttpClientModule, ...MATERIAL_MODULES],
})
export class SharedModule {}
