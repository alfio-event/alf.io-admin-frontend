import { Component, OnInit } from '@angular/core';
import { ExtensionService } from 'src/app/shared/extension.service';

@Component({
  selector: 'app-extension-log',
  templateUrl: './extension-log.component.html'
})
export class ExtensionLogComponent implements OnInit {

  extensionLogs = [];
  count = 0;

  extensionLogsDisplayColumns = ['path', 'name', 'effectivePath', 'type', 'description', 'date']

  constructor(private extensionService: ExtensionService) { }

  ngOnInit() {
    this.extensionService.getLog(0).subscribe(paginated => {
      this.extensionLogs = paginated.left;
      this.count = paginated.right;
    });
  }

}
