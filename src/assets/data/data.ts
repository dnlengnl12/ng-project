import {Injectable} from "@angular/core";
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  createDb() {
    const data: any = [
      {id: 1, name: 'lsh', approval: true},
      {id: 2, name: 'kdw', approval: false}
    ];
    return {data};
  }

  getId(data: any) {
    return data.length > 0 ? Math.max(...data.map((_data: any) => _data.id)) + 1 : 0;
  }
}
