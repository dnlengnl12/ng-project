import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, NgModule, OnInit, Output} from "@angular/core";
import {PaginationBase} from "./pagination-base";

@Component({
  selector: 'app-paging',
  template: `
    <ul>
      <ng-container *ngIf="pageGroup > 1">
        <li>이전</li>
      </ng-container>
      <li *ngFor="let _range of range;"
          [className]="_range == nowPage ? '_active' : ''"
          [innerHTML]="_range"
          (click)="movePage(_range)"
      >
      </li>
      <ng-container *ngIf="endPage < totalPage">
        <li>다음</li>
      </ng-container>
    </ul>
  `,
  styleUrls: ['./pagination.scss']
})
export class PaginationComponent implements OnInit {
  range!: number[];
  @Input() nowPage!: number;
  @Input() pageCount!: number;
  @Input() startPage!: number;
  @Input() endPage!: number;
  @Input() totalPage!: number;
  @Input() pageGroup!: number;

  @Output('dataChange') dataChange = new EventEmitter<any>();
  constructor(private _page: PaginationBase) {
  }

  ngOnInit() {
    this.setRange();
  }

  setRange() {
    // @ts-ignore
    this.range = Array(this.pageCount).fill().map((v, i) => {
      if (this.startPage < this.endPage) {
        return this.startPage + i
      }
    });
  }

  movePage(num: number) {
    const urlParams = new URLSearchParams(window.location.search);
    const {location} = window;
    console.log(num);
    urlParams.set('page', ''+num);
    const newParam = urlParams.toString();

    const _url = location.origin + location.pathname + '?' + newParam;
    // @ts-ignore
    history.pushState(null, null, _url);
    this._page.setCurrentData(num);
    // window.open(location.pathname + '?' + newParam, '_self');
  }
}


@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule
  ],
  exports: [PaginationComponent]
})
export class PaginationModule {
}
