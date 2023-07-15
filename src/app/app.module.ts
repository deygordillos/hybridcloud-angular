import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '@interceptors/token-interceptor/token.interceptor';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy  /* HashLocationStrategy */ },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    CountryService,
    CustomerService,
    EventService,
    IconService,
    NodeService,
    PhotoService,
    ProductService,

    ConfirmationService,
    DialogService,
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
