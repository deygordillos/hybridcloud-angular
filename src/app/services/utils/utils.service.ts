import { Injectable, Type } from '@angular/core';
import { ModalConfirm } from '@models/modalConfirm.model';
import { ConfirmationService, Message, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  openToast(message: Message): void {
    const { severity, summary, detail, life } = message;

    this.messageService.add({
      key: 'tst',
      severity,
      summary,
      detail,
      life: life ?? 5000,
    });
  }

  openModalConfirm(dataModal: ModalConfirm): Promise<boolean> {
    const { header, message, icon, acceptLabel, rejectLabel } = dataModal;

    return new Promise((resolve, reject) => {
      this.confirmationService.confirm({
        header,
        message,
        icon: icon ?? 'pi pi-exclamation-triangle',
        acceptLabel: acceptLabel ?? 'Sí',
        rejectLabel: rejectLabel ?? 'No',
        accept: () => {
          resolve(true);
        },
        reject: () => {
          reject(false);
        },
      });
    });
  }

  async openModal(
    component: Type<any>,
    config: DynamicDialogConfig
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialogService.open(component, config);

      dialogRef.onClose.subscribe(result => {
        resolve(result);
      });

      dialogRef.onClose.subscribe(() => {
        reject(null);
      });
    });
  }

  convertEnumToItemSelectArray<T extends Record<string, string | number>>(
    enumObj: T
  ): SelectItem[] {
    return Object.entries(enumObj)
      .filter(([_, value]) => typeof value === 'number')
      .map(([key, value]) => ({
        label: key,
        value: value as string | number,
      }));
  }

  generarArrayRange(
    numeroInicial: number,
    cantidadElementos: number
  ): number[] {
    return Array.from(
      { length: cantidadElementos },
      (_, index) => numeroInicial + index
    );
  }
}
