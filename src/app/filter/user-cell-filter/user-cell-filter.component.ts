import { Component, OnInit } from '@angular/core';
import {IFilterAngularComp} from "ag-grid-angular";
import {AgPromise, IDoesFilterPassParams, IFilterParams} from "ag-grid-community";

@Component({
  selector: 'app-user-cell-filter',
  templateUrl: './user-cell-filter.component.html',
  styleUrls: ['./user-cell-filter.component.css']
})
export class UserCellFilterComponent implements OnInit, IFilterAngularComp {
  searchText!: string;
  value!: string;
  params!:IFilterParams;
  constructor() { }

  ngOnInit(): void {

  }

  agInit(params: IFilterParams): void {
    this.params = params;
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const { api, colDef, column, columnApi, context } = this.params;
    const { node } = params;
    this.params.valueGetter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data: node.data,
      node,
      getValue : (field) => node.data[field],
    })
    const value = this.params.valueGetter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data: node.data,
      getValue: (field) => node.data[field],
      node,
    });
    return value.includes(this.searchText);
  }

  getModel(): any {
    if(!this.isFilterActive()){
      return null;
    }
    return { value : this.searchText };
  }

  isFilterActive(): boolean {
    return this.searchText != null && this.searchText !== '';
  }

  setModel(model: any): void | AgPromise<void> {
    return undefined;
  }

  onInputChange(){
    this.params.filterChangedCallback();
  }

}
