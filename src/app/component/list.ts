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

    <ng-template #loading>
      데이터를 로딩중입니다.
    </ng-template>

    <ng-container *ngIf="receivedData$ | async; else loading; let values">
      <ng-container *ngIf="values.length < 1; else show">
        <ng-container *ngTemplateOutlet="empty"></ng-container>
      </ng-container>
      <ng-template #show>
        <table>
          <thead>
          <th *ngFor="let column of columns" [innerHTML]="column"></th>
          </thead>
          <tbody>
          <tr *ngFor="let _data of data">
            <td *ngFor="let column of columns">
              <ng-container *ngIf="column!='controls'; else _controls_">
                <span [innerHTML]="_data[column]"></span>
              </ng-container>
              <ng-template #_controls_>
                <ng-container *ngTemplateOutlet="_update; context: {value: _data}"></ng-container>
              </ng-template>
            </td>
          </tr>
          </tbody>
        </table>
      </ng-template>
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
  @Input() controls!: boolean;
  data: any[] = [];
  _controls = 'controls';

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

    if (this.controls) {
      this.columns.push('controls');
    }

    console.log(this.receivedData$);
  }

  create() {
    this._dialog.create({form: this._inputForm});
  }

  update(data: object) {
    console.log(data);
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
