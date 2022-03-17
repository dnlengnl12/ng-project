import {Component, Directive, ElementRef, NgModule, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Directive()
export class PaginationComponent {
  listData = [];
  nowPage!:number; //현재 페이지
  startPage!:number; //시작 페이지
  endPage!: number; //끝페이지
  total!: number;// 게시글 총 개수
  cntPerPage!: number;// 페이지당 글 갯수
  lastPage!: number; //마지막 페이지

  urlParams = new URLSearchParams(window.location.search);
  constructor(private _route: ActivatedRoute) {
    this.listData = this._route.snapshot.data['listData'];

    let {urlParams, nowPage, cntPerPage, total} = this;
    const _page = urlParams.get('page');
    const _limit = urlParams.get('limit');

    nowPage = _page ? +_page : 1;
    cntPerPage = _limit ? +_limit : 10;
    console.log(nowPage, cntPerPage);
  }

}
