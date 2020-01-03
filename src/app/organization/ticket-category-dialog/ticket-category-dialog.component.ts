import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-ticket-category-dialog',
  templateUrl: './ticket-category-dialog.component.html',
  styleUrls: ['./ticket-category-dialog.component.scss']
})
export class TicketCategoryDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<TicketCategoryDialogComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

}
