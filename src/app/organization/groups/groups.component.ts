import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NewEditGroupDialogComponent } from './new-edit-group-dialog/new-edit-group-dialog.component';
import { GroupService } from 'src/app/shared/group.service';
import { Group } from 'src/app/model/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private groupService: GroupService) { }

  ngOnInit() {
    this.loadGroups();
  }

  private loadGroups() {
    this.groupService.findAllGroupsFor(this.route.snapshot.paramMap.get('org')).subscribe(g => {
      this.groups = g;
    });
  }

  newGroup() {
    this.dialog.open(NewEditGroupDialogComponent, {width: '600px'}).afterClosed().subscribe(res => {
      if (res) {

      }
    });
  }

}
