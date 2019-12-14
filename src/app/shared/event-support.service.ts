import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language } from '../model/language';
import { Currency } from '../model/currency';

@Injectable({ providedIn: 'root' })
export class EventSupportService {

    constructor(private http: HttpClient) {}

    getTimeZones(): Observable<string[]> {
        return this.http.get<string[]>('/admin/api/location/timezones');
    }
    
    getSupportedLanguages(): Observable<Language[]> {
        return this.http.get<Language[]>('/admin/api/events-supported-languages');
    }

    getCurrencies(): Observable<Currency[]> {
        return this.http.get<Currency[]>('/admin/api/utils/currencies');
    }
}