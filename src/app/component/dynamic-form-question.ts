import {Component, Input, NgModule} from "@angular/core";
import {FormBase} from "./form-base";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-question',
  template: `
    <div [formGroup]="form">
      <label [attr.for]="question.key">{{question.label}}</label>
      <div [ngSwitch]="question.controlType">
        <input
          *ngSwitchCase="'textbox'"
          [formControlName]="question.key"
          [id]="question.key"
          [type]="question.type"
        >

        <select
          *ngSwitchCase="'dropdown'"
          [id]="question.key"
          [formControlName]="question.key"
        >
          <option *ngFor="let opt of question.options" value="opt.key">{{opt.value}}</option>
        </select>
      </div>
    </div>

    <div class="errorMessage" *ngIf="!isValid">{{question.label}} is required</div>
  `
})
export class DynamicFormQuestionComponent {
  @Input() question!: FormBase<string>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}

@NgModule({
  declarations: [DynamicFormQuestionComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  exports: [DynamicFormQuestionComponent]
})
export class DynamicFormQuestionModule {}
