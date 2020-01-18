import { Component, OnInit } from '@angular/core';
import { ExtensionService } from 'src/app/shared/extension.service';
import { ExtensionSupport } from 'src/app/model/extension';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html'
})
export class ExtensionComponent implements OnInit {

  extensions: ExtensionSupport[] = [];

  constructor(private extensionService: ExtensionService) {
    this.loadExtensions();
  }

  ngOnInit() {
  }

  private loadExtensions() {
    this.extensionService.getExtensions().subscribe(extensions => {
      this.extensions = extensions;
    });
  }

}
