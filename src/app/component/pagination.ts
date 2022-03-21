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

@Component({
  selector: 'app-paging',
  template: `
    <ul>
      <ng-container *ngIf="pageGroup > 1">
        <li>이전</li>
      </ng-container>
      <li *ngFor="let _range of range;"
          [className]="'page-'+_range"
          [innerHTML]="_range"
          (click)="movePage(_range)"
      >
      </li>
      <ng-container *ngIf="endPage < totalPage">
        <li (click)="movePage(endPage + 1)">다음</li>
      </ng-container>
    </ul>
  `,
  styleUrls: ['./pagination.scss']
})
export class PaginationComponent implements OnInit, AfterViewInit {
  range!: number[];
  @Input() nowPage!: number;
  @Input() pageCount!: number;
  @Input() startPage!: number;
  @Input() endPage!: number;
  @Input() totalPage!: number;
  @Input() pageGroup!: number;

  liClass!: NodeListOf<Element>;

  activeElement!: Element;

  @Output('dataChange') dataChange = new EventEmitter<any>();
  constructor(private _page: PaginationBase) {
  }

  ngAfterViewInit() {
    this.setActiveButton();
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
    urlParams.set('page', ''+num);
    const newParam = urlParams.toString();

    const _url = location.origin + location.pathname + '?' + newParam;
    // @ts-ignore
    history.pushState(null, null, _url);
    this._page.setCurrentData(num);
    // window.open(location.pathname + '?' + newParam, '_self');
    this.setActiveButton(num);
    this._page.setPaging();
    console.log(this.nowPage);
    if(num) {
      this.setRange();
    }
  }

  setActiveButton(page?: number) {
    if(!this.liClass) {
      this.liClass = document.querySelectorAll('[class*="page-"]');
    }
    if(this.activeElement) {
      this.activeElement.classList.remove('_active');
    }

    page = (page) ? page : this.nowPage;

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
