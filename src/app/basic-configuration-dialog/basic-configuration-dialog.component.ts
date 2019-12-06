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
        selectedLanguages: [selectedLanguages],
        baseUrl: allConf.GENERAL.BASE_URL.value,
        mail: fb.group({
          type: allConf.MAIL.MAILER_TYPE.value
        }),
        map: fb.group({
          provider: allConf.MAP.MAPS_PROVIDER.value,
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
