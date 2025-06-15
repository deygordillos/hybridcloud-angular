import { Component, OnInit } from '@angular/core';
import { Company } from '@app/models/company.model';
import { CompaniesService } from '@app/services/companies/companies.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-companies-crud',
  templateUrl: './companies-crud.component.html',
  styleUrls: ['./companies-crud.component.scss']
})
export class CompaniesCrudComponent implements OnInit {

  groupDialog: boolean = false;

  inactiveGroupDialog: boolean = false;

  inactiveGroupsSelectedDialog: boolean = false;

  groups: Company[] = [];

  group: Company = {};

  selectedList: Company[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private companySerice: CompaniesService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadGroups();

    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' },
    ];

    this.statuses = [
      { label: 'Activo', value: '1' },
      { label: 'Inactivo', value: '0' }
    ];
  }

  loadGroups() {
    this.companySerice.getGroups().then(data => (this.groups = data));
  }

  openNew() {
    this.group = {};
    this.submitted = false;
    this.groupDialog = true;
  }

  inactivateGroupsSelected() {
    this.inactiveGroupsSelectedDialog = true;
  }

  editProduct(group: Company) {
    this.group = { ...group };
    this.groupDialog = true;
  }

  inactiveGroup(group: Company) {
    this.inactiveGroupDialog = true;
    this.group = { ...group };
  }

  activeGroup(group: Company) {
    this.group = { ...group };
    this.group.group_status = 1; // Set group status to inactive
    this.updateGroup();
    this.loadGroups();
  }
  
  async confirmInactiveSelected() {
    this.inactiveGroupsSelectedDialog = false;
    
    await Promise.all(
      this.selectedList.map(group => {
        group.group_status = 0;
        return this.companySerice.updateGroup(group);
      })
    );

    this.messageService.add({
      severity: 'success',
      summary: '¡Éxito!',
      detail: 'Grupos han sido inactivados',
      life: 3000,
    });

    this.loadGroups();
    this.selectedList = [];
  }

  confirmInactivateGroup() {
    this.group.group_status = 0; // Set group status to inactive
    this.updateGroup();
  }

  updateGroup() {
    this.companySerice.updateGroup(this.group)
    .then(res => {
      this.inactiveGroupDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: '¡Éxito!',
        detail: 'Grupo actualizado',
        life: 3000,
      });
      this.group = {};
      this.loadGroups();
    })
    .catch(error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error?.message || 'No se pudo modificar el grupo',
        life: 3000,
      });
    });
  }

  addGroup() {
    this.companySerice.addGroup(this.group)
    .then(res => {
      this.messageService.add({
        severity: 'success',
        summary: '¡Éxito!',
        detail: 'Grupo ha sido creado',
        life: 3000,
      });
      this.group = {};
      this.loadGroups();
    })
    .catch(error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error?.message || 'No se pudo crear el grupo',
        life: 3000,
      });
    });
  }

  hideDialog() {
    this.groupDialog = false;
    this.submitted = false;
  }

  saveGroup() {
    this.submitted = true;

    if (this.group.group_name?.trim()) {
      if (this.group.group_id) {
        this.updateGroup();
      } else {
        this.addGroup();
      }
      this.groupDialog = false;
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].group_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
