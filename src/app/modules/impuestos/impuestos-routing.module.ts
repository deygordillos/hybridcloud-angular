import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpuestosComponent } from './pages/impuestos/impuestos.component';

const routes: Routes = [
  {
    path: '',
    component: ImpuestosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImpuestosRoutingModule {}
