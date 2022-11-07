import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-user-cell',
  template: `
    <div class="container">
      <img [src]="url"/>
    </div>
  `,
  styleUrls: [
    "user-cell.component.css"
  ]
})
export class UserCellComponent implements OnInit , ICellRendererAngularComp {
  url!:string;
  constructor() { }
  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    this.url = 'https://randomuser.me/api/portraits/' + params.value
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }
}
