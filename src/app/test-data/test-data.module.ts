import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TestRoutingModule } from './test-routing.module';
import { TestDataComponent } from './test-data.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TestRoutingModule
  ],
  declarations: [TestDataComponent]
})
export class TestDataModule { }
