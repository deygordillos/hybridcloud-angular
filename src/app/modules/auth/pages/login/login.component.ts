import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '@app/layout/service/app.layout.service';
import { AuthService } from '@app/services/auth/auth.service';
import { UtilsService } from '@app/services/utils/utils.service';
import { RecuperarContrasenaComponent } from '../../components/recuperar-contrasena/recuperar-contrasena.component';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showError: boolean = false;
  formLogin: FormGroup;
  loading : boolean = false;

  constructor(
    public layoutService: LayoutService,
    private utilsService: UtilsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      usuario: new FormControl<string|null>('MUNDOBQTO', Validators.compose([Validators.required])),
      password: new FormControl<string|null>('MUNDOBQTO', Validators.compose([Validators.required])),
      recuerdame: new FormControl<boolean>(false)
    });
  }

  login(): void {
    if (!this.formLogin.valid) {
      this.showError = true;
      this.formLogin.markAllAsTouched();
      return;
    }

    this.showError = false;
    this.loading = true;

    const { usuario, password } = this.formLogin.getRawValue();

    this.authService.login(usuario, password)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/app/monedas']);
        },
        error: (error) => {
          console.error(error);
        }
    });

    //this.authService.login(usuario, password, recuerdame);
  }

  async openModalConfirm(): Promise<void> {
    try {
      const response = await this.utilsService.openModalConfirm(
        {
          header: 'Confirmar',
          message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quis, non repudiandae beatae laudantium quae consectetur voluptatibus? Repellat, voluptatibus. Ad recusandae dolor nihil repellendus autem tempore porro totam minima! Tempora.',
        }
      );

      if (response) {
        console.log('Ejecutar');
      }
    } catch (error) {
      if (!error) {
        console.error('Operación cancelada');
      }
    }
  }

  async openModalRecuperarContrasena(): Promise<void> {
    try {
      const result = await this.utilsService.openModal(RecuperarContrasenaComponent,{
        data: {
          id: 1
        },
        header: 'Recuperar contraseña',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: false,
        styleClass: 'sm:w-full md:w-5'
      });

      //if (!result) return;

      console.log(result)
    } catch (error) {
      console.error(error);
    }
  }
}
