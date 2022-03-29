import {Injectable} from "@angular/core";
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  data: any = [
    {id: 1, name: 'lsh', approval: true},
    {id: 2, name: 'kdw', approval: false},
    {id: 3, name: 'baf', approval: false},
    {id: 4, name: 'werfsd', approval: false},
    {id: 5, name: 'bfda', approval: false},
    {id: 6, name: 'dfgs', approval: false},
    {id: 7, name: 'wetr', approval: false},
    {id: 8, name: 'gfdh', approval: false},
    {id: 9, name: 'nghd', approval: false},
    {id: 10, name: 'tyh', approval: false},
    {id: 11, name: 'ehr', approval: false},
    {id: 12, name: 'tyj', approval: false},
    {id: 13, name: 'ejtr', approval: false},
    {id: 14, name: 'jyt', approval: false},
    {id: 15, name: 'ukyr', approval: false}
  ];
  dataPerPage = 10;

  constructor(
    private _route: Router,
  ) {
  }

  createDb() {
    let {data, dataPerPage} = this;
    const urlParams = new URLSearchParams(window.location.search);
    let page: any = urlParams.get('page');
    if (!page) {
      page = 1;
    }
    const {length} = this.data;
    //index 5
    const min = dataPerPage * (page - 1);
    const max = dataPerPage * (page);
    const _data: any = data.filter((_data: {}, index: number) => {
      return index >= min && index < max
    });

    _data.push(data.length);
    return {
      data: _data,
    };
  }

  getId(data: any) {
    return data.length > 0 ? Math.max(...data.map((_data: any) => _data.id)) + 1 : 0;
  }


}
