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

@Directive()
export class PaginationBase {
  @Input() listData!: [];
  currentData!: [];

  range!: number[];
  nowPage!: number;
  dataPerPage!: number;
  totalPage!: number;
  startPage!: number;
  endPage!: number;
  pageCount = 10;
  pageGroup!: number;

  urlParams = new URLSearchParams(window.location.search);

  constructor() {
  }

  setPaging() {
    const {urlParams} = this;
    const _page = urlParams.get('page');
    const _limit = urlParams.get('limit');

    this.dataPerPage = _limit ? +_limit : 5;

    this.totalPage = this.setLastPage(this.listData.length, this.dataPerPage);

    this.nowPage = _page ?
      +_page > this.totalPage ?
        this.totalPage : +_page : 1;
    if(this.totalPage < this.pageCount) {
      this.pageCount = this.totalPage;
    }


    this.pageGroup = Math.ceil(this.nowPage / this.dataPerPage);
    this.endPage = this.setEndPage(this.pageGroup, this.dataPerPage);

    if(this.endPage > this.totalPage) {
      this.endPage = this.totalPage;
    }

    this.startPage = this.setStartPage(this.endPage, this.pageCount);

    this.setCurrentData(this.nowPage);

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

  setCurrentData(page: number = 1) {
    const {listData} = this;
    if(listData.length < 1) {
      return;
    }

    const min = this.dataPerPage * (this.nowPage - 1);
    const max = this.dataPerPage * (this.nowPage);

    return listData.filter((data, index) =>
        index >= min && index < max);
  }

  pageMove(num: number) {
    console.log(num);
  }


  initData() {
    const {listData, dataPerPage, nowPage} = this;
    if(listData.length < 1) {
      return;
    }

    const min = dataPerPage * (nowPage - 1);
    const max = dataPerPage * (nowPage);

    return listData.filter((data, index) =>
        index >= min && index < max);
  }
}
