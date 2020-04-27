import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { EmailLog } from 'src/app/model/email';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';

@Component({
  selector: 'app-email-log',
  templateUrl: './email-log.component.html'
})
export class EmailLogComponent implements OnInit {

  eventShortName: string;
  page = 0;
  searchTerm: string = null;
  emailLogDataSource: EmailLogDataSource;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.eventShortName = this.route.parent.snapshot.params['eventShortName'];
    this.emailLogDataSource = new EmailLogDataSource(this.eventService, this.eventShortName);
    this.emailLogDataSource.loadEmailLog(this.page, this.searchTerm);
  }
}

class EmailLogDataSource implements DataSource<EmailLog> {
  count: number = 0;
  private emailLogSubject = new BehaviorSubject<EmailLog[]>([]);

  constructor(private eventService: EventService, private eventShortName: string) {
  }

  connect(collectionViewer: CollectionViewer): Observable<EmailLog[]> {
    return this.emailLogSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.emailLogSubject.complete();
  }

  loadEmailLog(pageIndex: number = 0, searchTerm: string = null)  {
    this.eventService.getEmailLog(this.eventShortName, pageIndex, searchTerm).subscribe(res => {
      this.count = res.right;
      this.emailLogSubject.next(res.left);
    });
  }
}
