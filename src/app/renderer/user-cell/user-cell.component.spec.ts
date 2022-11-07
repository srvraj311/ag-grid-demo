import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCellComponent } from './user-cell.component';

describe('UserCellComponent', () => {
  let component: UserCellComponent;
  let fixture: ComponentFixture<UserCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
