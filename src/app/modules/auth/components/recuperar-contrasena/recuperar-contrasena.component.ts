import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UtilsService } from '@app/services/utils/utils.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss'],
})
export class RecuperarContrasenaComponent {
  data: any;
  email: FormControl;

  constructor(
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private utilsService: UtilsService
  ) {
    this.email = new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    );
  }

  cerrarModal(): void {
    this.dialogRef.close(false);
  }

  enviarDatos() {
    try {
      if (!this.email.valid) {
        this.email.markAllAsTouched();
        this.utilsService.openToast({
          severity: 'info',
          summary: 'Titulo',
          detail: 'Contenido',
        });
        return;
      }

      const email = this.email.value;

      console.log(email);

      this.dialogRef.close(true);
    } catch (error) {
      console.error(error);
    }
    //this.data = this.dialogConfig.data;
    //this.dialogRef.close(this.data);
  }
}
