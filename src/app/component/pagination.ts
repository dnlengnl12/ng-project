import {CommonModule} from "@angular/common";
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
import {BehaviorSubject} from "rxjs";

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
export class PaginationComponent implements OnInit, AfterViewInit, OnChanges {
  range!: number[];
  @Input() nowPage!: BehaviorSubject<number>;
  @Input() pageCount!: number;
  @Input() startPage!: BehaviorSubject<number>;
  @Input() endPage!: BehaviorSubject<number>;
  @Input() totalPage!: number;
  @Input() pageGroup!: BehaviorSubject<number>;

  liClass!: NodeListOf<Element>;

  activeElement!: Element;
  _pageGroup!: number;

  @Output('dataChange') dataChange = new EventEmitter<any>();
  constructor(private _page: PaginationBase) {
  }

  ngAfterViewInit() {
    this.setActiveButton();
  }

  ngOnInit() {
    this.setRange();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  setRange() {
    const {startPage, endPage} = this;

    const arrayNum = Math.ceil(this.totalPage / this.pageCount) === this.pageGroup.value ?
                        endPage.value - startPage.value + 1: this.pageCount;
    // @ts-ignore
    this.range = Array(arrayNum).fill().map((v, i) => {
      if (startPage.value < endPage.value) {
        return startPage.value + i
      }
    });
    console.log(this.range);
    //this.movePage(this.endPage + 1);
  }

  movePage(num: number) {
    if(this.nowPage.value === num) {
      return;
    }
    const {_page} = this;
    const urlParams = new URLSearchParams(window.location.search);
    const {location} = window;
    urlParams.set('page', ''+num);
    const newParam = urlParams.toString();

    const _url = location.origin + location.pathname + '?' + newParam;
    // @ts-ignore
    history.pushState(null, null, _url);

    _page.setCurrentData(num);
    this.setActiveButton(num);
    _page.setPaging();

    if(this._pageGroup && this._pageGroup !== this.pageGroup.value) {
      this.setRange();
    }

    this._pageGroup = this.pageGroup.value;

  }

  setActiveButton(page?: number) {
    if(!this.liClass) {
      this.liClass = document.querySelectorAll('[class*="page-"]');
    }
    if(this.activeElement) {
      this.activeElement.classList.remove('_active');
    }

    page = (page) ? page : this.nowPage.value;


    this.liClass.forEach(node => {
      // @ts-ignore
      if(node.textContent == page) {
        this.activeElement = node;
        this.activeElement.classList.add('_active');
      }
    })
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
