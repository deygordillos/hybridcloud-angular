import { Injectable } from '@angular/core';
import { ModalConfirm } from '@models/modalConfirm.model';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private confirmationService: ConfirmationService
  ) { }

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
}
