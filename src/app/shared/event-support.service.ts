import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscriber, forkJoin } from 'rxjs';
import { Language } from '../model/language';
import { Currency } from '../model/currency';
import { ProviderAndKeys, GeoInfoProvider } from '../model/provider-and-key';
import { flatMap, map } from 'rxjs/operators';
import { Geolocation } from '../model/geolocation';
import { OrganizationService } from './organization.service';
import { PaymentProxy } from '../model/payment-proxy';

@Injectable({ providedIn: 'root' })
export class EventSupportService {

    private reqCounter = 0;

    constructor(private http: HttpClient, private zone: NgZone, private organizationService: OrganizationService) {}

    getBaseUrl(): Observable<string> {
        return of(window.location.origin);
    }
    
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

    generateEventShortName(displayName: string): Observable<string> {
        return this.http.get<string>('/admin/api/utils/short-name/generate', {params: {displayName: displayName}});
    }

    private handleLatLong(latitude: string, longitude: string, subscriber: Subscriber<Geolocation>) {
        forkJoin(this.getMapUrl(latitude, longitude), this.getTimezone(latitude, longitude)).subscribe(([mapUrl, tz]) => {
            this.zone.runTask(() => subscriber.next({latitude: latitude, longitude: longitude, mapUrl: mapUrl, timeZone: tz}));
        }, () => this.zone.runTask(() => subscriber.error()));
    }

    private geolocateGoogle(location: string, conf: ProviderAndKeys): Observable<Geolocation> {

        const key = conf.keys['MAPS_CLIENT_API_KEY'];
        const keyParam = key ? ('&key='+encodeURIComponent(key)) : '';

        const googleSearch = (subscriber: Subscriber<Geolocation>) => {
            const geocoder = new window['google'].maps.Geocoder();
            geocoder.geocode({'address': location}, (results, status) => {
                if (status === 'OK') {
                    const latitude = "" + results[0].geometry.location.lat();
                    const longitude = "" + results[0].geometry.location.lng();
                    this.handleLatLong(latitude, longitude, subscriber);
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
        const apiKey = conf.keys['MAPS_HERE_API_KEY'];

        return new Observable<Geolocation>((subscriber: Subscriber<Geolocation>) => {
            this.http.get('https://geocoder.ls.hereapi.com/6.2/geocode.json', {params: {apiKey: apiKey, searchtext: location}}).subscribe((hereRes: any) => {
                const view = hereRes.Response.View;
                if (view.length > 0 && view[0].Result.length > 0 && view[0].Result[0].Location) {
                    const location = view[0].Result[0].Location;
                    const pos = location.DisplayPosition;
                    this.handleLatLong(pos.Latitude, pos.Longitude, subscriber);
                } else {
                    this.zone.runTask(() => subscriber.error());
                }
            });
        });
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

    uploadImageWithResize(file: File) : Observable<string> {
        return new Observable<string>((subscriber) => {
            let reader = new FileReader();
            reader.onload = (e) => {
                let imageBase64 = reader.result as string;
                let payload = {file : imageBase64.substring(imageBase64.indexOf('base64,') + 7), type : file.type, name : file.name};
                this.http.post<string>('/admin/api/file/upload?resizeImage=true', payload).subscribe(res => {
                    this.zone.runTask(() => {
                        subscriber.next(res);
                    });
                });
            };
            reader.readAsDataURL(file);
        });
    };


    getPaymentProxies(organizationName: string): Observable<PaymentProxy[]> {
        return this.organizationService.getOrganizationId(organizationName)
            .pipe(flatMap(orgId => this.http.get<PaymentProxy[]>('/admin/api/paymentProxies/' + orgId)));
    }
}