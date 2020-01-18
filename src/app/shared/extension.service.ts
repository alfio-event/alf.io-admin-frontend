import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtensionSupport } from '../model/extension';

@Injectable({ providedIn: 'root' })
export class ExtensionService {

    constructor(private http: HttpClient) {
    }

    getExtensions(): Observable<ExtensionSupport[]> {
        return this.http.get<ExtensionSupport[]>('/admin/api/extensions');
    }

    getSample(): Observable<ExtensionSupport> {
        return this.http.get<ExtensionSupport>('/admin/api/extensions/sample');
    }

    deleteExtension(extension: ExtensionSupport): Observable<any> {
        return this.http.delete(`/admin/api/extensions/${extension.path}/${extension.name}`);
    }
}