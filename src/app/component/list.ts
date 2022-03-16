import {ChangeDetectionStrategy, Component, Input, NgModule, OnInit, ViewEncapsulation} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CommonModule} from "@angular/common";
import {DialogFormModule} from "./dialog-form";
import {DialogService} from "../service/dialog.service";
import {DataType} from "../input-form/data1";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-list',
  template: `
    <ng-template #_create>
      <button (click)="create()">Create</button>
    </ng-template>

    <ng-template #_update let-value="value">
      <button (click)="update(value)">Update</button>
    </ng-template>

    <ng-template #empty>
      데이터가 없습니다.
    </ng-template>

    <ng-container *ngIf="receivedData$ | async; else empty;">
      <table mat-table [dataSource]="data" class="mat-elevation-z8">
        <ng-container [matColumnDef]="column" *ngFor="let column of columns">
          <th mat-header-cell *matHeaderCellDef [innerHTML]="column"></th>
          <td mat-cell *matCellDef="let element">{{element[column]}}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns;"></tr>
      </table>
<!--      <ng-container *ngFor="let _data of data;">-->
<!--        <div [innerHTML]="_data['id'] | json"></div>-->
<!--        <ng-container *ngTemplateOutlet="_update; context: {value: _data}"></ng-container>-->
<!--      </ng-container>-->
    </ng-container>

    <ng-container *ngTemplateOutlet="_create"></ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input() receivedData$!: BehaviorSubject<any>;
  @Input() columns!: string[];
  data: any[] = [];

  constructor(
    private _dialog: DialogService,
    private _inputForm: DataType
  ) {
    console.log(_inputForm);
  }

  ngOnInit() {
    this.receivedData$.subscribe(data => {
      this.data = data;
    });
  }

  create() {
    this._dialog.create({form: this._inputForm});
  }

  update(data: object) {
    this._dialog.update({form: this._inputForm, target: data});
  }
}


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    DialogFormModule,
    MatListModule,
    MatTableModule
  ],
  exports: [ListComponent],
  providers: [
    DialogService,
    DataType
  ]
})
export class ListModule {
}
