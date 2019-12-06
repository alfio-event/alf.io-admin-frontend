import { Component, OnInit } from '@angular/core';
import { ConfigurationService, ConfigurationMap } from '../shared/configuration.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Language } from '../model/language';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-basic-configuration-dialog',
  templateUrl: './basic-configuration-dialog.component.html',
  styleUrls: ['./basic-configuration-dialog.component.scss']
})
export class BasicConfigurationDialogComponent implements OnInit {

  basicConfiguration: FormGroup;
  allLanguages: Language[] = [];
  allConf: ConfigurationMap;

  constructor(private configurationService: ConfigurationService, fb: FormBuilder) {
    forkJoin(configurationService.getAllLanguages(), configurationService.loadAllSystemLevel()).subscribe(([languages, allConf]) => {
      this.allLanguages = languages;
      this.allConf = allConf;
      const currentLang = parseInt(allConf.GENERAL.SUPPORTED_LANGUAGES.value);
      let selectedLanguages: number[] = [];
      if (!isNaN(currentLang)) {
        selectedLanguages = configurationService.mapLanguagesConfigurationValueToLanguages(currentLang, languages).map(l => l.value);
      }

      this.basicConfiguration = fb.group({
        GENERAL: fb.group({
          SUPPORTED_LANGUAGES: [selectedLanguages],
          BASE_URL: allConf.GENERAL.BASE_URL.value,
        }),
        MAIL: this.configurationService.buildGroupFor(allConf.MAIL),
        MAP: this.configurationService.buildGroupFor(allConf.MAP)
      });
    });
  }

  ngOnInit() {
  }

}
