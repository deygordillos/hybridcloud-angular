import { Component } from '@angular/core';
import {
  currentPageReportTemplate,
  rowsPerPageOptions,
} from '@app/constants/tables';
import { Status } from '@app/enums/status';
import { Tax } from '@app/models/tax.model';
import { ImpuestosService } from '@app/services/impuestos/impuestos.service';
import { UtilsService } from '@app/services/utils/utils.service';
import { FormCrearEditarComponent } from '../../components/form-crear-editar/form-crear-editar.component';
import { Message, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.scss'],
})
export class ImpuestosComponent {
  listStatus: SelectItem[];
  taxes: Tax[] = [];
  rowsPerPageOptions = rowsPerPageOptions;
  currentPageReportTemplate = currentPageReportTemplate;
  recordsTotal = 0;
  recordsFiltered = 0;
  status: Status = Status.Activo;
  offset = 0;
  limit = this.rowsPerPageOptions[0];
  messages: Message[] = [
    {
      severity: 'warn',
      summary: 'Hola',
      detail: 'No se han encontrado impuestos',
    },
  ];
  loading = true;
  loadingItems: number[];

  constructor(
    private impuestosService: ImpuestosService,
    private utilsService: UtilsService
  ) {
    this.listStatus = this.utilsService.convertEnumToItemSelectArray(Status);
    this.loadingItems = this.utilsService.generarArrayRange(0, 10);
  }

  async getTaxes(): Promise<any> {
    this.loading = true;

    try {
      const response = await this.impuestosService.getTaxes(
        this.status,
        this.offset,
        this.limit
      );
      const { recordsTotal, recordsFiltered, data } = response;

      this.recordsTotal = recordsTotal;
      this.recordsFiltered = recordsFiltered;
      this.taxes = data;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  async createEditTax(tax: Tax | null = null): Promise<void> {
    try {
      const header = tax ? tax.tax_description : 'Crear impuesto';
      const modal = await this.utilsService.openModal(
        FormCrearEditarComponent,
        {
          header,
          styleClass: 'w-11 sm:w-10 md:w-8 xl:w-7',
          data: tax,
        }
      );

      if (modal) {
        this.utilsService.openToast({
          severity: 'success',
          summary: 'Felicidades',
          detail: 'Se ha completado la operación satisfactoriamente',
        });
        await this.getTaxes();
      }
    } catch (error) {
      console.log('error');
    }
  }

  async loadTaxes(event: any): Promise<void> {
    const { first, rows } = event;
    this.offset = (first === 0 ? 0 : Math.ceil(first / rows)) * this.limit;
    this.limit = rows;

    await this.getTaxes();
  }

  async changeStatus(event: any): Promise<void> {
    this.offset = 0;
    this.status = event.value.value;

    await this.getTaxes();
  }
}
