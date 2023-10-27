import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from '@app/enums/status';
import { checkToken } from '@app/interceptors/token-interceptor/token.interceptor';
import { GenericResponse } from '@app/models/generic-response.model';
import { Tax } from '@app/models/tax.model';
import { environment } from '@environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImpuestosService {
  url = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  getTaxes(
    status: Status,
    offset: number,
    limit: number
  ): Promise<GenericResponse<Tax>> {
    const response = this.httpClient.get<GenericResponse<Tax>>(
      `${this.url}/v1/taxes/?tax_status=${status}&offset=${offset}&limit=${limit}`,
      {
        context: checkToken(),
      }
    );

    return lastValueFrom(response);
  }
}
