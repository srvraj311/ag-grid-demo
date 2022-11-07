import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IHeaderAngularComp} from "ag-grid-angular";
import {IHeaderParams} from "ag-grid-community";

@Component({
  selector: 'app-user-cell-header',
  template: `
    <div class="bg-light m-2 d-flex  justify-content-between align-items-center text-dark">
      <i #menu (click)="onFilterClick()" class="lead bi bi-three-dots "></i>
      <p class="m-0 text-end " (click)="onToggleSort()">{{value}}</p>
      <i class="bi bi-sort-up lead" (click)="onToggleSort()" *ngIf="count == 1" ></i>
      <i class="bi  bi-sort-down lead" (click)="onToggleSort()" *ngIf="count == 2" ></i>
      <i class="bi bi-sort-alpha-down lead" (click)="onToggleSort()" *ngIf="count == 0" ></i>
    </div>

  `,
  styles: [

  ]
})
export class UserCellHeaderComponent implements OnInit, IHeaderAngularComp {
  value!:string;
  constructor() { }
  @ViewChild('menu') menu!:ElementRef;
  params!:IHeaderParams;

  ngOnInit(): void {
  }

  agInit(params: IHeaderParams): void {
    this.value = params.displayName;
    this.params = params;
  }

  refresh(params: IHeaderParams): boolean {
    return false;
  }

  onFilterClick() {
    this.params.showColumnMenu(this.menu.nativeElement);
  }
  count = 0;
  onToggleSort() {
    if(this.count == 0) {
      this.params.setSort('asc');
      this.count++;
    }else if(this.count == 1){
      this.params.setSort('desc');
      this.count++;
    }else{
      this.params.setSort(null);
      this.count = 0;
    }
  }
}
