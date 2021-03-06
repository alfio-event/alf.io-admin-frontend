import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { EventStatistic } from '../model/event-statistic';
import { OrganizationService } from './organization.service';
import { map } from 'rxjs/operators';
import { PageAndContent } from '../model/page-and-content';
import { EmailLog } from '../model/email';
import { Language } from '../model/language';
import { EventOrganization } from '../model/event-organization';

@Injectable({ providedIn: 'root' })
export class EventService {

    constructor(private http: HttpClient, private organizationService: OrganizationService) {
    }


    getActiveEvents(orgName: string): Observable<EventStatistic[]> {
        return forkJoin(this.organizationService.getOrganizationId(orgName), this.http.get<EventStatistic[]>('/admin/api/active-events'))
            .pipe(map(([orgId, events]) =>
                events.filter(e => e.organizationId == orgId)
            ));
    }

    getExpiredEvents(orgName: string): Observable<EventStatistic[]> {
        return forkJoin(this.organizationService.getOrganizationId(orgName), this.http.get<EventStatistic[]>('/admin/api/expired-events'))
            .pipe(map(([orgId, events]) =>
                events.filter(e => e.organizationId == orgId)
            ));

    }

    createEvent(eventDescriptor: any): Observable<string> {
        return this.http.post<string>('/admin/api/events/new', eventDescriptor);
    }

    getEvent(eventShortName: string): Observable<EventOrganization> {
        return this.http.get<EventOrganization>('/admin/api/events/' + encodeURI(eventShortName));
    }

    getEventNamesByIds(ids: number[]): Observable<{[key: number]: string}> {
        return this.http.get<{[key: number]: string}>('/admin/api/events/name-by-ids', { params: { eventIds: ids.map(i=>i.toString()) } } );
    }

    getEventNamesByOrgId(orgId: number): Observable<{[key: number]: string}> {
        return this.http.get<{[key: number]: string}>(`/admin/api/events/names-in-organization/${orgId}`);
    }


    getEmailLog(eventShortName: string, page: number, searchTerm: string = null): Observable<PageAndContent<EmailLog[]>> {
        let params = {page: page.toString(10)};
        if (searchTerm) {
            params['search'] = searchTerm;
        }
        return this.http.get<PageAndContent<EmailLog[]>>(`/admin/api/events/${encodeURI(eventShortName)}/email/`, {params: params});
    }

    getEmail(eventShortName: string, emailId: number): Observable<EmailLog> {
        return this.http.get<EmailLog>(`/admin/api/events/${encodeURI(eventShortName)}/email/${emailId}`);
    }

    getSelectedLanguages(eventShortName: string): Observable<Language[]> {
        return this.http.get<Language[]>(`/admin/api/events/${encodeURI(eventShortName)}/languages`);
    }
}