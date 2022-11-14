import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private matSnack: MatSnackBar) {}

  showSnack(msg: string) {
    this.matSnack.open(msg, undefined, {
      duration: 2000,
    });
  }
}
