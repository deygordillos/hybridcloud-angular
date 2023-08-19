import { Component, ElementRef } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app.sidebar.component.html',
})
export class AppSidebarComponent {
  funcion() {}

  constructor(
    public layoutService: LayoutService,
    public el: ElementRef
  ) {}
}
