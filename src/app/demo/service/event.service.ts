import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}

  getEvents() {
    const request = this.http.get<any>('assets/demo/data/scheduleevents.json');
    const response = lastValueFrom(request);

    return response.then(res => res.data as any[]).then(data => data);
  }
}
