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
export class GroupsService {
  constructor(private httpClient: HttpClient) { }
  
  getGroups(offset: number = 0, limit: number = 10) {
    const url = `${environment.API_URL}/v1/groups?offset=${offset}&limit=${limit}`;
    const request = this.httpClient.get<GenericResponse<Group>>(url, {
      context: checkToken(),
    });
    const response = lastValueFrom(request);
    
    return response.then(res => res.data as Group[])
      .then(data => data)
      .catch(error => {
        console.error('Error fetching groups:', error);
        throw error;
      });
  }

  addGroup(group: Group) {
    const url = `${environment.API_URL}/v1/groups`;
    const request = this.httpClient.post<GenericResponse<Group>>(url, group, {
      context: checkToken(),
    });
    const response = lastValueFrom(request);
    
    return response.then(res => res);
  }

  updateGroup(group: Group) {
    const url = `${environment.API_URL}/v1/groups/${group.group_id}`;
    const request = this.httpClient.patch<GenericResponse<Group>>(url, group, {
      context: checkToken(),
    });
    const response = lastValueFrom(request);
    
    return response.then(res => res);
  }
}
