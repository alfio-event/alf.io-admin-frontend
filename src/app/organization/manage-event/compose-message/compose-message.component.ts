import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Language } from 'src/app/model/language';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html'
})
export class ComposeMessageComponent implements OnInit {

  eventShortName: string;

  composeMessageForm: FormArray
  languages: Language[] = [];

  constructor(private eventService: EventService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.composeMessageForm = this.fb.array([]);

    this.eventShortName = this.route.parent.snapshot.params['eventShortName'];
    this.eventService.getSelectedLanguages(this.eventShortName).subscribe(res => {
      this.languages = res;
      res.forEach((v, idx) => {
        this.composeMessageForm.insert(idx, this.fb.group({
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
