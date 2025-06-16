import { Component, OnInit } from '@angular/core';
import { Company } from '@app/models/company.model';
import { Group } from '@app/models/group.model';
import { CompaniesService } from '@app/services/companies/companies.service';
import { GroupsService } from '@app/services/groups/groups.service';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-companies-crud',
  templateUrl: './companies-crud.component.html',
  styleUrls: ['./companies-crud.component.scss']
})
export class CompaniesCrudComponent implements OnInit {

  companyDialog: boolean = false;

  inactiveDialog: boolean = false;

  inactiveSelectedDialog: boolean = false;
  isCompanyPrincipal: boolean = false;

  groups: SelectItem[] = [];
  companies: Company[] = [];

  company: Company = {};

  selectedList: Company[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private groupsService: GroupsService,
    private companyService: CompaniesService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.groupsService.getGroups().then(data => {
      this.groups = data.map(group => ({
        label: group.group_name,
        value: group.group_id
      }));
    });
    this.loadCompanies();

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

  loadCompanies() {
    this.companyService.getCompanies().then(data => (this.companies = data));
  }

  openNew() {
    this.company = {};
    this.submitted = false;
    this.companyDialog = true;
  }

  inactivateSelected() {
    this.inactiveSelectedDialog = true;
  }

  editCompany(company: Company) {
    this.company = { ...company };
    this.companyDialog = true;
  }

  inactiveCompany(company: Company) {
    this.inactiveDialog = true;
    this.company = { ...company };
  }

  activeCompany(company: Company) {
    this.company = { ...company };
    this.company.company_status = 1; // Set group status to inactive
    this.updateCompany();
    this.loadCompanies();
  }
  
  async confirmInactiveSelected() {
    this.inactiveSelectedDialog = false;
    
    await Promise.all(
      this.selectedList.map(company => {
        company.company_status = 0;
        return this.companyService.updateCompany(company);
      })
    );

    this.messageService.add({
      severity: 'success',
      summary: '¡Éxito!',
      detail: 'Empresas han sido inactivadas',
      life: 3000,
    });

    this.loadCompanies();
    this.selectedList = [];
  }

  confirmInactivateGroup() {
    this.company.company_status = 0; // Set company status to inactive
    this.updateCompany();
  }

  updateCompany() {
    this.companyService.updateCompany(this.company)
    .then(res => {
      this.inactiveDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: '¡Éxito!',
        detail: 'Empresa actualizada',
        life: 3000,
      });
      this.company = {};
      this.loadCompanies();
    })
    .catch(error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error?.message || 'No se pudo modificar la empresa',
        life: 3000,
      });
    });
  }

  addCompany() {
    this.companyService.addCompany(this.company)
    .then(res => {
      this.messageService.add({
        severity: 'success',
        summary: '¡Éxito!',
        detail: 'Grupo ha sido creado',
        life: 3000,
      });
      this.company = {};
      this.loadCompanies();
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
    this.companyDialog = false;
    this.submitted = false;
  }

  saveCompany() {
    this.submitted = true;

    if (this.company.company_name?.trim()) {
      if (this.company.company_id) {
        //this.updateGroup();
      } else {
        this.addCompany();
      }
      this.companyDialog = false;
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.companies.length; i++) {
      if (this.companies[i].company_id === id) {
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
