import {
  Directive,
  Injector,
  OnInit,
} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Directive()
export class PaginationBase implements OnInit {
  listData!: [];
  currentData = new BehaviorSubject<any>(null);
  totalData!: number;

  range!: number[];
  nowPage!: number;
  dataPerPage!: number;
  totalPage!: number;
  startPage!: number;
  endPage!: number;
  pageCount = 10;
  pageGroup!: number;


  protected _route!: ActivatedRoute;

  constructor(
    protected _injector: Injector
  ) {
  }

  ngOnInit() {
    this._route = this._injector.get(ActivatedRoute);

    this._route.data.subscribe(data => {
      const {listData} = data;
      this.totalData = listData.pop();
      this.listData = listData;
      this.setPaging();
      this.setRange();
    });
  }

  setPaging() {
    const urlParams = new URLSearchParams(window.location.search);
    const _page = urlParams.get('page');
    const _limit = urlParams.get('limit');

    this.dataPerPage = _limit ? +_limit : 10;

    this.totalPage = this.setLastPage(this.totalData, this.dataPerPage);

    this.nowPage = (_page ?
      +_page > this.totalPage ?
        this.totalPage : +_page : 1);
    if (this.totalPage < this.pageCount) {
      this.pageCount = this.totalPage;
    }


    this.pageGroup = Math.ceil(this.nowPage / this.pageCount);
    this.endPage = this.setEndPage(this.pageGroup, this.pageCount);
    this.startPage = this.setStartPage(this.endPage, this.pageCount);

    if (this.endPage > this.totalPage) {
      this.endPage = this.totalPage;
    }
  }

  setLastPage(totalData: number, limit: number): number {
    return Math.ceil(totalData / limit);
  }

  setStartPage(last: number, pageCount: number): number {
    return last - (pageCount - 1);
  }

  setEndPage(group: number, limit: number): number {
    return group * limit;
  }

  setCurrentData(data: [], page?: number) {
    const {dataPerPage} = this;
    if (data.length < 1) {
      return;
    }

    if (!page) {
      page = this.nowPage;
    }

    const min = dataPerPage * (page - 1);
    const max = dataPerPage * (page);

    return data.filter((data: {}, index: number) =>
      index >= min && index < max)
  }

  setRange() {
    const {startPage, endPage} = this;

    const arrayNum = Math.ceil(this.totalPage / this.pageCount) === this.pageGroup ?
      endPage - startPage + 1 : this.pageCount;
    // @ts-ignore
    this.range = Array(arrayNum).fill().map((v, i) => {
      if (startPage < endPage) {
        return startPage + i
      }
    });
    console.log(this.range);
  }
}
