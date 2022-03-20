import {Injectable} from "@angular/core";
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  createDb() {
    const data: any = [
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
    return {data};
  }

  getId(data: any) {
    return data.length > 0 ? Math.max(...data.map((_data: any) => _data.id)) + 1 : 0;
  }
}
