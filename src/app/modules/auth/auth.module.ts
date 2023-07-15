import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { KeyFilterModule } from 'primeng/keyfilter';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';

@NgModule({
  declarations: [
    LoginComponent,
    RecuperarContrasenaComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    KeyFilterModule
  ]
})
export class AuthModule { }
