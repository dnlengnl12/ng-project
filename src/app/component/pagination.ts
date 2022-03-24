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

@Component({
  selector: 'app-paging',
  template: `
    <ul>
      <ng-container *ngIf="pageGroup.value > 1">
        <li (click)="movePage(startPage.value - 1)">이전</li>
      </ng-container>
      <li *ngFor="let _range of range;"
          [className]="'page-'+_range"
          [innerHTML]="_range"
          (click)="movePage(_range)"
      >
      </li>
      <ng-container *ngIf="endPage.value < totalPage">
        <li (click)="movePage(endPage.value + 1)">다음</li>
      </ng-container>
    </ul>
  `,
  styleUrls: ['./pagination.scss']
})
export class PaginationComponent implements OnInit, AfterViewInit {
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

  constructor(private _page: PaginationBase) {
  }

  ngAfterViewInit() {
    this.setActiveButton();
  }

  ngOnInit() {
    this.setRange();
    this.back();
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
    history.pushState(null, null, _url);

    _page.setCurrentData(num);
    _page.setPaging();

    if (this._pageGroup || !isSameGroup) {
      this.setRange();
    }

    this._pageGroup = this.pageGroup.value;
    setTimeout(() => {
      this.setActiveButton(num);
    })
    this.promise(num).then(data => {
      this.setActiveButton(data as any);
    })
  }

  setActiveButton(page?: number) {
    let {prePage} = this;

    if (!page) {
      page = this.nowPage.value;
    }
    if (prePage) {
      prePage.classList.remove('_active');
    }

    const currentPage = document.querySelector(`.page-${page}`);

    if (!currentPage) {
      return;
    }

    currentPage.classList.add('_active');
    this.prePage = currentPage;
  }

  private promise(num: number) {
    return new Promise((resolve) => {
      resolve(num);
    });
  }

  private back() {
    window.addEventListener('popstate', (event) => {
      const {currentTarget} = event as any;
      const {search} = currentTarget['location'];
      let page = search.match(/(?<=page=)\w+/g);

      if(!page) {
        page = 1;
      }
      this.movePage(page);
    });
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
