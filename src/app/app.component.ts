import { UiService } from 'src/app/Ui/ui.service';
import { CellRatingComponent } from './renderer/cell-rating/cell-rating.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  CellDoubleClickedEvent,
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
  RowNode,
} from 'ag-grid-community';
import { map, Observable, Subscription } from 'rxjs';
import { UserCellComponent } from './renderer/user-cell/user-cell.component';
import { UserCellEditorComponent } from './editor/user-cell-editor/user-cell-editor.component';
import { UserCellFilterComponent } from './filter/user-cell-filter/user-cell-filter.component';
import { UserCellHeaderComponent } from './header/user-cell-header/user-cell-header.component';
import { UserBodyComponent } from './renderer/user-body/user-body.component';
import { CheckboxFilterComponent } from './filter/checkbox-filter/checkbox-filter.component';
import capitalise from './Helper';
import User from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient, private ui: UiService) {}

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      field: 'picture',
      cellRenderer: UserCellComponent,
      headerComponent: UserCellHeaderComponent,
      minWidth: 150,
    },
    {
      field: 'title',
      checkboxSelection: true,
      valueGetter: (params) => capitalise(params.data['title']),
      filter: CheckboxFilterComponent,
    },
    {
      valueGetter: (params) => {
        return `${capitalise(params.data.first_name)} ${capitalise(
          params.data.last_name
        )}`;
      },
      headerName: 'Name',
      filter: UserCellFilterComponent,
    },
    { field: 'username' },
    {
      field: 'gender',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['male', 'female'],
      },
      onCellValueChanged: () => {
        this.agGrid.api.redrawRows();
      },
    },
    { field: 'email' },
    { field: 'phone_number' },
    {
      headerName: 'Rating',
      field: 'rating',
      cellRenderer: CellRatingComponent,
    },
    //The valueParser will ensure that the new entered value after editing will be converted to number.
    {
      field: 'birthdate',
      valueGetter: (params) => {
        let timeStamp = params.data.birthdate * 1000;
        let date = new Date(timeStamp);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      },
      valueParser: (params) => Number(params.newValue),
    },
    { field: 'location.city', headerName: 'City' },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    resizable: true,
    editable: true,
    cellEditor: UserCellEditorComponent,
    headerComponent: UserCellHeaderComponent,
    cellRenderer: UserBodyComponent,
    cellClass: (params) =>
      params.data.gender == 'male' ? 'bg-light' : 'pink ',
    headerClass: 'bg-light text-dark',
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<User[]>;

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http.get<User[]>('http://localhost:3000/users');
    this.agGrid.api.paginationSetPageSize(10);
    //console.log('params: ' , params)
    setTimeout(() => this.updatePagination(), 1000);
  }

  // Example using Grid's API
  onClearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  refresh() {
    this.agGrid.api.redrawRows();
  }

  // Sample method implemented
  onDeleteSelection() {
    const selectedNodes: RowNode<any>[] = this.agGrid.api.getSelectedNodes();

    const selectedEmails = selectedNodes.map((item) => item.data.email);

    this.rowData$ = this.rowData$.pipe(
      map((userList) => {
        return userList.filter((user) => {
          return !selectedEmails.includes(user.email);
        });
      })
    );
  }

  undoCound: number = 0;
  onUndoClick() {
    this.agGrid.api.undoCellEditing();
    this.undoCound = this.agGrid.api.getCurrentUndoSize();
  }

  // Pagination
  //
  //

  page: number = 0;
  total: number = 0;

  updatePagination() {
    this.page = this.agGrid.api.paginationGetCurrentPage() + 1;
    this.total = this.agGrid.api.paginationGetTotalPages();
  }

  goToFirst() {
    this.agGrid.api.paginationGoToFirstPage();
  }

  goToLast() {
    this.agGrid.api.paginationGoToLastPage();
  }

  goLeft() {
    this.agGrid.api.paginationGoToPreviousPage();
  }

  goRight() {
    this.agGrid.api.paginationGoToNextPage();
  }

  //
  //
  //
  // Grid Events
  onCellDoubleClicked($event: CellDoubleClickedEvent<any>) {
    console.log('Double Click : \n', $event.value);
  }

  onCellValueChanged(event: CellValueChangedEvent<User>) {
    this.ui.showSnack('Cell Value Changed');
  }

  onEditTriggered() {
    this.undoCound = this.agGrid.api.getCurrentUndoSize();
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  dynamicUpdateSubscription!: Subscription;
  isDynamicData: boolean = false;
  enableDynamicData() {
    this.isDynamicData = true;
    setInterval(() => {
      if (this.isDynamicData) {
        this.dynamicUpdateSubscription = this.rowData$
          .pipe(
            map((item) => {
              item.map((user) => {
                user.phone_number = `9${Math.floor(
                  Math.random() * 1000000000
                )}`;
                return user;
              });
              return item;
            })
          )
          .subscribe((d) => this.agGrid.api.setRowData(d));
      }
    }, 1000);
  }
  disableDynamicData() {
    this.isDynamicData = false;
    this.dynamicUpdateSubscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.dynamicUpdateSubscription.unsubscribe();
  }
}
