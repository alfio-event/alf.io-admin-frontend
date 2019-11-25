import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { EventStatistic } from '../model/event-statistic';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventStatus } from '../model/event-status';
import { forkJoin, Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  searchForm: FormGroup;
  allFetched: EventStatistic[];
  events: EventStatistic[];

  private searchTerm: Subject<string> = new Subject();


  constructor(private eventService: EventService, private formBuilder: FormBuilder) {

    this.searchTerm.pipe(debounceTime(500)).subscribe(term => {
      this.filterFetched();
    });

    this.searchForm = this.formBuilder.group({
      'search': this.formBuilder.control(null),
      'status': this.formBuilder.control([EventStatus.PUBLIC, EventStatus.DRAFT])
    });
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {

    const formValue = this.searchForm.value;
    const searches = [];

    if (formValue.status.includes(EventStatus.PUBLIC) || formValue.status.includes(EventStatus.DRAFT)) {
      searches.push(this.eventService.getActiveEvents());
    }

    if (formValue.status.includes(EventStatus.PAST)) {
      searches.push(this.eventService.getExpiredEvents().pipe(map(r => {r.forEach(e => e.status = EventStatus.PAST); return r;})));
    }

    forkJoin(searches).subscribe(res => {
      const found: EventStatistic[] = res.length == 1 ? res[0] : [...res[0], ...res[1]];
      this.allFetched = found;
      this.filterFetched();
    });
  }

  handleSearch() {
    this.searchTerm.next(this.searchForm.value.search);
  }

  private filterFetched() {
    const formValue = this.searchForm.value;
    if (this.allFetched) {
      this.events = this.allFetched.filter(e => (formValue.search == null || e.displayName.indexOf(formValue.search) >= 0) && formValue.status.includes(e.status));
    }
  }

}
