import {Injectable, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";
//https://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do?serviceId=searchMovieList
@Injectable({
  providedIn: 'root'
})
export class MainService implements OnInit {
  private apiUrl = 'api/data';
    //'http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=f5eef3421c602c6cb7ea224104795888';
  private headerOption = {
    'X-Naver-Client-Id': 'f4hC_UwwkimNFKs0k17F',
    'X-Naver-Client-Secret': 'yICGxVXyEc'
  };

  httpOptions = {
    headers: new HttpHeaders({...this.headerOption})
  };

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {

  }

  get(startIndex?:number, pageSize?:number): Observable<any> {
    const _url = startIndex ? `${this.apiUrl}?page=${startIndex}&size=${pageSize}` : this.apiUrl;

    return this.http.get(_url)
      .pipe(
        tap(_ => console.log('fetched'))
      )
  }
}
