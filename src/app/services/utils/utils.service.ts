import { Injectable, Type } from '@angular/core';
import { ModalConfirm } from '@models/modalConfirm.model';
import { ConfirmationService, Message } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  openToast(message: Message): void {
    const { severity, summary, detail } = message;

    this.messageService.add({ key: 'tst', severity, summary, detail });
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
        }
      })
    });
  }

  async openModal(component: Type<any> , config: DynamicDialogConfig): Promise<any> {
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
}
