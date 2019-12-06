import { Component, OnInit } from '@angular/core';
import { ConfigurationService, ConfigurationMap } from '../shared/configuration.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Language } from '../model/language';
import { forkJoin } from 'rxjs';
import { SettingCategory, ConfigurationKey, ConfigurationModification } from '../model/configuration';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-basic-configuration-dialog',
  templateUrl: './basic-configuration-dialog.component.html',
  styleUrls: ['./basic-configuration-dialog.component.scss']
})
export class BasicConfigurationDialogComponent implements OnInit {

  basicConfiguration: FormGroup;
  allLanguages: Language[] = [];
  allConf: ConfigurationMap;
  notCompleteAfterSave: boolean;

  constructor(
    private configurationService: ConfigurationService,
    private dialogRef: MatDialogRef<BasicConfigurationDialogComponent>,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    forkJoin(this.configurationService.getAllLanguages(), this.configurationService.loadAllSystemLevel()).subscribe(([languages, allConf]) => {
      this.allLanguages = languages;
      this.allConf = allConf;
      const currentLang = parseInt(allConf.GENERAL.SUPPORTED_LANGUAGES.value);
      let selectedLanguages: number[] = [];
      if (!isNaN(currentLang)) {
        selectedLanguages = this.configurationService.mapLanguagesConfigurationValueToLanguages(currentLang, languages).map(l => l.value);
      }

      this.basicConfiguration = this.fb.group({
        GENERAL: this.fb.group({
          SUPPORTED_LANGUAGES: [selectedLanguages],
          BASE_URL: allConf.GENERAL.BASE_URL.value,
        }),
        MAIL: this.configurationService.buildGroupFor(allConf.MAIL),
        MAP: this.configurationService.buildGroupFor(allConf.MAP)
      });
    });
  }

  saveConfiguration() {
    let formValue = this.basicConfiguration.value;
    var toSave: {[key in SettingCategory]?: ConfigurationModification[]} = {};
    Object.keys(formValue).forEach((settingCategory: SettingCategory) => {
      Object.keys(formValue[settingCategory]).forEach((key: ConfigurationKey) => {
        if (!toSave[settingCategory]) {
          toSave[settingCategory] = [];
        }
        let value = formValue[settingCategory][key];
        if (key == 'SUPPORTED_LANGUAGES') { //special casing for language
          value = this.configurationService.fromLanguagesToSingleValue(value);
        }
        if (formValue[settingCategory][key] !== null) {
          toSave[settingCategory].push({id: this.allConf[settingCategory][key].id, key: key, value: value});
        }
      });
    });
    this.configurationService.updateSystemBulk(toSave).subscribe(res => {
      this.configurationService.isBasicConfigurationNeeded().subscribe(stillNeeded => {
        if (!stillNeeded) {
          this.dialogRef.close();
        } else {
          this.notCompleteAfterSave = true;
        }
      })
    })
  }
}
