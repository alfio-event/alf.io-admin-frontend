import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ConfigurationService {

    constructor(private http: HttpClient) {}


    isBasicConfigurationNeeded(): Observable<boolean> {
        return this.http.get<boolean>('/admin/api/configuration/basic-configuration-needed');
    }
}