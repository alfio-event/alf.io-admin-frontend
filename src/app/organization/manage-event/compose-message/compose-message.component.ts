import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html'
})
export class ComposeMessageComponent implements OnInit {

  eventShortName: string;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventShortName = this.route.parent.snapshot.params['eventShortName'];
    this.eventService.getSelectedLanguages(this.eventShortName).subscribe(res => {
      console.log(res);
    });
  }

}
