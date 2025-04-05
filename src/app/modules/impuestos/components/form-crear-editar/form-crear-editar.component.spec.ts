import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearEditarComponent } from './form-crear-editar.component';

describe('FormCrearEditarComponent', () => {
  let component: FormCrearEditarComponent;
  let fixture: ComponentFixture<FormCrearEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCrearEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
