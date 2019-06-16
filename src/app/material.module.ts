import { NgModule } from '@angular/core';
import {
  MatInputModule, MatFormFieldModule, MatDatepickerModule,
  MatIconModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule,
  MatChipsModule, MatTabsModule, MatBottomSheetModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule,
    MatTabsModule,
    MatBottomSheetModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule,
    MatTabsModule,
    MatBottomSheetModule,
  ],
})
export class MaterialModule { }
