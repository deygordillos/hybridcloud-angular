import { Component } from '@angular/core';
import { rowsPerPageOptions } from '@app/constants/rowsPerPageOptions';
import { Status } from '@app/enums/status';
import { ItemSelect } from '@app/models/item-select.model';
import { Tax } from '@app/models/tax.model';
import { ImpuestosService } from '@app/services/impuestos/impuestos.service';
import { UtilsService } from '@app/services/utils/utils.service';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.scss'],
})
export class ImpuestosComponent {
  rowsPerPageOptions = rowsPerPageOptions;
  listStatus: ItemSelect[];
  taxes: Tax[] = [];
  recordsTotal = 0;
  recordsFiltered = 0;
  status: Status = Status.Activo;
  offset = 0;
  limit = this.rowsPerPageOptions[0];

  constructor(
    private impuestosService: ImpuestosService,
    private utilsService: UtilsService
  ) {
    this.listStatus = this.utilsService.convertEnumToItemSelectArray(Status);
  }

  async getTaxes(): Promise<any> {
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
    }
  }

  async editar(tax: Tax): Promise<void> {
    console.log(tax);
  }

  async loadTaxes(event: any): Promise<void> {
    const { first, rows } = event;
    this.offset = (first === 0 ? 0 : Math.ceil(first / rows)) * this.limit;
    this.limit = rows;

    await this.getTaxes();
  }

  async changeStatus(event: any): Promise<void> {
    this.status = event.value.value;

    await this.getTaxes();
  }
}
