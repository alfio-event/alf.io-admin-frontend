import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../model/organization';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrganizationService {

    constructor(private http: HttpClient) {
    }

    getOrganizations(): Observable<Organization[]> {
        return this.http.get<Organization[]>('/admin/api/organizations');
    }

    getOrganization(orgName: string): Observable<Organization[]> {
        return this.http.get<Organization[]>('/admin/api/organizations').pipe(map(orgs => orgs.filter(o => o.name === orgName)));
    }

    getOrganizationId(orgName: string): Observable<number> {
        return this.getOrganization(orgName).pipe(map(orgs => orgs[0].id));
    }

    check(newOrg: {name: string, email: string, description: string}): Observable<any> {
        return this.http.post('/admin/api/organizations/check', newOrg);
    }

    createNew(newOrg: {name: string, email: string, description: string}): Observable<string> {
        return this.http.post<string>('/admin/api/organizations/new', newOrg);
    }

    update(org: {id: number, name: string, email: string, description: string}): Observable<string> {
        return this.http.post<string>('/admin/api/organizations/update', org);
    }
}