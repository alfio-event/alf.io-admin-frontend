import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OrganizationService } from 'src/app/shared/organization.service';

@Component({
  selector: 'app-new-organization-dialog',
  templateUrl: './new-organization-dialog.component.html',
  styleUrls: ['./new-organization-dialog.component.scss']
})
export class NewOrganizationDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<NewOrganizationDialogComponent>,
    private organizationService: OrganizationService
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {

  }

}
