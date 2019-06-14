import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Alarm } from './alarm.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { delay } from 'q';

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.less']
})
export default class AlarmsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'ringing', 'active', 'date', 'edit', 'delete'];
  dataSource: MatTableDataSource<Alarm>;

  newAlarm: Alarm;
  alarms: Alarm[] = [];
  isLoading: boolean = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.alarms);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pushNewAlarm(newAlarm: Alarm){
    this.alarms.push(newAlarm);
    this.dataSource = new MatTableDataSource(this.alarms);
  }

  removeAlarm(id: number){
    const index = this.alarms.findIndex((f:Alarm) => f.id === id);
    if(~index)  this.alarms.splice(index,1);
    this.dataSource = new MatTableDataSource(this.alarms);
  }

  modifyAlarm(alarm: Alarm){
    const index = this.alarms.findIndex((f:Alarm) => f.id === alarm.id);
    if(~index) this.alarms[index] = alarm;
    this.dataSource = new MatTableDataSource(this.alarms);
  }

  openAlarmModal(type: string, selected: Alarm){
    let alarm = selected ? Object.assign({}, selected) : {id: this.getRandomInt(1, 101), ringing: false, active: false, date: undefined};
    const dialogRef = this.dialog.open(AlarmDialog, {
      width: '500px',
      data: {type: type, alarm: alarm},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.isLoading = true;
        if(result.type == 'new') {
          this.pushNewAlarm(result.alarm);
        } else if(result.type == 'edit') {
          this.modifyAlarm(result.alarm)
        } else {
          this.removeAlarm(result.alarm.id);
        }
        setTimeout(() => this.isLoading = false, 3000);
      }
    });
  }

  getRandomInt(min: number, max: number){
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

@Component({
  selector: 'new-alarm-dialog',
  templateUrl: 'new-alarm-dialog.html',
})
export class AlarmDialog {

  date: FormControl;

  constructor(public dialogRef: MatDialogRef<AlarmDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.date = new FormControl('', [Validators.required]);
    if(this.data.alarm.date != undefined){
      this.date.setValue(this.data.alarm.date);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  updateDate(event): void {
    const value = event.currentTarget.value;
    this.date.setValue(value);
    this.data.alarm.date = value;
  }

}
