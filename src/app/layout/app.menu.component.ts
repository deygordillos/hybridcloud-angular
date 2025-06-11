import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { ItemMenu } from '@app/models/itemMenu';
import { environment } from '@environments/environment';
import { AuthService } from '@app/services/auth/auth.service';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: ItemMenu[] = [];
  adminModel: ItemMenu[] = [];
  user: User | null = null;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.adminModel = [
      {
        label: 'Admin',
        items: [
          {
            label: 'Grupos',
            icon: 'pi pi-fw pi-sitemap',
            routerLink: ['/admin/groups'],
          },
          {
            label: 'Empresas',
            icon: 'pi pi-fw pi-building',
            routerLink: ['/admin/companies'],
          },
        ],
        visible: true,
      },
    ]

    this.model = [
      {
        label: 'Home',
        items: [
          {
            label: 'Formas de Pago',
            icon: 'pi pi-fw pi-credit-card',
            routerLink: ['/app/formas-pago'],
          },
          {
            label: 'Monedas',
            icon: 'pi pi-fw pi-money-bill',
            routerLink: ['/app/monedas'],
          },
          {
            label: 'Marcas',
            icon: 'pi pi-fw pi-table',
            routerLink: ['/app/marcas'],
          },
          {
            label: 'Impuestos',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: ['/app/impuestos'],
          },
          {
            label: 'Cargos / Descargos / Ajustes',
            icon: 'pi pi-fw pi-truck',
            routerLink: ['/app/cargos-descargos-ajustes'],
          },
          {
            label: 'Depósitos / Almacenes',
            icon: 'pi pi-fw pi-box',
            routerLink: ['/app/depositos-almacenes'],
          },
          {
            label: 'Familias de Inventario',
            icon: 'pi pi-fw pi-book',
            routerLink: ['/app/familia-inventario'],
          },
          {
            label: 'Productos y Servicios de Inventario',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/app/productos-servicios'],
          },
          {
            label: 'Reportes',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/app/reportes'],
          },
        ],
        visible: true,
      },
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/app/demo/dashboard'],
          },
        ],
        visible: !environment.production,
      },
      {
        label: 'UI Components',
        items: [
          {
            label: 'Form Layout',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/app/demo/uikit/formlayout'],
          },
          {
            label: 'Input',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['/app/demo/uikit/input'],
          },
          {
            label: 'Float Label',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: ['/app/demo/uikit/floatlabel'],
          },
          {
            label: 'Invalid State',
            icon: 'pi pi-fw pi-exclamation-circle',
            routerLink: ['/app/demo/uikit/invalidstate'],
          },
          {
            label: 'Button',
            icon: 'pi pi-fw pi-box',
            routerLink: ['/app/demo/uikit/button'],
          },
          {
            label: 'Table',
            icon: 'pi pi-fw pi-table',
            routerLink: ['/app/demo/uikit/table'],
          },
          {
            label: 'List',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/app/demo/uikit/list'],
          },
          {
            label: 'Tree',
            icon: 'pi pi-fw pi-share-alt',
            routerLink: ['/app/demo/uikit/tree'],
          },
          {
            label: 'Panel',
            icon: 'pi pi-fw pi-tablet',
            routerLink: ['/app/demo/uikit/panel'],
          },
          {
            label: 'Overlay',
            icon: 'pi pi-fw pi-clone',
            routerLink: ['/app/demo/uikit/overlay'],
          },
          {
            label: 'Media',
            icon: 'pi pi-fw pi-image',
            routerLink: ['/app/demo/uikit/media'],
          },
          {
            label: 'Menu',
            icon: 'pi pi-fw pi-bars',
            routerLink: ['/app/demo/uikit/menu'],
            routerLinkActiveOptions: {
              paths: 'subset',
              queryParams: 'ignored',
              matrixParams: 'ignored',
              fragment: 'ignored',
            },
          },
          {
            label: 'Message',
            icon: 'pi pi-fw pi-comment',
            routerLink: ['/app/demo/uikit/message'],
          },
          {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/app/demo/uikit/file'],
          },
          {
            label: 'Chart',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: ['/app/demo/uikit/charts'],
          },
          {
            label: 'Misc',
            icon: 'pi pi-fw pi-circle',
            routerLink: ['/app/demo/uikit/misc'],
          },
        ],
        visible: !environment.production,
      },
      {
        label: 'Prime Blocks',
        items: [
          {
            label: 'Free Blocks',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/app/demo/blocks'],
            badge: 'NEW',
          },
          {
            label: 'All Blocks',
            icon: 'pi pi-fw pi-globe',
            url: ['https://www.primefaces.org/primeblocks-ng'],
            target: '_blank',
          },
        ],
        visible: !environment.production,
      },
      {
        label: 'Utilities',
        items: [
          {
            label: 'PrimeIcons',
            icon: 'pi pi-fw pi-prime',
            routerLink: ['/app/demo/utilities/icons'],
          },
          {
            label: 'PrimeFlex',
            icon: 'pi pi-fw pi-desktop',
            url: ['https://www.primefaces.org/primeflex/'],
            target: '_blank',
          },
        ],
        visible: !environment.production,
      },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Landing',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['/app/demo/landing'],
          },
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/app/demo/auth/login'],
              },
              {
                label: 'Error',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/app/demo/auth/error'],
              },
              {
                label: 'Access Denied',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/app/demo/auth/access'],
              },
            ],
          },
          {
            label: 'Crud',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/app/demo/pages/crud'],
          },
          {
            label: 'Timeline',
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/app/demo/pages/timeline'],
          },
          {
            label: 'Not Found',
            icon: 'pi pi-fw pi-exclamation-circle',
            routerLink: ['/app/demo/notfound'],
          },
          {
            label: 'Empty',
            icon: 'pi pi-fw pi-circle-off',
            routerLink: ['/app/demo/pages/empty'],
          },
        ],
        visible: !environment.production,
      },
      {
        label: 'Hierarchy',
        items: [
          {
            label: 'Submenu 1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              {
                label: 'Submenu 1.1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                  { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                  { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                  { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                ],
              },
              {
                label: 'Submenu 1.2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                  { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
                ],
              },
            ],
          },
          {
            label: 'Submenu 2',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              {
                label: 'Submenu 2.1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                  { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                  { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                ],
              },
              {
                label: 'Submenu 2.2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                  { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                ],
              },
            ],
          },
        ],
        visible: !environment.production,
      },
      {
        label: 'Get Started',
        items: [
          {
            label: 'Documentation',
            icon: 'pi pi-fw pi-question',
            routerLink: ['/app/demo/documentation'],
          },
          {
            label: 'View Source',
            icon: 'pi pi-fw pi-search',
            url: ['https://github.com/primefaces/sakai-ng'],
            target: '_blank',
          },
        ],
        visible: !environment.production,
      },
    ];

    this.model = [ ...this.adminModel, ...this.model ];
  }
}
