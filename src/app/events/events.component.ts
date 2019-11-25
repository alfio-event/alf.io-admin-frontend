import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

}
