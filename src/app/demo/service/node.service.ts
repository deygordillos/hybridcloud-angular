import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NodeService {
  constructor(private http: HttpClient) {}

  getFiles() {
    const request = this.http.get<any>('assets/demo/data/files.json');
    const response = lastValueFrom(request);

    return response.then(res => res.data as TreeNode[]);
  }

  getLazyFiles() {
    const request = this.http.get<any>('assets/demo/data/files-lazy.json');
    const response = lastValueFrom(request);

    return response.then(res => res.data as TreeNode[]);
  }

  getFilesystem() {
    const request = this.http.get<any>('assets/demo/data/filesystem.json');
    const response = lastValueFrom(request);

    return response.then(res => res.data as TreeNode[]);
  }

  getLazyFilesystem() {
    const request = this.http.get<any>('assets/demo/data/filesystem-lazy.json');
    const response = lastValueFrom(request);

    return response.then(res => res.data as TreeNode[]);
  }
}
