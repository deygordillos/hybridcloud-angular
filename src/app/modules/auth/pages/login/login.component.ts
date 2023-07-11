import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '@app/layout/service/app.layout.service';
import { AuthService } from '@app/services/auth/auth.service';
import { UtilsService } from '@app/services/utils/utils.service';

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
    private authService: AuthService
  ) {
    this.formLogin = new FormGroup({
      usuario: new FormControl<string|null>('', Validators.compose([Validators.required])),
      password: new FormControl<string|null>('', Validators.compose([Validators.required])),
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

    const { usuario, password, recuerdame } = this.formLogin.getRawValue();

    console.log(usuario, password, recuerdame);

    this.loading = true;

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
}
