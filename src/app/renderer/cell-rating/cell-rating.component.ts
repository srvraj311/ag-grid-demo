import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-cell-rating',
  template: `
    <div class="p-2">
      <i *ngFor="let item of rating" class="bi bi-star-fill orange "></i>
      <i *ngFor="let item of remaining" class="bi bi-star "></i>
    </div>
  `,
  styles: [
    `
      i {
        font-size: 1rem;
        margin: 2px;
        color: orange;
      }
    `,
  ],
})
export class CellRatingComponent implements OnInit, ICellRendererAngularComp {
  constructor() {}
  params!: ICellRendererParams;
  rating: number[] = [];
  remaining: number[] = [];
  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
    const rating = Number(params.value);
    for (let i = 0; i < rating; i++) this.rating.push(i + 1);
    for (let i = 0; i < 5 - rating; i++) this.remaining.push(i + 1);
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  ngOnInit(): void {}
}
