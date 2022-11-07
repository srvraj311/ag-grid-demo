import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ICellEditorAngularComp} from "ag-grid-angular";
import {ICellEditorParams} from "ag-grid-community";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-user-cell-editor',
  template: `
    <input type="text" class="py-2" [(ngModel)]="value" #input/>
  `,
  styles: [
    `
        input {
          outline: none;
          border: none;
          height: 100%;
          width: 100%;
        }
        input:focus {
          outline: none;
          border: none;
        }
    `
  ]
})
export class UserCellEditorComponent implements OnInit, ICellEditorAngularComp, AfterViewInit {
  params!:ICellEditorParams;
  @ViewChild('input', {read : ViewContainerRef}) input!: ViewContainerRef
  value!:string;
  constructor() { }

  ngOnInit(): void {

  }

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.value = params.value;
  }

  getValue(): any {
    return 'Modified :' + this.value;
  }

  // Allow to save only if boolean
  isCancelAfterEnd(): boolean {
    if(this.value.length < 3) alert('Value Too small, Minimum 4 characters required');
    return this.value.length < 3;
  }

  // Allow to edit based on a condition
  isCancelBeforeStart(): boolean {
    // return this.value.includes('Modified :');
    return false;
  }

  ngAfterViewInit(): void {
    // focus on the input
    setTimeout(() => this.input.element.nativeElement.focus());
  }

}
