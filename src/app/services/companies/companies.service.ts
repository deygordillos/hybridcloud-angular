import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@app/interceptors/token-interceptor/token.interceptor';
import { GenericResponse } from '@app/models/generic-response.model';
import { Company } from '@app/models/company.model';
import { environment } from '@environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private httpClient: HttpClient) { }

  private sanitizeCompany(company: Company): Partial<Company> {
    const sanitized: any = {};
    
    // Campos requeridos según API
    if (company.group_id !== undefined) {
      sanitized.group_id = typeof company.group_id === 'object' 
        ? company.group_id.group_id 
        : company.group_id;
    }
    if (company.company_is_principal !== undefined) {
      sanitized.company_is_principal = typeof company.company_is_principal === 'boolean'
        ? company.company_is_principal
        : company.company_is_principal === 1;
    }
    if (company.company_name) sanitized.company_name = company.company_name;
    if (company.company_razon_social) sanitized.company_razon_social = company.company_razon_social;
    if (company.company_id_fiscal) sanitized.company_id_fiscal = company.company_id_fiscal;
    if (company.company_email) sanitized.company_email = company.company_email;
    if (company.company_phone1) sanitized.company_phone1 = company.company_phone1;
    if (company.company_start) sanitized.company_start = company.company_start;
    if (company.company_end) sanitized.company_end = company.company_end;
    if (company.country_id) sanitized.country_id = company.country_id;

    // Campos opcionales
    if (company.company_status !== undefined) sanitized.company_status = company.company_status;
    if (company.company_color) sanitized.company_color = company.company_color;
    if (company.company_phone2) sanitized.company_phone2 = company.company_phone2;
    if (company.company_address) sanitized.company_address = company.company_address;
    if (company.company_facebook) sanitized.company_facebook = company.company_facebook;
    if (company.company_instagram) sanitized.company_instagram = company.company_instagram;
    if (company.company_website) sanitized.company_website = company.company_website;
    if (company.company_url_logo) sanitized.company_url_logo = company.company_url_logo;
    if (company.company_contact_name) sanitized.company_contact_name = company.company_contact_name;
    if (company.company_contact_phone) sanitized.company_contact_phone = company.company_contact_phone;
    if (company.company_contact_email) sanitized.company_contact_email = company.company_contact_email;

    return sanitized;
  }

  private validateCompany(company: Company, isUpdate: boolean = false): void {
    if (!isUpdate || company.company_name !== undefined) {
      if (!company.company_name || typeof company.company_name !== 'string' || company.company_name.trim().length === 0) {
        throw new Error('El nombre de la empresa es obligatorio y debe ser una cadena no vacía.');
      }
      if (company.company_name.trim().length < 3) {
        throw new Error('El nombre de la empresa debe tener al menos 3 caracteres.');
      }
    }

    if (!isUpdate) {
      // Validaciones solo para creación
      if (!company.group_id) {
        throw new Error('El grupo es obligatorio.');
      }
      if (company.company_is_principal === undefined) {
        throw new Error('Debe indicar si es empresa principal.');
      }
      if (!company.company_razon_social || company.company_razon_social.trim().length < 3) {
        throw new Error('La razón social es obligatoria y debe tener al menos 3 caracteres.');
      }
      if (!company.company_id_fiscal || company.company_id_fiscal.trim().length < 3) {
        throw new Error('El ID fiscal es obligatorio y debe tener al menos 3 caracteres.');
      }
      if (!company.company_email || !this.isValidEmail(company.company_email)) {
        throw new Error('El correo electrónico es obligatorio y debe ser válido.');
      }
      if (!company.company_phone1) {
        throw new Error('El teléfono principal es obligatorio.');
      }
      if (!company.company_start) {
        throw new Error('La fecha de inicio es obligatoria.');
      }
      if (!company.company_end) {
        throw new Error('La fecha de fin es obligatoria.');
      }
      if (!company.country_id) {
        throw new Error('El país es obligatorio.');
      }
    }

    if (company.company_status !== undefined && ![1, 0].includes(company.company_status)) {
      throw new Error('El estado de la empresa debe ser "1 - activo" o "0 - inactivo".');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async getCompanies(offset?: number, limit?: number): Promise<Company[]> {
    // Construir URL base
    let url = `${environment.API_URL}/v1/companies`;
    
    // Agregar parámetros de paginación solo si se proporcionan
    const params: string[] = [];
    if (offset !== undefined) params.push(`offset=${offset}`);
    if (limit !== undefined) params.push(`limit=${limit}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    try {
      const res = await lastValueFrom(
        this.httpClient.get<GenericResponse<Company>>(url, {
          context: checkToken(),
        })
      );
      return res.data as Company[];
    } catch (error) {
      throw error;
    }
  }

  private formatErrorMessage(error: any): string {
    // Manejar estructura de error con campo 'errors'
    if (error?.error?.errors && Array.isArray(error.error.errors)) {
      const errorMessages = error.error.errors
        .map((err: any) => err.msg)
        .filter((msg: string) => msg) // Filtrar mensajes vacíos
        .join(', ');
      return errorMessages || error?.error?.message || 'Error en la operación';
    }
    
    // Fallback para otros formatos de error
    return error?.error?.message || error?.message || 'Error en la operación';
  }

  async addCompany(company: Company): Promise<GenericResponse<Company>> {
    this.validateCompany(company);
    const url = `${environment.API_URL}/v1/companies`;
    const sanitizedCompany = this.sanitizeCompany(company);
    
    try {
      const res = await lastValueFrom(
        this.httpClient.post<GenericResponse<Company>>(url, sanitizedCompany, {
          context: checkToken(),
        })
      );
      return res;
    } catch (error: any) {
      throw new Error(this.formatErrorMessage(error));
    }
  }

  async updateCompany(company: Company, fullUpdate: boolean = false): Promise<GenericResponse<Company>> {
    if (!company.company_id) {
      throw new Error('El ID de la empresa es requerido para actualizar.');
    }

    this.validateCompany(company, true);
    const url = `${environment.API_URL}/v1/companies/${company.company_id}`;
    const sanitizedCompany = this.sanitizeCompany(company);
    
    try {
      const method = fullUpdate ? 'put' : 'patch';
      const res = await lastValueFrom(
        this.httpClient[method]<GenericResponse<Company>>(url, sanitizedCompany, {
          context: checkToken(),
        })
      );
      return res;
    } catch (error: any) {
      throw new Error(this.formatErrorMessage(error));
    }
  }

  async registerAdmin(companyId: number, adminData: {
    username: string;
    password: string;
    first_name: string;
    email: string;
  }): Promise<GenericResponse<any>> {
    if (!companyId) {
      throw new Error('El ID de la empresa es requerido.');
    }

    if (!adminData.username || adminData.username.trim().length < 3) {
      throw new Error('El nombre de usuario es obligatorio y debe tener al menos 3 caracteres.');
    }

    if (!adminData.password || adminData.password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }

    // Validar que contenga mayúscula, minúscula y número
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(adminData.password)) {
      throw new Error('La contraseña debe contener al menos una mayúscula, una minúscula y un número.');
    }

    if (!adminData.first_name || adminData.first_name.trim().length < 2) {
      throw new Error('El nombre es obligatorio y debe tener al menos 2 caracteres.');
    }

    if (!adminData.email || !this.isValidEmail(adminData.email)) {
      throw new Error('El correo electrónico es obligatorio y debe ser válido.');
    }

    const url = `${environment.API_URL}/v1/companies/register_admin/${companyId}`;

    try {
      const res = await lastValueFrom(
        this.httpClient.post<GenericResponse<any>>(url, adminData, {
          context: checkToken(),
        })
      );
      return res;
    } catch (error: any) {
      throw new Error(this.formatErrorMessage(error));
    }
  }
}