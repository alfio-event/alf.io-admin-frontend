import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtensionSupport } from '../model/extension';
import { PageAndContent } from '../model/page-and-content';
import { ExtensionLog, ExtensionLogType } from '../model/extension-log';

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

    createExtension(extension: {path: string, name: string, enabled: boolean, script: string}): Observable<any> {
      return this.http.post('/admin/api/extensions', extension);
    }

    updateExtension(previousPath: string, previousName: string, extension: {path: string, name: string, enabled: boolean, script: string}): Observable<any> {
      return this.http.post(`/admin/api/extensions/${previousPath}/${previousName}`, extension);
    }

    getLog(page: number = 0, path: string = undefined, name: string = undefined, type: ExtensionLogType = undefined): Observable<PageAndContent<ExtensionLog[]>> {
      let params = {page: page.toString()};
      if (path) {
        params['path'] = path;
      }
      if (name) {
        params['name'] = name;
      }
      if (type) {
        params['type'] = type.toString();
      }
      return this.http.get<PageAndContent<ExtensionLog[]>>(`/admin/api/extensions/log`, {params: params});
    }
}

export function fromPathToOrgAndEventId(path: string): {orgId: number, eventId: number, type: string} {
  let splitted = path.split('-').slice(1); // we have 3 possibilities: [''], ['1'] or ['1', '1']
  if (splitted.length === 1 && splitted[0] === '') {
    return {type: 'SYSTEM', orgId: undefined, eventId: undefined}; // system level
  } else if (splitted.length === 1 && splitted[0] !== '') {
    return {type: 'ORGANIZATION', orgId: parseInt(splitted[0], 10), eventId: undefined};
  } else if (splitted.length === 2) {
    return {type: 'EVENT', orgId: parseInt(splitted[0], 10), eventId: parseInt(splitted[1], 10)};
  } else {
    throw 'Wrong path format';
  }
}