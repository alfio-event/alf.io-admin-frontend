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

    createUser(orgName: string, user: {role: string, username: string, firstName: string,lastName: string, email: string}): Observable<any> {
        return this.organizationService.getOrganizationId(orgName).pipe(flatMap(orgId => {
            return this.http.post('/admin/api/users/new', {
                target: "USER",
                organizationId: orgId,
                role: user.role,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                emailAddress: user.email
            }, { params: {baseUrl: window.location.origin }});
        }));
    }

    updateUser(orgName: string, user: User): Observable<any> {
        return this.updateUserInternal(orgName, user);
    }

    updateApiKey(orgName: string, apiKey: User): Observable<any> {
        return this.updateUserInternal(orgName, apiKey);
    }

    private updateUserInternal(orgName: string, user: User): Observable<any> {
        return this.organizationService.getOrganizationId(orgName).pipe(flatMap(orgId => {
            return this.http.post('/admin/api/users/edit', {
                id: user.id,
                organizationId: orgId,
                role: user.roles[0],
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                emailAddress: user.emailAddress,
                type: user.type,
                description: user.description
            });
        }));
    }

    getCurrent(): Observable<UserInfo> {
        return this.http.get<UserInfo>('/admin/api/users/current');
    }

    updateCurrentUser(update: {firstName, lastName, emailAddress}): Observable<void> {
        return this.http.post<void>('/admin/api/users/current/edit', update);
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