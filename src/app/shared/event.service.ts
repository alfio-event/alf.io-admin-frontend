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

    createEvent(eventDescriptor): Observable<string> {
        return this.http.post<string>('/admin/api/events/new', eventDescriptor);
    }

}