import {CommonModule} from '@angular/common';
import {Component, Directive, Inject, Input, NgModule, OnInit} from "@angular/core";
import {DialogService} from "../service/dialog.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from '@angular/material/radio';
import {KeyObject} from "../pipe/object-pipe";
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-dialog-form',
  template: `
    <form [formGroup]="dialogForm">
      <ng-container *ngFor="let key of data | keys">
        <ng-container [ngSwitch]="data[key].inputType">
          <ng-template ngSwitchCase="text">
            <mat-form-field appearance="outline">
              <mat-label *ngIf="data[key].label">{{data[key].label}}</mat-label>
              <input matInput placeholder="{{key}}" formControlName="{{key}}">
            </mat-form-field>
          </ng-template>
          <ng-template ngSwitchCase="radio">
            <mat-radio-group
              aria-labelledby="example-radio-group-label"
              class="example-radio-group"
            >
              <mat-radio-button class="example-radio-button" *ngFor="let value of data[key].values" [value]="value">
                {{value}}
              </mat-radio-button>
            </mat-radio-group>
          </ng-template>
          <ng-template ngSwitchCase="checkbox">
            <mat-checkbox>

            </mat-checkbox>
          </ng-template>
        </ng-container>
      </ng-container>
    </form>
    <!--    <form [formGroup]="dialogForm">-->
    <!--      <mat-form-field appearance="outline">-->
    <!--        <input matInput placeholder="id" formControlName="id" [(ngModel)]="data.id">-->
    <!--      </mat-form-field>-->

    <!--      <mat-form-field appearance="outline">-->
    <!--        <input matInput placeholder="name" formControlName="name" [(ngModel)]="data.name">-->
    <!--      </mat-form-field>-->

    <!--      <div class="dialog-foot">-->
    <!--        <button mat-raised-button color="primary">Submit</button>-->
    <!--        <button mat-raised-button color="accent" >Close</button>-->
    <!--      </div>-->

    <!--    </form>-->
  `
})
export class DialogFormComponent implements OnInit {
  titles!: string[];
  feature!: string;

  data!: any;
  dialogForm!: FormGroup;
  formInit!: FormControl;

  constructor(
    private _dialogService: DialogService,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
  }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.data = this._dialogService.setForm().data;
    const {data} = this;
    const keys = Object.keys(data);

    if (keys.length < 1) {
      return;
    }

    this.formInit = new FormControl('');
    this.dialogForm = new FormGroup(
      keys.reduce((acc: any, key: any) => {
        acc[key] = this.formInit;
        return acc;
      }, {})
    );
  }

  close() {
    this._dialogRef.close();
  }
}


@NgModule({
  declarations: [DialogFormComponent, KeyObject],
  imports: [
    MatDialogModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    CommonModule,
    MatCheckboxModule
  ],
  exports: [
    DialogFormComponent,
    MatDialogModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    DialogFormComponent
  ]
})
export class DialogFormModule {
}
