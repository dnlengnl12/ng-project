import {Injectable} from "@angular/core";
import {ResolveBase} from "./resolve-base.resolver";
import {MainService} from "../service/main.service";

@Injectable({
  providedIn: 'root'
})
export class ListResolve extends ResolveBase {
  constructor(protected api: MainService) {
    super(api);
  }
}
