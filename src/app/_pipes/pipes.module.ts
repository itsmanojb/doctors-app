import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanDatePipe } from './human-date.pipe';
import { TruncatePipe } from './truncate.pipe';
import { ListSearchPipe } from './list-search.pipe';
import { UrlifyPipe } from './urlify.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HumanDatePipe,
    TruncatePipe,
    ListSearchPipe,
    UrlifyPipe,
  ],
  exports: [
    HumanDatePipe,
    TruncatePipe,
    ListSearchPipe,
    UrlifyPipe,
  ],
})
export class PipesModule { }
