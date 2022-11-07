import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCellEditorComponent } from './user-cell-editor.component';

describe('UserCellEditorComponent', () => {
  let component: UserCellEditorComponent;
  let fixture: ComponentFixture<UserCellEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCellEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
