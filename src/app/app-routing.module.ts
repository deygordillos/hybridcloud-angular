import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { environment } from '@environments/environment';

let routesDemo: Routes = [
  {
    path: 'app/auth/demo',
    loadChildren: () =>
      import('./demo/components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'app/landing',
    loadChildren: () =>
      import('./demo/components/landing/landing.module').then(
        (m) => m.LandingModule
      ),
  }
];

let routesDemoLayout: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./demo/components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'uikit',
    loadChildren: () =>
      import('./demo/components/uikit/uikit.module').then(
        (m) => m.UIkitModule
      ),
  },
  {
    path: 'utilities',
    loadChildren: () =>
      import('./demo/components/utilities/utilities.module').then(
        (m) => m.UtilitiesModule
      ),
  },
  {
    path: 'documentation',
    loadChildren: () =>
      import('./demo/components/documentation/documentation.module').then(
        (m) => m.DocumentationModule
      ),
  },
  {
    path: 'blocks',
    loadChildren: () =>
      import('./demo/components/primeblocks/primeblocks.module').then(
        (m) => m.PrimeBlocksModule
      ),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./demo/components/pages/pages.module').then(
        (m) => m.PagesModule
      ),
  }
];

if (environment.production) {
  routesDemo = [];
  routesDemoLayout = [];
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      {
        path: 'formas-pago',
        loadChildren: () => import('./modules/formas-pago/formas-pago.module')
          .then(m => m.FormasPagoModule)
      },
      {
        path: 'monedas',
        loadChildren: () => import('./modules/monedas/monedas.module')
          .then(m => m.MonedasModule)
      },
      {
        path: 'marcas',
        loadChildren: () => import('./modules/marcas/marcas.module')
          .then(m => m.MarcasModule)
      },
      {
        path: 'impuestos',
        loadChildren: () => import('./modules/impuestos/impuestos.module')
          .then(m => m.ImpuestosModule)
      },
      {
        path: 'cargos-descargos-ajustes',
        loadChildren: () => import('./modules/cargos-descargos-ajustes/cargos-descargos-ajustes.module')
          .then(m => m.CargosDescargosAjustesModule)
      },
      {
        path: 'depositos-almacenes',
        loadChildren: () => import('./modules/depositos-almacenes/depositos-almacenes.module')
          .then(m => m.DepositosAlmacenesModule)
      },
      {
        path: 'familia-inventario',
        loadChildren: () => import('./modules/familia-inventario/familia-inventario.module')
          .then(m => m.FamiliaInventarioModule)
      },
      {
        path: 'productos-servicios',
        loadChildren: () => import('./modules/productos-servicios-inventario/productos-servicios-inventario.module')
          .then(m => m.ProductosServiciosInventarioModule)
      },
      {
        path: 'reportes',
        loadChildren: () => import('./modules/reportes/reportes.module')
          .then(m => m.ReportesModule)
      },
      ...routesDemoLayout // Demo
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module')
      .then(m => m.AuthModule)
  },
  ...routesDemo,
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      preloadingStrategy: PreloadAllModules
    }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
