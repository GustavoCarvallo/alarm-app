import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

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
