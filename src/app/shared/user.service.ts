import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, RoleDescriptor, UserType, Role, UserInfo, RoleTarget } from '../model/user';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { OrganizationService } from './organization.service';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient, private organizationService: OrganizationService) {
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

    getRolesDescriptor(target: RoleTarget): Observable<{ [key in Role]?: RoleDescriptor }> {
        return this.http.get<RoleDescriptor[]>('/admin/api/roles').pipe(map(roleDesc => {
            const res: { [key in Role]?: RoleDescriptor } = {};
            roleDesc.forEach((roleDesc) => {
                if(roleDesc.target === target) {
                    res[roleDesc.role] = roleDesc;
                }
            });
            return res;
        }));
    }

    createApiKey(orgName: string, newApiKey: {role: string, description: string}): Observable<any> {
        return this.organizationService.getOrganizationId(orgName).pipe(flatMap(orgId => {
            return this.http.post('/admin/api/users/new', {
                type: "API_KEY", 
                target: "API_KEY",
                role: newApiKey.role,
                organizationId: orgId,
                description: newApiKey.description
            }, { params: {baseUrl: window.location.origin }});
        }));
    }

    updateApiKey(orgName: string, apiKey: User): Observable<any> {
        return this.organizationService.getOrganizationId(orgName).pipe(flatMap(orgId => {
            return this.http.post('/admin/api/users/edit', {
                id: apiKey.id,
                organizationId: orgId,
                role: apiKey.roles[0],
                username: apiKey.username,
                firstName: apiKey.firstName,
                lastName: apiKey.lastName,
                emailAddress: apiKey.emailAddress,
                type: apiKey.type,
                description: apiKey.description
            });
        }));
    }

    getCurrent(): Observable<UserInfo> {
        return this.http.get<UserInfo>('/admin/api/users/current');
    }

    logout(): Observable<any> {
        return this.http.post('/logout', {});
    }

    deleteUser(user: User): Observable<string> {
        return this.http.delete<string>(`/admin/api/users/${user.id}`);
    }

    toggleUser(user: User): Observable<string> {
        return this.http.post<string>(`/admin/api/users/2/enable/${!user.enabled}`, {});
    }
}