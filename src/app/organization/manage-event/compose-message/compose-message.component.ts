import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html'
})
export class ComposeMessageComponent implements OnInit {

  eventShortName: string;

  composeMessageForm: FormGroup;

  constructor(private eventService: EventService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.composeMessageForm = this.fb.group({});

    this.eventShortName = this.route.parent.snapshot.params['eventShortName'];
    this.eventService.getSelectedLanguages(this.eventShortName).subscribe(res => {
      console.log(res);
    });
  }

  sendMessage(): void {
  }

}
