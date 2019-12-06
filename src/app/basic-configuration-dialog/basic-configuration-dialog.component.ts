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

      console.log(allConf);

      this.basicConfiguration = fb.group({
        GENERAL: fb.group({
          SUPPORTED_LANGUAGES: [selectedLanguages],
          BASE_URL: allConf.GENERAL.BASE_URL.value,
        }),
        MAIL: fb.group({
          MAILER_TYPE: allConf.MAIL.MAILER_TYPE.value
        }),
        MAP: fb.group({
          MAPS_PROVIDER: allConf.MAP.MAPS_PROVIDER.value,
          MAPS_CLIENT_API_KEY: allConf.MAP.MAPS_CLIENT_API_KEY.value,
          MAPS_HERE_APP_ID: allConf.MAP.MAPS_HERE_APP_ID.value,
          MAPS_HERE_APP_CODE: allConf.MAP.MAPS_HERE_APP_CODE.value
        })
      });
    });
  }

  ngOnInit() {
  }

}
