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

  private sanitizeGroup(company: Company): Partial<Company> {
    return {
      company_id: company.company_id,
      company_name: company.company_name,
      company_status: company.company_status
    };
  }

  private validateGroup(company: Company): void {
    if (!company.company_name || typeof company.company_name !== 'string' || company.company_name.trim().length === 0) {
      throw new Error('El nombre de la empresa es obligatorio y debe ser una cadena no vacía.');
    }
    if (company.company_name.trim().length < 5) {
      throw new Error('El nombre de la empresa debe tener al menos 5 caracteres.');
    }
    if (company.company_status && (typeof company.company_status !== 'number' || ![1, 0].includes(company.company_status))) {
      throw new Error('El estado de la empresa debe ser "1 - activo" o "0 - inactivo".');
    }
  }

  async getCompanies(offset: number = 0, limit: number = 10): Promise<Company[]> {
    const url = `${environment.API_URL}/v1/companies?offset=${offset}&limit=${limit}`;

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

  async addCompany(company: Company): Promise<GenericResponse<Company>> {
    this.validateGroup(company);
    const url = `${environment.API_URL}/v1/companies`;
    const sanitizedGroup = this.sanitizeGroup(company);
    try {
      const res = await lastValueFrom(
        this.httpClient.post<GenericResponse<Company>>(url, sanitizedGroup, {
          context: checkToken(),
        })
      );
      return res;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async updateCompany(company: Company): Promise<GenericResponse<Company>> {
    this.validateGroup(company);
    const url = `${environment.API_URL}/v1/companies/${company.group_id}`;
    const sanitizedGroup = this.sanitizeGroup(company);
    try {
      const res = await lastValueFrom(
        this.httpClient.patch<GenericResponse<Company>>(url, sanitizedGroup, {
          context: checkToken(),
        })
      );
      return res;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
