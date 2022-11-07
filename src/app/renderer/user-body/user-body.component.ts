import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-user-body',
  template: `
    <div class="text-center text-dark p-2">
        {{value}}
    </div>
  `,
  styles: [
  ]
})
export class UserBodyComponent implements OnInit, ICellRendererAngularComp{

  constructor() { }
  value!:string;
  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }

}
