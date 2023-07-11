import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosServiciosInventarioComponent } from './productos-servicios-inventario.component';

describe('ProductosServiciosInventarioComponent', () => {
  let component: ProductosServiciosInventarioComponent;
  let fixture: ComponentFixture<ProductosServiciosInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosServiciosInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosServiciosInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
