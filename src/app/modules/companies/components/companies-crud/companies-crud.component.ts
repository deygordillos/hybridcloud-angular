import { Component, OnInit } from '@angular/core';
import { Company } from '@app/models/company.model';
import { Country } from '@app/models/country.model';
import { CompaniesService } from '@app/services/companies/companies.service';
import { GroupsService } from '@app/services/groups/groups.service';
import { CountriesService } from '@app/services/countries/countries.service';
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
  registerAdminDialog: boolean = false;
  viewAdminsDialog: boolean = false;

  groups: SelectItem[] = [];
  countries: SelectItem[] = [];
  companies: Company[] = [];

  company: Company = {};

  adminData = {
    username: '',
    password: '',
    first_name: '',
    email: ''
  };

  selectedList: Company[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private groupsService: GroupsService,
    private companyService: CompaniesService,
    private countriesService: CountriesService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadGroups();
    this.loadCountries();
    this.loadCompanies();

    this.cols = [
      { field: 'company_id', header: 'ID' },
      { field: 'company_name', header: 'Nombre' },
      { field: 'company_razon_social', header: 'Razón Social' },
      { field: 'company_email', header: 'Email' },
      { field: 'company_status', header: 'Estado' },
    ];

    this.statuses = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 0 }
    ];
  }

  loadGroups() {
    this.groupsService.getGroups().then(data => {
      this.groups = data.map(group => ({
        label: group.group_name,
        value: group.group_id
      }));
    }).catch(error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar los grupos',
        life: 3000,
      });
    });
  }

  loadCountries() {
    this.countriesService.getCountries().then(data => {
      this.countries = data.map(country => ({
        label: country.country_name,
        value: country.country_id
      }));
    }).catch(error => {
      console.warn('No se pudieron cargar los países:', error);
      this.countries = [
        { label: 'Venezuela', value: 1 },
        { label: 'Colombia', value: 2 },
        { label: 'México', value: 3 },
        { label: 'Estados Unidos', value: 4 },
      ];
    });
  }

  loadCompanies() {
    this.companyService.getCompanies().then(data => (this.companies = data))
      .catch(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las empresas',
          life: 3000,
        });
      });
  }

  openNew() {
    this.company = {
      company_status: 1,
      company_is_principal: false
    };
    this.submitted = false;
    this.companyDialog = true;
  }

  inactivateSelected() {
    this.inactiveSelectedDialog = true;
  }

  editCompany(company: Company) {
    this.company = { ...company };
    if (this.company.group_id && typeof this.company.group_id === 'object') {
      this.company.group_id = (this.company.group_id as any).group_id;
    }
    if (this.company.country_id && typeof this.company.country_id === 'object') {
      this.company.country_id = (this.company.country_id as any).country_id;
    }
    // Convertir fechas string a objetos Date para p-calendar
    if (this.company.company_start && typeof this.company.company_start === 'string') {
      this.company.company_start = new Date(this.company.company_start);
    }
    if (this.company.company_end && typeof this.company.company_end === 'string') {
      this.company.company_end = new Date(this.company.company_end);
    }
    console.log(this.company);
    this.companyDialog = true;
  }

  inactiveCompany(company: Company) {
    this.inactiveDialog = true;
    this.company = { ...company };
  }

  activeCompany(company: Company) {
    this.company = { ...company };
    this.company.company_status = 1;
    this.updateCompany();
  }

  openRegisterAdmin(company: Company) {
    this.company = { ...company };
    
    // Si ya tiene administradores, mostrar lista
    if (this.hasAdminUsers(company)) {
      this.viewAdminsDialog = true;
    } else {
      // Si no tiene, mostrar formulario de registro
      this.adminData = {
        username: '',
        password: '',
        first_name: '',
        email: ''
      };
      this.registerAdminDialog = true;
    }
  }

  viewAdminUsers(company: Company) {
    this.company = { ...company };
    this.viewAdminsDialog = true;
  }

  hideViewAdminsDialog() {
    this.viewAdminsDialog = false;
  }

  getAdminUsers(company: Company): any[] {
    return (company as any).admin_users || [];
  }
  
  async confirmInactiveSelected() {
    this.inactiveSelectedDialog = false;
    try {
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
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error?.message || 'No se pudieron inactivar las empresas',
        life: 3000,
      });
    }
  }

  confirmInactivateCompany() {
    this.company.company_status = 0;
    this.updateCompany();
  }

  updateCompany() {
    this.companyService.updateCompany(this.company)
      .then(res => {
        this.companyDialog = false;
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
        this.companyDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: '¡Éxito!',
          detail: 'Empresa ha sido creada',
          life: 3000,
        });
        this.company = {};
        this.loadCompanies();
      })
      .catch(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.message || 'No se pudo crear la empresa',
          life: 3000,
        });
      });
  }

  async registerAdmin() {
    if (!this.company.company_id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar una empresa',
        life: 3000,
      });
      return;
    }
    try {
      await this.companyService.registerAdmin(this.company.company_id, this.adminData);
      this.messageService.add({
        severity: 'success',
        summary: '¡Éxito!',
        detail: 'Administrador registrado correctamente',
        life: 3000,
      });
      this.registerAdminDialog = false;
      this.adminData = {
        username: '',
        password: '',
        first_name: '',
        email: ''
      };
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error?.message || 'No se pudo registrar el administrador',
        life: 3000,
      });
    }
  }

  hideDialog() {
    this.companyDialog = false;
    this.submitted = false;
  }

  hideRegisterAdminDialog() {
    this.registerAdminDialog = false;
  }

  saveCompany() {
    this.submitted = true;
    if (!this.company.company_name?.trim()) {
      return;
    }
    if (this.company.company_id) {
      this.updateCompany();
    } else {
      if (!this.company.group_id || !this.company.company_razon_social?.trim() ||
          !this.company.company_id_fiscal?.trim() || !this.company.company_email?.trim() ||
          !this.company.company_phone1?.trim() || !this.company.company_start ||
          !this.company.company_end || !this.company.country_id) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'Por favor complete todos los campos obligatorios',
          life: 3000,
        });
        return;
      }
      this.addCompany();
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

  getGroupName(groupId: any): string {
    if (typeof groupId === 'object' && groupId?.group_name) {
      return groupId.group_name;
    }
    const group = this.groups.find(g => g.value === groupId);
    return group?.label || 'N/A';
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  hasAdminUsers(company: Company): boolean {
    return Array.isArray((company as any).admin_users) && (company as any).admin_users.length > 0;
  }

  formatAssignedDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
