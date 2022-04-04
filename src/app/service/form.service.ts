import {Injectable} from "@angular/core";
import {FormBase} from "../component/form-base";
import {FormTextbox} from "../component/form-textbox";
import {FormDropdown} from "../component/form-dropdown";
import {of} from "rxjs";
import {FormRadio} from "../component/form-radio";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  getQuestions() {
    const questions: FormBase<string>[] = [
      new FormTextbox({
        key: 'name',
        label: 'name',
        order: 1
      }),
      new FormRadio({
        key: 'approval',
        label: 'approval',
        type: 'radio',
        options: [
          {key: 'true', value: 'true'},
          {key: 'false', value: 'false'}
        ],
        order: 2
      })
    ]
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
