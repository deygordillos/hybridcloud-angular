import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@app/interceptors/token-interceptor/token.interceptor';
import { GenericResponse } from '@app/models/generic-response.model';
import { Country } from '@app/models/country.model';
import { environment } from '@environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient) { }

  async getCountries(): Promise<Country[]> {
    const url = `${environment.API_URL}/v1/countries`;

    try {
      const res = await lastValueFrom(
        this.httpClient.get<GenericResponse<Country>>(url, {
          context: checkToken(),
        })
      );
      return res.data as Country[];
    } catch (error) {
      // Si el endpoint no existe, devolver lista vacía o datos mock
      console.warn('Endpoint de países no disponible:', error);
      return [];
    }
  }
}
