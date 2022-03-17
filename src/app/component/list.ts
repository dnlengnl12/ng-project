import {ChangeDetectionStrategy, Component, Injector, Input, NgModule, OnInit, ViewEncapsulation} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CommonModule} from "@angular/common";
import {DialogFormModule} from "./dialog-form";
import {DialogService} from "../service/dialog.service";
import {DataType} from "../input-form/data1";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {PaginationComponent} from "./pagination-component";

@Component({
  selector: 'app-list',
  template: `
    <ng-template #_create>
      <button mat-button (click)="create()">Create</button>
    </ng-template>

    <ng-template #_update let-value="value">
      <button mat-button (click)="update(value)">Update</button>
    </ng-template>

    <ng-template #empty>
      데이터가 없습니다.
    </ng-template>

    <ng-template #_listTable>
      <table mat-table [dataSource]="listData" class="mat-elevation-z8">
        <ng-container [matColumnDef]="column" *ngFor="let column of columns">
          <ng-container *ngIf="column !== 'controls' then _data_ else _controls_"></ng-container>
          <ng-template #_data_>
            <th mat-header-cell *matHeaderCellDef [innerHTML]="column"></th>
            <td mat-cell *matCellDef="let element">{{element[column]}}</td>
          </ng-template>
          <ng-template #_controls_>
            <th mat-header-cell *matHeaderCellDef>controls</th>
            <td mat-cell *matCellDef="let row">
              <ng-container *ngTemplateOutlet="_update; context: {value: row}"></ng-container>
            </td>
          </ng-template>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns;"></tr>
        <!--      <ng-container *ngIf="controls then _controls"></ng-container>-->
        <!--      <ng-template #_controls>-->
        <!--        <tr mat-header-row></tr>-->
        <!--        <tr mat-row *matRowDef="let row;">-->
        <!--          <ng-container *ngTemplateOutlet="_update; context: {value: row}"></ng-container>-->
        <!--        </tr>-->
        <!--      </ng-template>-->
      </table>
    </ng-template>

    <div class="list-header">
      <h1 [innerHTML]="title"></h1>
    </div>
    <div class="list-main">
      <ng-container *ngIf="listData.length > 0; then _listTable else empty"></ng-container>
    </div>
    <div class="list-footer">
      <ng-container *ngTemplateOutlet="_create"></ng-container>
      <ng-template #paging></ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./list.scss'],
})
export class ListComponent extends PaginationComponent implements OnInit {
  @Input() title!: string;
  @Input() columns!: string[];
  @Input() controls!: boolean;


  constructor(
    private _dialog: DialogService,
    private _inputForm: DataType,
    _route: ActivatedRoute
  ) {
    super(_route);
  }

  ngOnInit() {

    if(this.controls) {
      this.columns.push('controls');
    }
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
    MatTableModule,
    MatButtonModule
  ],
  exports: [ListComponent],
  providers: [
    DialogService,
    DataType,
  ]
})
export class ListModule {
}
