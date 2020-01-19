import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExtensionSupport } from 'src/app/model/extension';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExtensionService } from 'src/app/shared/extension.service';

@Component({
  selector: 'app-new-edit-extension-dialog',
  templateUrl: './new-edit-extension-dialog.component.html'
})
export class NewEditExtensionDialogComponent implements OnInit {


  extensionForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public extensionToEdit: ExtensionSupport,
    private dialogRef: MatDialogRef<NewEditExtensionDialogComponent>,
    private fb: FormBuilder,
    private extensionService: ExtensionService
    ) {}

  ngOnInit() {
    this.extensionForm = this.fb.group({
      name: null,
      enabled: true,
      script: null
    });

    if (!this.extensionToEdit) {
      this.extensionService.getSample().subscribe(res => {
        this.extensionForm.patchValue({script: res.script});
      });
    } else {
      this.extensionForm.patchValue({
        name: this.extensionToEdit.name,
        enabled: this.extensionToEdit.enabled,
        script: this.extensionToEdit.script
      })
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    this.dialogRef.close();
  }

  update() {
    this.dialogRef.close();
  }
}
