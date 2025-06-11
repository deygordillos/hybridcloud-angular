import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsCrudComponent } from './groups-crud.component';

describe('GroupsCrudComponent', () => {
  let component: GroupsCrudComponent;
  let fixture: ComponentFixture<GroupsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
