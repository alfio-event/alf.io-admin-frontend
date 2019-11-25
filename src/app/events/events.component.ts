import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { EventStatistic } from '../model/event-statistic';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {


  events: EventStatistic[];

  constructor(private eventService: EventService) {
    this.loadEvents();
  }

  private loadEvents() {
    this.eventService.getActiveEvents().subscribe(events => {
      this.events = events;
    })
  }

  ngOnInit() {
  }

}
