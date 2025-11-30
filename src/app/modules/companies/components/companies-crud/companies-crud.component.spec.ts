import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesCrudComponent } from './companies-crud.component';

describe('CompaniesCrudComponent', () => {
  let component: CompaniesCrudComponent;
  let fixture: ComponentFixture<CompaniesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
