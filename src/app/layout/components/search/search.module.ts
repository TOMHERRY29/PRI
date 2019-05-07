import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";


import { FullTextSearchPipe } from './search.component';

@NgModule({
  declarations:[FullTextSearchPipe], // <---
  imports:[CommonModule],
  exports:[FullTextSearchPipe] // <---
})

export class SearchPipe{}