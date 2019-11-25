import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventStatistic } from '../model/event-statistic';

@Injectable({providedIn: 'root'})
export class EventService {

    constructor(private http: HttpClient) {
    }


    getActiveEvents(): Observable<EventStatistic[]> {
        return this.http.get<EventStatistic[]>('/admin/api/active-events');
    }

    getExpiredEvents(): Observable<EventStatistic[]> {
        return this.http.get<EventStatistic[]>('/admin/api/expired-events');
    }

}