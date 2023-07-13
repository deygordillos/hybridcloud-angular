import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliaInventarioComponent } from './familia-inventario.component';

describe('FamiliaInventarioComponent', () => {
  let component: FamiliaInventarioComponent;
  let fixture: ComponentFixture<FamiliaInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliaInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamiliaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
