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
  mapUrl: string;

  constructor(
    private eventSupportService: EventSupportService,
    private fb: FormBuilder) {

      this.createEventForm = fb.group({
        eventInfo: fb.group({
          displayName: null,
          location: null,
          timeZone: null
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
      });
    }

  ngOnInit() {
  }

  updateLocation(location: string) {
    this.eventSupportService.clientGeolocate(location).subscribe(res => {
      if (res && res.timeZone) {
        this.createEventForm.get('eventInfo').get('timeZone').setValue(res.timeZone);
        this.mapUrl = res.mapUrl;
      }
    });
  }
}
