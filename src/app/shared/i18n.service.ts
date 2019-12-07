import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const translationCache: { [key: string]: Observable<any> } = {};


@Injectable({ providedIn: 'root' })
export class CustomLoader implements TranslateLoader {

  constructor(private http: HttpClient) {
  }

  getTranslation(lang: string): Observable<any> {
    if (!translationCache[lang]) {
      translationCache[lang] = this.http.get(`/api/v2/admin/i18n/bundle/${lang}`).pipe(shareReplay(1));
    }
    return translationCache[lang];
  }
}