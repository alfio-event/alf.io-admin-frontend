import { Component, OnInit } from '@angular/core';
import { EventSupportService } from 'src/app/shared/event-support.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Currency } from 'src/app/model/currency';
import { Language } from 'src/app/model/language';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  createEventForm: FormGroup;

  timezones: string[] = [];
  currencies: Currency[] = [];
  languages: Language[] = [];
  selectedLanguages: Language[] = [];
  mapUrl: string;
  baseUrl: string;

  constructor(
    private eventSupportService: EventSupportService,
    private fb: FormBuilder) {

      this.createEventForm = fb.group({
        eventInfo: fb.group({
          displayName: null,
          location: null,
          timeZone: null,
          startDate: null,
          startTime: null,
          endDate: null,
          endTime: null,
          shortName: null,
          description: fb.group({})
        }),
        links: fb.group({
          websiteUrl: null,
          termsAndConditionsUrl: null,
          privacyPolicyUrl: null
        }),
        payment: fb.group({}),
        tickets: fb.group({})
      });

      eventSupportService.getTimeZones().subscribe(tzs => {
        this.timezones = tzs;
      });
      eventSupportService.getCurrencies().subscribe(cur => {
        this.currencies = cur;
      });
      eventSupportService.getSupportedLanguages().subscribe(langs => {
        this.languages = langs;
        this.addLanguage(langs[0]);
      });

      eventSupportService.getBaseUrl().subscribe(baseUrl => {
        this.baseUrl = baseUrl;
      });
    }

  ngOnInit() {
  }

  addLanguage(lang: Language) {
    this.selectedLanguages.push(lang);
    let fg = this.createEventForm.get('eventInfo.description') as FormGroup;
    fg.addControl(lang.locale, this.fb.control(null));
  }

  removeLanguage(lang: Language) {
    this.selectedLanguages.splice(this.selectedLanguages.indexOf(lang), 1);
    let fg = this.createEventForm.get('eventInfo.description') as FormGroup;
    fg.removeControl(lang.locale);
  }

  get otherLanguages(): Language[] {
    if (this.languages) {
      return this.languages.filter(l => this.selectedLanguages.indexOf(l) === -1);
    }
    return [];
  }

  updateLocation(location: string) {
    this.eventSupportService.clientGeolocate(location).subscribe(res => {
      if (res && res.timeZone) {
        this.createEventForm.get('eventInfo').get('timeZone').setValue(res.timeZone);
        this.mapUrl = res.mapUrl;
      }
    });
  }

  updateURL(eventName: string) {
    this.eventSupportService.generateEventShortName(eventName).subscribe(res => {
      this.createEventForm.get('eventInfo').get('shortName').setValue(res);
    })
  }
}
