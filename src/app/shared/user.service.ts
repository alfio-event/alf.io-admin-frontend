import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, RoleDescriptor } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('/admin/api/users');
    }

    getRolesDescriptor(): Observable<RoleDescriptor[]> {
        return this.http.get<RoleDescriptor[]>('/admin/api/roles');
    }
}