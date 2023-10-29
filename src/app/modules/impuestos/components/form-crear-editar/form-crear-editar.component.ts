import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateTaxDto, UpdateTaxDto } from '@app/dtos/taxDto';
import { SiNo } from '@app/enums/siNo';
import { TaxType } from '@app/enums/tax-type';
import { Tax } from '@app/models/tax.model';
import { ImpuestosService } from '@app/services/impuestos/impuestos.service';
import { UtilsService } from '@app/services/utils/utils.service';
import { SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';

@Component({
  selector: 'app-form-crear-editar',
  templateUrl: './form-crear-editar.component.html',
  styleUrls: ['./form-crear-editar.component.scss'],
})
export class FormCrearEditarComponent implements OnInit {
  data: Tax | null = null;
  form: FormGroup;
  listTaxType: SelectItem[];
  listTaxAffectsCost: SelectItem[];

  constructor(
    public dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private utilsService: UtilsService,
    private impuestosService: ImpuestosService
  ) {
    this.listTaxType = this.utilsService.convertEnumToItemSelectArray(TaxType);
    this.listTaxAffectsCost =
      this.utilsService.convertEnumToItemSelectArray(SiNo);
    this.data = this.dialogConfig.data ?? null;
    this.form = new FormGroup({
      tax_id: new FormControl<number | null>(null),
      tax_code: new FormControl<string>(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ])
      ),
      tax_description: new FormControl<string>(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(80),
        ])
      ),
      tax_status: new FormControl<boolean>(
        false,
        Validators.compose([Validators.required])
      ),
      tax_siglas: new FormControl<string>(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(150),
        ])
      ),
      tax_percentage: new FormControl<number | null>(
        null,
        Validators.compose([Validators.required])
      ),
      tax_type: new FormControl<SelectItem | null>(
        null,
        Validators.compose([Validators.required])
      ),
      tax_affects_cost: new FormControl<SelectItem | null>(
        null,
        Validators.compose([Validators.required])
      ),
    });
  }

  ngOnInit(): void {
    if (this.data) {
      const selectedTaxType = this.listTaxType.find(
        item => item.label === this.data!.tax_type
      );

      this.form.setValue({
        ...this.data,
        tax_status: this.data.tax_status === 'Activo',
        tax_type: selectedTaxType ?? null,
        tax_affects_cost: this.listTaxAffectsCost[0],
      });
    }
  }

  changeStatus(event: InputSwitchOnChangeEvent): void {
    this.form.patchValue({ tax_status: event.checked });
  }

  changeType(event: any): void {
    this.form.patchValue({ tax_type: event.value });
  }

  changeAffectsCost(event: any): void {
    this.form.patchValue({ tax_affects_cost: event.value });
  }

  async createUpdateTax(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      const {
        tax_id,
        tax_code,
        tax_description,
        tax_status,
        tax_siglas,
        tax_percentage,
        tax_type,
        tax_affects_cost,
      } = this.form.value;

      if (this.data) {
        const tax: UpdateTaxDto = {
          tax_id,
          tax_description,
          tax_siglas,
          tax_status: tax_status ? 1 : 0,
          tax_type: tax_type.value,
          tax_percentage,
          tax_affects_cost: tax_affects_cost.value,
        };

        const { message } = await this.impuestosService.updateTax(tax);
        if (message) this.dialogRef.close(true);
      } else {
        const tax: CreateTaxDto = {
          tax_code,
          tax_description,
          tax_siglas,
          tax_type: tax_type.value,
          tax_percentage,
          tax_affects_cost: tax_affects_cost.value,
        };

        const { message } = await this.impuestosService.createTax(tax);
        if (message) this.dialogRef.close(true);
      }
    } catch (error) {
      let message =
        error instanceof HttpErrorResponse ? error.error.message : '';

      this.utilsService.openToast({
        severity: 'error',
        summary: 'Error',
        detail: `Hubo un error al intentar realizar la operación. ${message}`,
      });
    }
  }
}
