import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language } from '../model/language';
import { ConfigurationKeyValue, SettingCategory } from '../model/configuration';

@Injectable({providedIn: 'root'})
export class ConfigurationService {

    constructor(private http: HttpClient) {}

    getAllLanguages(): Observable<Language[]> {
        return this.http.get<Language[]>('/admin/api/events-all-languages');
    }

    isBasicConfigurationNeeded(): Observable<boolean> {
        return this.http.get<boolean>('/admin/api/configuration/basic-configuration-needed');
    }

    loadAllSystemLevel(): Observable<Record<SettingCategory, ConfigurationKeyValue>> {
        return this.http.get<Record<SettingCategory, ConfigurationKeyValue>>('/admin/api/configuration/load');
    }
}