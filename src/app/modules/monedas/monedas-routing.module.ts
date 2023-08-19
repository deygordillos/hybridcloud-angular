import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonedasComponent } from './pages/monedas/monedas.component';

const routes: Routes = [
  {
    path: '',
    component: MonedasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonedasRoutingModule {}
