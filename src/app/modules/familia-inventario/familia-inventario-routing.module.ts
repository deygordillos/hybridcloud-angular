import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamiliaInventarioComponent } from './pages/familia-inventario/familia-inventario.component';

const routes: Routes = [
  {
    path: '',
    component: FamiliaInventarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamiliaInventarioRoutingModule {}
