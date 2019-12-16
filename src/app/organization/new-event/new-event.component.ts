import { Component, OnInit } from '@angular/core';
import { EventSupportService } from 'src/app/shared/event-support.service';
import { EventService } from 'src/app/shared/event.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Currency } from 'src/app/model/currency';
import { Language } from 'src/app/model/language';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  private createEventForm: FormGroup;

  timezones: string[] = [];
  currencies: Currency[] = [];
  languages: Language[] = [];

  constructor(
    private eventService: EventService,
    private eventSupportService: EventSupportService,
    private fb: FormBuilder) {

      this.createEventForm = fb.group({
        eventInfo: fb.group({
          displayName: null
        }),
        links: fb.group({}),
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

}
