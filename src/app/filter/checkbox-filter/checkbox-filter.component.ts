import {Component, OnInit} from '@angular/core';
import {IFilterAngularComp} from "ag-grid-angular";
import {AgPromise, IDoesFilterPassParams, IFilterParams} from "ag-grid-community";


interface Option {
  name : string,
  value: boolean
}
@Component({
  selector: 'app-checkbox-filter',
  template: `
    <div class="p-2">
      <div *ngFor="let option of optionArray" class="p-1 mx-2">
        <input type="checkbox" [(ngModel)]="option.value" (ngModelChange)="onInputChange()">
        <label class="ms-3">{{option.name.charAt(0).toUpperCase() + option.name.substring(1) }}</label>
      </div>
      <button (click)="onClearFilter()" class="p-1 my-auto w-100 btn btn-outline-secondary" *ngIf="isFilterActive()">Clear</button>
    </div>
  `,
  styles: [
  ]
})
export class CheckboxFilterComponent implements OnInit , IFilterAngularComp{
  optionArray: Option[] = [
    {name : 'mrs', value: false},
    {name :'mr' , value : false},
    {name :'ms' , value : false},
    {name :'madame' , value : false},
    {name :'mademoiselle' , value : false},
    {name :'miss' , value : false},
    {name :'monsieur' , value : false},
  ]

  params!: IFilterParams

  onInputChange(){
    this.params.filterChangedCallback();
  }
  constructor() { }

  ngOnInit(): void {
  }
  onClearFilter(){
    for(let item of this.optionArray){
      item.value = false;
    }
    this.params.filterChangedCallback();
  }

  agInit(params: IFilterParams): void {
    this.params = params;
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
   const value = params.node.data['title'];
   for(let item of this.optionArray){
     if(item.name == value){
       return item.value;
     }
   }
   return false;
  }

  getModel(): any {
    if(!this.isFilterActive()){
      return null;
    }
    return { value : this.optionArray };
  }

  isFilterActive(): boolean {
    for(let item of this.optionArray){
      if(item.value){
        return true;
      }
    }
    return false;
  }

  setModel(model: any): void | AgPromise<void> {
    return undefined;
  }

}
