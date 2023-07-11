import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosAlmacenesComponent } from './depositos-almacenes.component';

describe('DepositosAlmacenesComponent', () => {
  let component: DepositosAlmacenesComponent;
  let fixture: ComponentFixture<DepositosAlmacenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositosAlmacenesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositosAlmacenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
