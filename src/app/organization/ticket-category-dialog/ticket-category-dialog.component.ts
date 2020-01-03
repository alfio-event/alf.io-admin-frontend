import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Language } from 'src/app/model/language';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ticket-category-dialog',
  templateUrl: './ticket-category-dialog.component.html',
  styleUrls: ['./ticket-category-dialog.component.scss']
})
export class TicketCategoryDialogComponent implements OnInit {

  selectedLanguages: Language[];
  ticketCategoryForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TicketCategoryDialogComponent>,
    fb: FormBuilder
    ) {
      this.selectedLanguages = data.selectedLanguages;
      this.ticketCategoryForm = fb.group({
        name: null,
        tokenGenerationRequested: false,
        bounded: false,
        maxTickets: null
      });
    }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

}
