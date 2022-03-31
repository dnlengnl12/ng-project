import {
  ChangeDetectionStrategy,
  Component, Injector,
  Input,
  NgModule,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DialogFormModule} from "./dialog-form";
import {DialogService} from "../service/dialog.service";
import {DataType} from "../input-form/data1";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {PaginationBase} from "./pagination-base";

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

    <ng-template #_paging>
      <ul class="page-nav">
        <ng-container *ngIf="pageGroup > 1">
          <li>
            <a
              [routerLink]="''"
              [queryParams]="{page: startPage - 1}"
              (click)="movePage(startPage - 1)"
            >이전</a>
          </li>
        </ng-container>
        <li *ngFor="let _range of range;"
            [class._active]="_range === nowPage"
        >
          <a
            [routerLink]="''"
            [queryParams]="{page: _range}"
            [innerHTML]="_range"
            (click)="movePage(+_range)"
          ></a>
        </li>
        <ng-container *ngIf="endPage < totalPage">
          <li>
            <a
              [routerLink]="''"
              [queryParams]="{page: endPage + 1}"
              (click)="movePage(endPage+1)"
            >다음</a></li>
        </ng-container>
      </ul>
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
      </table>
    </ng-template>

    <div class="list-header">
      <h1 [innerHTML]="title"></h1>
    </div>
    <div class="list-main">
      <ng-container *ngIf="totalData > 0; then _listTable else empty"></ng-container>
    </div>
    <div class="list-footer">
      <ng-container *ngTemplateOutlet="_paging"></ng-container>
      <ng-container *ngTemplateOutlet="_create"></ng-container>

      {{nowPage | json}}
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./list.scss', './pagination.scss']
})
export class ListComponent extends PaginationBase implements OnInit {
  @Input() title!: string;
  @Input() columns!: string[];
  @Input() controls!: boolean;
  @Input() serviceName!: string;

  constructor(
    private _dialog: DialogService,
    private _inputForm: DataType,
    protected _injector: Injector
  ) {
    super(_injector);
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.controls) {
      this.columns.push('controls');
    }
  }

  create() {
    this._dialog.create({form: this._inputForm, serviceName: this.serviceName});
  }

  update(data: object) {
    this._dialog.update({form: this._inputForm, target: data, serviceName: this.serviceName});
  }


  movePage(num: number) {
    // if (this.nowPage.value === num) {
    //   return;
    // }
    // const {_page} = this;
    // const urlParams = new URLSearchParams(window.location.search);
    // const {location} = window;
    // urlParams.set('page', '' + num);
    // const newParam = urlParams.toString();
    // const isSameGroup = this._pageGroup === this.pageGroup.value;
    //
    // const _url = location.origin + location.pathname + '?' + newParam;
    // // @ts-ignore
    // history.pushState(_url, null, _url);
    //
    // console.log(history);
    // _page.setCurrentData(num);
    // _page.setPaging();
    //
    // if (this._pageGroup || !isSameGroup) {
    //   this.setRange();
    // }
    //
    // this._pageGroup = this.pageGroup;
  }


}


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    DialogFormModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [ListComponent],
  providers: [
    DialogService,
    DataType,
  ]
})
export class ListModule {
}
