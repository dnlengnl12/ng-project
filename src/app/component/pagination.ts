import {CommonModule, formatNumber} from "@angular/common";
import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked, AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import {PaginationBase} from "./pagination-base";
import {BehaviorSubject, Observable} from "rxjs";
import {Location} from "@angular/common";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-paging',
  template: `
    <ul>
      <ng-container *ngIf="pageGroup.value > 1">
        <li>
          <a [routerLink]="''" [queryParams]="{page: startPage.value - 1}">이전</a>
        </li>
      </ng-container>
      <li *ngFor="let _range of range;"
          [class._active]="_range === nowPage.value"
      >
        <a [routerLink]="''" [queryParams]="{page: _range}" [innerHTML]="_range"></a>
      </li>
      <ng-container *ngIf="endPage.value < totalPage">
        <li>
          <a [routerLink]="''" [queryParams]="{page: endPage.value + 1}" >다음</a></li>
      </ng-container>
    </ul>
  `,
  styleUrls: ['./pagination.scss']
})
export class PaginationComponent implements OnInit {
  range!: number[];
  @Input() nowPage!: BehaviorSubject<number>;
  @Input() pageCount!: number;
  @Input() startPage!: BehaviorSubject<number>;
  @Input() endPage!: BehaviorSubject<number>;
  @Input() totalPage!: number;
  @Input() pageGroup!: BehaviorSubject<number>;

  pageObserver!: Observable<number>;
  liClass!: NodeListOf<Element>;

  _pageGroup!: number;
  prePage!: Element;

  @Output('dataChange') dataChange = new EventEmitter<any>();

  constructor(private _page: PaginationBase, private router: Router) {
  }


  ngOnInit() {
    this.setRange();
    //this.back();

    this.router.navigate(
      [],
      {
        queryParams: history.state,
        queryParamsHandling: 'merge'
      }
    );
  }


  setRange() {
    const {startPage, endPage} = this;

    const arrayNum = Math.ceil(this.totalPage / this.pageCount) === this.pageGroup.value ?
      endPage.value - startPage.value + 1 : this.pageCount;
    // @ts-ignore
    this.range = Array(arrayNum).fill().map((v, i) => {
      if (startPage.value < endPage.value) {
        return startPage.value + i
      }
    });
  }

  movePage(num: number) {
    if (this.nowPage.value === num) {
      return;
    }
    const {_page} = this;
    const urlParams = new URLSearchParams(window.location.search);
    const {location} = window;
    urlParams.set('page', '' + num);
    const newParam = urlParams.toString();
    const isSameGroup = this._pageGroup === this.pageGroup.value;

    const _url = location.origin + location.pathname + '?' + newParam;
    // @ts-ignore
    history.pushState(_url, null, _url);

    console.log(history);
    _page.setCurrentData(num);
    _page.setPaging();

    if (this._pageGroup || !isSameGroup) {
      this.setRange();
    }

    this._pageGroup = this.pageGroup.value;
  }



  private back() {
      history.back();
      // const {currentTarget} = event as any;
      // const {search} = currentTarget['location'];
      // let page = search.match(/(?<=page=)\w+/g);
      //
      // if(!page) {
      //   page = 1;
      // }
      //
      // history.back();
      // this.movePage(page);
  }
}


@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PaginationComponent]
})
export class PaginationModule {
}
