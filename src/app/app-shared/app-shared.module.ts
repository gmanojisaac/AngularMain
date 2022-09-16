import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule
         ]
})
export class AppSharedModule { }