import { Component, OnInit, ViewChild } from '@angular/core';
import { ExtensionService, fromPathToOrgAndEventId } from 'src/app/shared/extension.service';
import { MatPaginator } from '@angular/material/paginator';
import { ExtensionLog } from 'src/app/model/extension-log';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { OrganizationService } from 'src/app/shared/organization.service';
import { EventService } from 'src/app/shared/event.service';

@Component({
  selector: 'app-extension-log',
  templateUrl: './extension-log.component.html'
})
export class ExtensionLogComponent implements OnInit {

  extensionLogs: ExtensionLogDataSource;
  orgIdMapping: {[key: number]: string} = {};


  extensionLogsDisplayColumns = ['path', 'name', 'effectivePath', 'type', 'description', 'date'];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(
    private eventService: EventService,
    private extensionService: ExtensionService,
    private organizationService: OrganizationService) { }

  ngOnInit() {
    this.extensionLogs = new ExtensionLogDataSource(this.extensionService, this.eventService);
    this.loadPage(0);
    this.organizationService.getOrganizations().subscribe(orgs => {
    let orgIdMapping: {[key: number]: string} = {};
      orgs.forEach(o => {
        orgIdMapping[o.id] = o.name;
      });
      this.orgIdMapping = orgIdMapping;
    });
  }

  loadPage(pageIndex) {
    this.extensionLogs.loadExtensionLog(pageIndex);
  }
}

//based on https://blog.angular-university.io/angular-material-data-table/
class ExtensionLogDataSource implements DataSource<ExtensionLog> {

  count: number = 0;
  eventIdMapping: {[key: number]: string} = {};

  private extensionLogSubject = new BehaviorSubject<ExtensionLog[]>([]);

  constructor(private extensionService: ExtensionService, private eventService: EventService) {}

  connect(collectionViewer: CollectionViewer): Observable<ExtensionLog[]> {
    return this.extensionLogSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.extensionLogSubject.complete();
  }

  loadExtensionLog(pageIndex: number = 0) {
    return this.extensionService.getLog(pageIndex).subscribe(log => {
      this.count = log.right; //total size
      this.extensionLogSubject.next(log.left);

      let eventIds = new Set();
      log.left.forEach(l => {
        const oeid = fromPathToOrgAndEventId(l.path);
        if (oeid.eventId !== undefined && this.eventIdMapping[oeid.eventId] === undefined) {
          eventIds.add(oeid.eventId);
        }
      });
      if(eventIds.size > 0) {
        this.eventService.getEventNamesByIds(Array.from(eventIds) as number[]).subscribe(res => {
          this.eventIdMapping = {...this.eventIdMapping, ...res};
        });
      }
      return log;
    });
  }
}
