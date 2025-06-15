import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@app/interceptors/token-interceptor/token.interceptor';
import { GenericResponse } from '@app/models/generic-response.model';
import { Group } from '@app/models/group.model';
import { environment } from '@environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private httpClient: HttpClient) { }

  private sanitizeGroup(group: Group): Partial<Group> {
    return {
      group_id: group.group_id,
      group_name: group.group_name,
      group_status: group.group_status
    };
  }

  private validateGroup(group: Group): void {
    if (!group.group_name || typeof group.group_name !== 'string' || group.group_name.trim().length === 0) {
      throw new Error('El nombre del grupo es obligatorio y debe ser una cadena no vacía.');
    }
    if (group.group_name.trim().length < 5) {
      throw new Error('El nombre del grupo debe tener al menos 5 caracteres.');
    }
    if (group.group_status && (typeof group.group_status !== 'number' || ![1, 0].includes(group.group_status))) {
      throw new Error('El estado del grupo debe ser "1 - activo" o "0 - inactivo".');
    }
  }

  async getGroups(offset: number = 0, limit: number = 10): Promise<Group[]> {
    const url = `${environment.API_URL}/v1/groups?offset=${offset}&limit=${limit}`;

    try {
      const res = await lastValueFrom(
        this.httpClient.get<GenericResponse<Group>>(url, {
          context: checkToken(),
        })
      );
      return res.data as Group[];
    } catch (error) {
      throw error;
    }
  }

  async addGroup(group: Group): Promise<GenericResponse<Group>> {
    this.validateGroup(group);
    const url = `${environment.API_URL}/v1/groups`;
    const sanitizedGroup = this.sanitizeGroup(group);
    try {
      const res = await lastValueFrom(
        this.httpClient.post<GenericResponse<Group>>(url, sanitizedGroup, {
          context: checkToken(),
        })
      );
      return res;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async updateGroup(group: Group): Promise<GenericResponse<Group>> {
    this.validateGroup(group);
    const url = `${environment.API_URL}/v1/groups/${group.group_id}`;
    const sanitizedGroup = this.sanitizeGroup(group);
    try {
      const res = await lastValueFrom(
        this.httpClient.patch<GenericResponse<Group>>(url, sanitizedGroup, {
          context: checkToken(),
        })
      );
      return res;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
