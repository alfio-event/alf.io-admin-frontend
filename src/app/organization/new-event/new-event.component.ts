import { Component, OnInit } from '@angular/core';
import { EventSupportService } from 'src/app/shared/event-support.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Currency } from 'src/app/model/currency';
import { Language } from 'src/app/model/language';
import { Observable } from 'rxjs';
import { startWith, map, flatMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PaymentProxy, PAYMENT_PROXY_DESCRIPTION } from 'src/app/model/payment-proxy';
import { MatDialog } from '@angular/material';
import { TicketCategoryDialogComponent } from '../ticket-category-dialog/ticket-category-dialog.component';
import { EventService } from 'src/app/shared/event.service';
import { OrganizationService } from 'src/app/shared/organization.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  createEventForm: FormGroup;

  orgName: string;

  timezones: string[] = [];
  currencies: Currency[] = [];
  languages: Language[] = [];
  selectedLanguages: Language[] = [];
  mapUrl: string;
  baseUrl: string;
  activePaymentProxies: PaymentProxy[] = [];
  ticketCategories: any[] = [];
  times: string[];

  filteredCurrencies: Observable<Currency[]>;

  constructor(
    private route: ActivatedRoute,
    private eventSupportService: EventSupportService,
    private eventService: EventService,
    private organizationService: OrganizationService,
    private fb: FormBuilder,
    private dialog: MatDialog) {

      this.createEventForm = fb.group({
        eventInfo: fb.group({
          displayName: null,
          location: null,
          geolocation: null,
          timeZone: null,
          startDate: null,
          startTime: null,
          endDate: null,
          endTime: null,
          shortName: null,
          description: fb.group({}),
          fileBlobId: null
        }),
        links: fb.group({
          websiteUrl: null,
          termsAndConditionsUrl: null,
          privacyPolicyUrl: null
        }),
        payment: fb.group({
          freeOfCharge: null,
          regularPrice: null,
          currency: null,
          vatPercentage: null,
          vatIncluded: null,
          paymentProxies: fb.group({})
        }),
        tickets: fb.group({
          availableSeats: null
        })
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

      this.orgName = this.route.snapshot.paramMap.get('org');

      const selectedPaymentProxiesFormGroup: FormGroup = this.createEventForm.get('payment.paymentProxies') as FormGroup;

      eventSupportService.getPaymentProxies(this.orgName).subscribe(res => {
        this.activePaymentProxies = res.filter(p => p.active);
        this.activePaymentProxies.forEach(v => {
          selectedPaymentProxiesFormGroup.addControl(v.paymentProxy, this.fb.control(null));
          v.description = PAYMENT_PROXY_DESCRIPTION[v.paymentProxy];
        });
      });

      this.times = eventSupportService.getTimes();
    }

  ngOnInit() {
    this.filteredCurrencies = this.createEventForm.get('payment.currency').valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterCurrencies(value))
      );
  }

  private filterCurrencies(value: string): Currency[] {
    value = value.toLowerCase();
    return this.currencies.filter(c => {
      return c.name.toLowerCase().indexOf(value) >= 0 ||
             c.code.toLowerCase().indexOf(value) >= 0 ||
             c.symbol.indexOf(value) >= 0;
    });
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

  getSelectedLanguagesValue() {
    return this.selectedLanguages.map(l => l.value).reduce((previous, current) => previous | current)
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
        this.createEventForm.get('eventInfo').get('geolocation').patchValue(res);
        this.mapUrl = res.mapUrl;
      }
    });
  }

  updateURL(eventName: string) {
    this.eventSupportService.generateEventShortName(eventName).subscribe(res => {
      this.createEventForm.get('eventInfo').get('shortName').setValue(res);
    })
  }

  handleSelectedLogoFile(files: FileList) {
    if (files.length <= 0) {
      alert('Your image not uploaded correctly.Please upload the image again');
    } else if (!((files[0].type === 'image/png') || (files[0].type === 'image/jpeg'))) {
      alert('only png or jpeg files are accepted');
    } else if (files[0].size > (1024 * 200)) {
      alert('Image size exceeds the allowable limit 200KB');
    } else {
      this.eventSupportService.uploadImageWithResize(files[0]).subscribe(fileId => {
        this.createEventForm.get('eventInfo.fileBlobId').setValue(fileId);
      });
    }
  }

  newCategory() {
    this.dialog.open(TicketCategoryDialogComponent, { width: '600px', data: { languages: this.selectedLanguages } }).afterClosed().subscribe(res => {
      if (res) {
        this.ticketCategories.push(res);
      }
    });
  }

  removeCategory(category) {
    this.ticketCategories.splice(this.ticketCategories.indexOf(category), 1)
  }

  editCategory(category) {
    this.dialog.open(TicketCategoryDialogComponent, {width: '600px', data: {languages: this.selectedLanguages, category: category}}).afterClosed().subscribe(res => {
      if (res) {
        this.ticketCategories[this.ticketCategories.indexOf(category)] = res;
      }
    });
  }

  createEvent() {
    let eventFormValue = this.createEventForm.value;
    let eventInfo = eventFormValue.eventInfo;
    let eventLinks = eventFormValue.links;
    let tickets = eventFormValue.tickets;

    let geolocation = eventInfo.geolocation;

    this.organizationService.getOrganizationId(this.orgName).pipe(map(orgId => {
      return {
        type: 'INTERNAL',
        freeOfCharge: eventFormValue.payment.freeOfCharge,
        begin: this.eventSupportService.fromDateAndTime(eventInfo.startDate, eventInfo.startTime),
        end: this.eventSupportService.fromDateAndTime(eventInfo.endDate, eventInfo.endTime),
        ticketCategories: this.buildTicketCategory(),
        additionalServices: [],
        locales: this.getSelectedLanguagesValue(),
        organizationId: orgId,
        displayName: eventInfo.displayName,
        shortName: eventInfo.shortName,
        location: eventInfo.location,
        geolocation: geolocation,
        description: eventInfo.description,
        websiteUrl: eventLinks.websiteUrl,
        termsAndConditionsUrl: eventLinks.termsAndConditionsUrl,
        fileBlobId: eventInfo.fileBlobId,
        availableSeats: tickets.availableSeats,
        zoneId: eventInfo.timeZone,
        latitude: geolocation ? geolocation.latitude : null,
        longitude: geolocation ? geolocation.longitude : null
      }
    }), flatMap(r => {
      return this.eventService.createEvent(r)
    })).subscribe(res => {
      console.log(res);
    });
  }

  buildTicketCategory() {
    return this.ticketCategories.map((tc, idx) => {
      return {
        inception: this.eventSupportService.fromDateAndTime(tc.startDate, tc.startTime),
        expiration: this.eventSupportService.fromDateAndTime(tc.endDate, tc.endTime),
        tokenGenerationRequested: tc.tokenGenerationRequested,
        sticky: true,
        bounded: tc.bounded,
        name: tc.name,
        ordinal: idx
      };
    });
  }
}
