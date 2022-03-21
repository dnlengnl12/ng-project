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
  startPage!: number;
  endPage!: number;
  pageCount = 3;
  pageGroup!: number;


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


    this.pageGroup = Math.ceil(this.nowPage.value / this.pageCount);
    this.endPage = this.setEndPage(this.pageGroup, this.pageCount);

    if(this.endPage > this.totalPage) {
      this.endPage = this.totalPage;
    }

    this.startPage = this.setStartPage(this.endPage, this.pageCount);
    console.log(this.dataPerPage, this.totalPage, this.nowPage.value, this.endPage, this.startPage);
    this.setCurrentData(this.nowPage.value);

  }

  setLastPage(totalData:number, limit: number): number {
    return Math.ceil(totalData / limit);
  }

  setStartPage(last: number, pageCount: number): number {
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
