import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, RoleDescriptor, UserType, Role, UserInfo } from '../model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient) {
    }

    getUsers(orgName: string): Observable<User[]> {
        return this.getAllUsers().pipe(
            map(users => users.filter(u => u.type !== UserType.API_KEY).filter(u => u.memberOf.find(org => org.name === orgName))));
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>('/admin/api/users');
    }

    getApiKeys(orgName: string): Observable<User[]> {
        return this.http.get<User[]>('/admin/api/users').pipe(
            map(users => users.filter(u => u.type === UserType.API_KEY).filter(u => u.memberOf.find(org => org.name === orgName))));
    }

    getRolesDescriptor(): Observable<{ [key in Role]?: RoleDescriptor }> {
        return this.http.get<RoleDescriptor[]>('/admin/api/roles').pipe(map(roleDesc => {
            const res: { [key in Role]?: RoleDescriptor } = {};
            roleDesc.forEach((roleDesc) => {
                res[roleDesc.role] = roleDesc;
            });
            return res;
        }));
    }

    getCurrent(): Observable<UserInfo> {
        return this.http.get<UserInfo>('/admin/api/users/current');
    }
}