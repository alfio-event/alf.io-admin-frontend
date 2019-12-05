import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../shared/configuration.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-configuration-dialog',
  templateUrl: './basic-configuration-dialog.component.html',
  styleUrls: ['./basic-configuration-dialog.component.scss']
})
export class BasicConfigurationDialogComponent implements OnInit {

  basicConfiguration: FormGroup;

  constructor(
    private configurationService: ConfigurationService,
    fb: FormBuilder) {


    configurationService.getAllLanguages().subscribe(languages => {
      console.log(languages);
    });

    configurationService.loadAllSystemLevel().subscribe(allConf => {
      console.log(allConf);
    });

    this.basicConfiguration = fb.group({
      selectedLanguages: [],
      baseUrl: null
    });
  }

  ngOnInit() {
  }

}
