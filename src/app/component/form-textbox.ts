import {FormBase} from "./form-base";

export class FormTextbox extends FormBase<string> {
  override controlType = 'textbox';
}
