import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NewEditGroupDialogComponent } from './new-edit-group-dialog/new-edit-group-dialog.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  newGroup() {
    this.dialog.open(NewEditGroupDialogComponent, {width: '600px'}).afterClosed().subscribe(res => {
      if (res) {

      }
    });
  }

}
