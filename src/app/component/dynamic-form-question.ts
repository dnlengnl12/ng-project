import {Component, Input, NgModule} from "@angular/core";
import {FormBase} from "./form-base";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-question',
  template: `
    <div [formGroup]="form">
      <label [attr.for]="question.key">{{question.label}}</label>
      <div [ngSwitch]="question.controlType">
        <ng-template ngSwitchCase="textbox">
          <mat-form-field appearance="outline"
                          [id]="question.key"
          >
            <mat-label *ngIf="question.label">{{question.label}}</mat-label>
            <input matInput placeholder="{{question.key}}" [formControlName]="question.key">
          </mat-form-field>
        </ng-template>

        <ng-template ngSwitchCase="dropdown">
            <mat-form-field
              appearance="outline"
              [id]="question.key">
              <mat-label *ngIf="question.label">{{question.label}}</mat-label>
              <mat-select [id]="question.key" [formControlName]="question.key">
                <mat-option *ngFor="let opt of question.options" value="opt.key">{{opt.value}}</mat-option>
              </mat-select>
            </mat-form-field>
        </ng-template>
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
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  exports: [DynamicFormQuestionComponent]
})
export class DynamicFormQuestionModule {}
