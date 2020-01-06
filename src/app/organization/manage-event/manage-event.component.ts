import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent implements OnInit {

  event: any;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    let eventShortName = this.route.snapshot.params['eventShortName'];
    this.eventService.getEvent(eventShortName).subscribe(res => {
      this.event = res;
    });
  }

}
