import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../model/organization';

@Injectable({providedIn: 'root'})
export class OrganizationService {

    constructor(private http: HttpClient) {
    }

    getOrganizations(): Observable<Organization[]> {
        return this.http.get<Organization[]>('/admin/api/organizations');
    }
}