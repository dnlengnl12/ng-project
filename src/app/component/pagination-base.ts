import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Directive()
export class PaginationBase {
  listData!: [];
  currentData = new BehaviorSubject<any>(null);

  range!: number[];
  nowPage = new BehaviorSubject<number>(0);
  dataPerPage!: number;
  totalPage!: number;
  startPage = new BehaviorSubject<number>(0);
  endPage = new BehaviorSubject<number>(0);
  pageCount = 3;
  pageGroup = new BehaviorSubject<number>(0);


  constructor() {
  }

  setPaging() {
    const urlParams = new URLSearchParams(window.location.search);
    const _page = urlParams.get('page');
    const _limit = urlParams.get('limit');

    this.dataPerPage = _limit ? +_limit : 3;

    this.totalPage = this.setLastPage(this.listData.length, this.dataPerPage);

    this.nowPage.next(_page ?
      +_page > this.totalPage ?
        this.totalPage : +_page : 1);
    if(this.totalPage < this.pageCount) {
      this.pageCount = this.totalPage;
    }


    this.pageGroup.next(Math.ceil(this.nowPage.value / this.pageCount));
    this.endPage.next(this.setEndPage(this.pageGroup.value, this.pageCount));
    this.startPage.next(this.setStartPage(this.endPage.value, this.pageCount));

    if(this.endPage.value > this.totalPage) {
      this.endPage.next(this.totalPage);
    }

    console.log(this.dataPerPage, this.totalPage, this.nowPage.value, this.endPage.value, this.startPage.value);
    this.setCurrentData(this.nowPage.value);

  }

  setLastPage(totalData:number, limit: number): number {
    return Math.ceil(totalData / limit);
  }

  setStartPage(last: number, pageCount: number): number {
    console.log(last, pageCount);
    return last - (pageCount - 1);
  }

  setEndPage(group: number, limit: number): number {
    return group * limit;
  }

  setCurrentData(page?: number) {
    const {listData, dataPerPage} = this;
    if(listData.length < 1) {
      return;
    }

    if(!page) {
      page = this.nowPage.value;
    }

    const min = dataPerPage * (page - 1);
    const max = dataPerPage * (page);

    this.currentData.next(listData.filter((data, index) =>
        index >= min && index < max)
    );
  }
}
