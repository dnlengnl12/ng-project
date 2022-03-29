import {FormBase} from "../component/form-base";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export class FormControlService {
  constructor() {
  }

  toFormGroup(questions: FormBase<string>[]) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });

    return new FormGroup(group);
  }
}
