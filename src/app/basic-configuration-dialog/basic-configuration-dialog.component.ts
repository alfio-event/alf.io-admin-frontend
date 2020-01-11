import { Component, OnInit } from '@angular/core';
import { ConfigurationService, ConfigurationMap } from '../shared/configuration.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingCategory, ConfigurationKey, ConfigurationModification } from '../model/configuration';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-basic-configuration-dialog',
  templateUrl: './basic-configuration-dialog.component.html'
})
export class BasicConfigurationDialogComponent implements OnInit {

  basicConfiguration: FormGroup;
  allConf: ConfigurationMap;
  notCompleteAfterSave: boolean;

  constructor(
    private configurationService: ConfigurationService,
    private dialogRef: MatDialogRef<BasicConfigurationDialogComponent>,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.configurationService.loadAllSystemLevel().subscribe((allConf) => {
      this.allConf = allConf;
      this.basicConfiguration = this.fb.group({
        GENERAL: this.fb.group({
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
