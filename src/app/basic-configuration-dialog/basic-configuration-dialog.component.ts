import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../shared/configuration.service';
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

  constructor(private configurationService: ConfigurationService, fb: FormBuilder) {
    forkJoin(configurationService.getAllLanguages(), configurationService.loadAllSystemLevel()).subscribe(([languages, allConf]) => {
      this.allLanguages = languages;
      const currentLang = parseInt(allConf.GENERAL.SUPPORTED_LANGUAGES.value);
      let selectedLanguages: number[] = [];
      if (!isNaN(currentLang)) {
        selectedLanguages = configurationService.mapLanguagesConfigurationValueToLanguages(currentLang, languages).map(l => l.value);
      }

      this.basicConfiguration = fb.group({
        selectedLanguages: [selectedLanguages],
        baseUrl: allConf.GENERAL.BASE_URL.value,
        mail: fb.group({
          type: allConf.MAIL.MAILER_TYPE.value
        }),
        map: fb.group({
          provider: allConf.MAP.MAPS_PROVIDER.value
        })
      });
    });
  }

  ngOnInit() {
  }

}
