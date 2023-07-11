import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargosDescargosAjustesComponent } from './cargos-descargos-ajustes.component';

describe('CargosDescargosAjustesComponent', () => {
  let component: CargosDescargosAjustesComponent;
  let fixture: ComponentFixture<CargosDescargosAjustesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargosDescargosAjustesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargosDescargosAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
