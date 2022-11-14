import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { UserCellComponent } from './renderer/user-cell/user-cell.component';
import { UserCellEditorComponent } from './editor/user-cell-editor/user-cell-editor.component';
import { FormsModule } from '@angular/forms';
import { UserCellFilterComponent } from './filter/user-cell-filter/user-cell-filter.component';
import { UserCellHeaderComponent } from './header/user-cell-header/user-cell-header.component';
import { UserBodyComponent } from './renderer/user-body/user-body.component';
import { CheckboxFilterComponent } from './filter/checkbox-filter/checkbox-filter.component';
import { CellRatingComponent } from './renderer/cell-rating/cell-rating.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UiService } from 'src/app/Ui/ui.service';
@NgModule({
  declarations: [
    AppComponent,
    UserCellComponent,
    UserCellEditorComponent,
    UserCellFilterComponent,
    UserCellHeaderComponent,
    UserBodyComponent,
    CheckboxFilterComponent,
    CellRatingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [UiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
