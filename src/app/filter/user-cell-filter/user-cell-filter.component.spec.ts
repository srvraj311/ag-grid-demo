import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCellFilterComponent } from './user-cell-filter.component';

describe('UserCellFilterComponent', () => {
  let component: UserCellFilterComponent;
  let fixture: ComponentFixture<UserCellFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCellFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCellFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
