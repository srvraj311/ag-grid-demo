import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCellHeaderComponent } from './user-cell-header.component';

describe('UserCellHeaderComponent', () => {
  let component: UserCellHeaderComponent;
  let fixture: ComponentFixture<UserCellHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCellHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCellHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
