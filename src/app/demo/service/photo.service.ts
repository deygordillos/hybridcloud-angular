import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../api/image';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PhotoService {
  constructor(private http: HttpClient) {}

  getImages() {
    const request = this.http.get<any>('assets/demo/data/photos.json');
    const response = lastValueFrom(request);

    return response.then(res => res.data as Image[]).then(data => data);
  }
}
