import { Component, OnInit, ViewChild } from '@angular/core';
import { ExtensionService } from 'src/app/shared/extension.service';
import { MatPaginator } from '@angular/material';
import { ExtensionLog } from 'src/app/model/extension-log';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-extension-log',
  templateUrl: './extension-log.component.html'
})
export class ExtensionLogComponent implements OnInit {

  extensionLogs: ExtensionLogDataSource;
  count = 0;

  extensionLogsDisplayColumns = ['path', 'name', 'effectivePath', 'type', 'description', 'date'];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(private extensionService: ExtensionService) { }

  ngOnInit() {
    this.extensionLogs = new ExtensionLogDataSource(this.extensionService, this.paginator);
    this.extensionLogs.loadExtensionLog(0)
  }

  loadPage() {
    this.extensionLogs.loadExtensionLog(this.paginator.pageIndex);
  }
}

//based on https://blog.angular-university.io/angular-material-data-table/
class ExtensionLogDataSource implements DataSource<ExtensionLog> {

  private extensionLogSubject = new BehaviorSubject<ExtensionLog[]>([]);

  constructor(private extensionService: ExtensionService, private paginator: MatPaginator) {}

  connect(collectionViewer: CollectionViewer): Observable<ExtensionLog[]> {
    return this.extensionLogSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.extensionLogSubject.complete();
  }

  loadExtensionLog(pageIndex: number = 0) {
    this.extensionService.getLog(pageIndex).subscribe(log => {
      this.paginator.length = log.right; //total size
      this.extensionLogSubject.next(log.left)
    });
  }
}
