import { Component, OnInit } from '@angular/core';
import { EventSupportService } from 'src/app/shared/event-support.service';
import { EventService } from 'src/app/shared/event.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  constructor(
    private eventService: EventService,
    private eventSupportService: EventSupportService) { }

  ngOnInit() {
  }

}
