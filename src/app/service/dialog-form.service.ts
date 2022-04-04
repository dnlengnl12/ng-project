import {FormService} from "./form.service";
import {Directive} from "@angular/core";

export const dialogFormService = {
 formService: FormService
} as any;

@Directive()
export class GetService {
  name = '';
  constructor(name: string) {
    this.name = name;
  }

  getClass() {
    const _class = dialogFormService[this.name];
    if(!_class) {
      console.error(`${this.name} not className`);
    }

    return new _class;
  }
}
