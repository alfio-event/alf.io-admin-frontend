import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { EventStatistic } from '../model/event-statistic';
import { OrganizationService } from './organization.service';
import { map } from 'rxjs/operators';

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

    getEvent(eventShortName: string): Observable<any> {
        return this.http.get<any>('/admin/api/events/' + encodeURI(eventShortName));
    }

    getEventNamesByIds(ids: number[]): Observable<{[key: number]: string}> {
        return this.http.get<{[key: number]: string}>('/admin/api/events/name-by-ids', { params: { eventIds: ids.map(i=>i.toString()) } } );
    }

}