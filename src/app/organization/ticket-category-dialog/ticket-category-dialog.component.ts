import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Language } from 'src/app/model/language';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventSupportService } from 'src/app/shared/event-support.service';
import { deleteIcon } from 'src/app/icons';

@Component({
  selector: 'app-ticket-category-dialog',
  templateUrl: './ticket-category-dialog.component.html',
  styleUrls: ['./ticket-category-dialog.component.scss']
})
export class TicketCategoryDialogComponent implements OnInit {

  selectedLanguages: Language[];
  ticketCategoryForm: FormGroup;
  times: string[];
  freeOfCharge: boolean;
  currency: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TicketCategoryDialogData,
    private dialogRef: MatDialogRef<TicketCategoryDialogComponent>,
    fb: FormBuilder,
    eventSupportService: EventSupportService
    ) {
      this.selectedLanguages = data.selectedLanguages;
      let originalCategory = data.originalCategory;
      this.freeOfCharge = data.freeOfCharge;
      this.currency = data.currency;
      this.ticketCategoryForm = fb.group({
        name: null,
        tokenGenerationRequested: false,
        bounded: false,
        price: data.regularPrice,
        maxTickets: null,
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null
      });
      if (originalCategory) {
        this.ticketCategoryForm.patchValue(originalCategory);
      }
      this.times = eventSupportService.getTimes();
    }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.ticketCategoryForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}

export class TicketCategoryDialogData {
  constructor(
    public selectedLanguages: Language[],
    public originalCategory: any,
    public freeOfCharge: boolean,
    public currency: string,
    public regularPrice: number) {
    }
}
