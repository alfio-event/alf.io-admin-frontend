import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language } from '../model/language';
import { ConfigurationKeyValue, SettingCategory, ConfigurationKey, ConfigurationModification } from '../model/configuration';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

export type ConfigurationMap = {[key in SettingCategory]?: {[k2 in ConfigurationKey]? : ConfigurationKeyValue}};

@Injectable({providedIn: 'root'})
export class ConfigurationService {

    constructor(private http: HttpClient, private fb: FormBuilder) {}

    getAllLanguages(): Observable<Language[]> {
        return this.http.get<Language[]>('/admin/api/events-all-languages');
    }

    isBasicConfigurationNeeded(): Observable<boolean> {
        return this.http.get<boolean>('/admin/api/configuration/basic-configuration-needed');
    }

    loadAllSystemLevel(): Observable<ConfigurationMap> {
        return this.http.get<{[key in SettingCategory]?: ConfigurationKeyValue[]}>('/admin/api/configuration/load').pipe(map(transformConfRes));
    }

    mapLanguagesConfigurationValueToLanguages(languagesValue: number, languages: Language[]): Language[] {
        const r = [];
        languages.forEach(l => {
            if ((l.value & languagesValue) == l.value) {
                r.push(l);
            }
        })
        return r;
    }

    updateSystemBulk(toUpdate: {[key in SettingCategory]?: ConfigurationModification[]}): Observable<boolean> {
        return this.http.post<boolean>('/admin/api/configuration/update-bulk', toUpdate);
    }

    buildGroupFor(configurationGroup: {[k2 in ConfigurationKey]? : ConfigurationKeyValue}): FormGroup {
        var g = {};
        Object.keys(configurationGroup).forEach(k => {
            g[k] = [configurationGroup[k].value]
        });
        return this.fb.group(g);
    }
}

// transform a Map<SettingCategory, ConfigurationKeyValue[]> in Map<SettingCategory, Map<SettingCategory, ConfigurationKeyValue>>
function transformConfRes(res: {[key in SettingCategory]?: ConfigurationKeyValue[]}) : ConfigurationMap {
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