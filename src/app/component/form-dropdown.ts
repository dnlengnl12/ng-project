import {FormBase} from "./form-base";

export class FormDropdown extends FormBase<string> {
  override controlType = 'dropdown';
}
