import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscriber, forkJoin } from 'rxjs';
import { Language } from '../model/language';
import { Currency } from '../model/currency';
import { ProviderAndKeys, GeoInfoProvider } from '../model/provider-and-key';
import { flatMap } from 'rxjs/operators';
import { Geolocation } from '../model/geolocation';

@Injectable({ providedIn: 'root' })
export class EventSupportService {

    private reqCounter = 0;

    constructor(private http: HttpClient, private zone: NgZone) {}
    
    getSupportedLanguages(): Observable<Language[]> {
        return this.http.get<Language[]>('/admin/api/events-supported-languages');
    }

    getCurrencies(): Observable<Currency[]> {
        return this.http.get<Currency[]>('/admin/api/utils/currencies');
    }

    mapApiKey(): Observable<ProviderAndKeys> {
        return this.http.get<ProviderAndKeys>('/admin/api/location/map-provider-client-api-key');
    }

    getTimeZones(): Observable<string[]> {
        return this.http.get<string[]>('/admin/api/location/timezones');
    }

    getTimezone(latitude: string, longitude: string): Observable<string> {
        return this.http.get<string>('/admin/api/location/timezone', {params: {lat: latitude, lng: longitude}});
    }

    getMapUrl(latitude: string, longitude: string): Observable<string> {
        return this.http.get<string>('/admin/api/location/static-map-image', {params: {lat: latitude, lng: longitude}})
    }

    private geolocateGoogle(location: string, conf: ProviderAndKeys): Observable<Geolocation> {

        const key = conf.keys['MAPS_CLIENT_API_KEY'];
        const keyParam = key ? ('&key='+encodeURIComponent(key)) : '';

        const googleSearch = (subscriber: Subscriber<Geolocation>) => {
            const geocoder = new window['google'].maps.Geocoder();
            geocoder.geocode({'address': location}, (results, status) => {
                if (status === 'OK') {
                    const res = new Geolocation();
                    res.latitude = "" + results[0].geometry.location.lat();
                    res.longitude = "" + results[0].geometry.location.lng();
                    forkJoin(this.getMapUrl(res.latitude, res.longitude), this.getTimezone(res.latitude, res.longitude)).subscribe(([mapUrl, tz]) => {
                        res.mapUrl = mapUrl;
                        res.timeZone = tz;
                        this.zone.runTask(() => subscriber.next(res));
                    }, () => this.zone.runTask(() => subscriber.error()));
                } else {
                    this.zone.runTask(() => subscriber.error());
                }
            });
        };

        return new Observable<Geolocation>((subscriber: Subscriber<Geolocation>) => {
            if (!window['google'] || !window['google'].maps) {
                this.reqCounter++;
                const script = document.createElement('script');
                const callBackName = 'clientGeolocate'+this.reqCounter;
                script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback='+callBackName+keyParam;
                document.head.appendChild(script);
                window[callBackName] = () => {
                    googleSearch(subscriber);
                }
            } else {
                googleSearch(subscriber);
            }
        });
    }

    private geolocateHERE(location: string, conf: ProviderAndKeys): Observable<Geolocation> {
        return of(new Geolocation());
    }

    clientGeolocate(location: string): Observable<Geolocation> {
        return this.mapApiKey().pipe(flatMap(conf => {
            switch(conf.provider) {
                case GeoInfoProvider.GOOGLE: return this.geolocateGoogle(location, conf);
                case GeoInfoProvider.HERE: return this.geolocateHERE(location, conf);
                case GeoInfoProvider.NONE: return of(new Geolocation());
            }
        }))
    }
}