import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email-log',
  templateUrl: './email-log.component.html'
})
export class EmailLogComponent implements OnInit {

  eventShortName: string;
  page = 0;
  searchTerm: string = null;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.eventShortName = this.route.parent.snapshot.params['eventShortName'];
    
    this.eventService.getEmailLog(this.eventShortName, this.page, this.searchTerm).subscribe(res => {
      console.log(res);
    });
  }

}
