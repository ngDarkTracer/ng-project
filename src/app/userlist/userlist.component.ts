import {Component, Inject, OnInit} from '@angular/core';
import { UserdataService} from "../services/userdata.service";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  users: any = [];

  constructor(private userdata: UserdataService, public dialog: MatDialog) {
    this.users = this.userdata.users;
  }

  openEditDialog(user: any) {
    this.dialog.open(EditDialog, {
      data: { id: user.id, name: user.name, surname: user.surname, email: user.email },
    });
  }

  openDeleteDialog(id: number) {
    this.dialog.open(DeleteDialog, {
      data: { id: id },
    });
  }

  ngOnInit() {

  }

  delete(id: number) {
    this.userdata.deleteUser(id);
  }

  edit(id: number) {
    this.userdata.deleteUser(id)
  }

}

@Component({
  selector: 'edit-dialog',
  template:
    `<div style="margin: 20px">
    <form class="form-style" (ngSubmit)="onSubmit()" [formGroup]="dataForm">
      <mat-form-field class="full-width">
        <mat-label>Name</mat-label>
        <input type="text" matInput formControlName="name" placeholder="John">
        <mat-error>Name is <strong>required</strong></mat-error>
      </mat-form-field>
      <mat-form-field class="full-width">
        <mat-label>surname</mat-label>
        <input type="text" matInput formControlName="surname" placeholder="Doe">
        <mat-error>Surname is <strong>required</strong></mat-error>
      </mat-form-field>
      <mat-form-field class="full-width">
        <mat-label>Email</mat-label>
        <input type="email" matInput formControlName="email" placeholder="John@Doe.com">
        <mat-error *ngIf="dataForm.get('email')?.hasError('email') && !dataForm.get('email')?.hasError('required')">The email address is invalid</mat-error>
        <mat-error *ngIf="dataForm.get('email')?.hasError('required')">Email adress is <strong>required</strong></mat-error>
      </mat-form-field>
      <button type="submit" mat-raised-button color="accent" [disabled]="dataForm.invalid">Save</button>
    </form>
  </div>`,
  styleUrls: ['../form/form.component.scss']
})
export class EditDialog {

  constructor(public dialogRef: MatDialogRef<EditDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private userdata: UserdataService) {
  }

  dataForm = this.formBuilder.group({
    name: [this.data.name, Validators.required],
    surname: [this.data.surname, Validators.required],
    email: [this.data.email, [Validators.required, Validators.email]]
  })

  onSubmit() {
    const userInfo = {
      id: this.data.id,
      name: this.dataForm.get('name')?.value,
      surname: this.dataForm.get('surname')?.value,
      email: this.dataForm.get('email')?.value
    }
    this.userdata.editUser(userInfo)
    this.dialogRef.close();
    this.dataForm.reset();
  }
}

@Component({
  selector: 'delete-dialog',
  template:
    `<div style="margin: 20px">
      <p>Are you sure thant you want to delete this record ?</p><br>
      <button mat-button color="warn" style="margin-right: 5px;" (click)="delete(data.id)">Yes</button>
      <button mat-button color="primary" (click)="this.dialogRef.close()">No</button>
    </div>`
})
export class DeleteDialog {
  constructor(public dialogRef: MatDialogRef<EditDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userdata: UserdataService) {
  }

  delete(id: number) {
    this.userdata.deleteUser(id)
    this.dialogRef.close();
  }
}
