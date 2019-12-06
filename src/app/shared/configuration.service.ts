import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language } from '../model/language';
import { ConfigurationKeyValue, SettingCategory, ConfigurationKey } from '../model/configuration';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ConfigurationService {

    constructor(private http: HttpClient) {}

    getAllLanguages(): Observable<Language[]> {
        return this.http.get<Language[]>('/admin/api/events-all-languages');
    }

    isBasicConfigurationNeeded(): Observable<boolean> {
        return this.http.get<boolean>('/admin/api/configuration/basic-configuration-needed');
    }

    loadAllSystemLevel(): Observable<{[key in SettingCategory]?: {[k2 in ConfigurationKey]? : ConfigurationKeyValue}}> {
        return this.http.get<{[key in SettingCategory]?: ConfigurationKeyValue[]}>('/admin/api/configuration/load').pipe(map(transformConfRes));
    }
}

// transform a Map<SettingCategory, ConfigurationKeyValue[]> in Map<SettingCategory, Map<SettingCategory, ConfigurationKeyValue>>
function transformConfRes(res: {[key in SettingCategory]?: ConfigurationKeyValue[]}) : {[key in SettingCategory]?: {[k2 in ConfigurationKey]? : ConfigurationKeyValue}} {
    let confMap = {};
    Object.keys(res).forEach((k) => {
        let confKeyValues: ConfigurationKeyValue[] = res[k];
        confKeyValues.forEach((v) => {
            if(!confMap[k]) {
                confMap[k] = {};
            }
            confMap[k][v.key] = v;
        });
    })
    return confMap;
}