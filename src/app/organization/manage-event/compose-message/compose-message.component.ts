import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Language } from 'src/app/model/language';
import { Observable } from 'rxjs';
import { EventOrganization, TicketCategory } from 'src/app/model/event-organization';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html'
})
export class ComposeMessageComponent implements OnInit {

  eventShortName: string;

  composeMessageForm: FormGroup;
  composeMessageFormArray: FormArray;
  languages: Language[] = [];

  ticketCategories: TicketCategory[] = [];
  

  constructor(private eventService: EventService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.composeMessageFormArray = this.fb.array([]);
    this.composeMessageForm = this.fb.group({
      categoryId: '',
      messages: this.composeMessageFormArray
    });

    this.eventShortName = this.route.parent.snapshot.params['eventShortName'];
    this.eventService.getEvent(this.eventShortName).subscribe(eventOrg => {
      this.ticketCategories = eventOrg.event.ticketCategories;
      this.languages = eventOrg.event.contentLanguages;
      this.languages.forEach((v, idx) => {
        this.composeMessageFormArray.insert(idx, this.fb.group({
          attachTicket: false,
          locale: v.locale,
          subject: null,
          text: null
        }));
      });
    });
  }

  sendMessage(): void {
    console.log(this.composeMessageForm.value);
  }

}
