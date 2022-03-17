import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";

export abstract class ResolveBase<T = any> implements Resolve<T> {
  protected constructor(protected $api: any) {
  }

  resolve(snapshot: ActivatedRouteSnapshot): Observable<T> {
    return this.$api.get();
  }
}
