import {Component, Input, NgModule, OnInit} from "@angular/core";
import {FormBase} from "./form-base";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";

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
            <input matInput placeholder="{{question.key}}"

                    [value]="data"
            >
          </mat-form-field>
        </ng-template>

        <ng-template ngSwitchCase="dropdown">
          <mat-form-field
            appearance="outline"
            [id]="question.key">
            <mat-label *ngIf="question.label">{{question.label}}</mat-label>
            <mat-select [id]="question.key" [formControlName]="question.key">
              <mat-option *ngFor="let opt of question.options" [value]="opt.key">{{opt.value}}</mat-option>
            </mat-select>
          </mat-form-field>
        </ng-template>

        <ng-template ngSwitchCase="radio">
          <mat-radio-group
            aria-labelledby="question.label"
            value="{{data}}"
          >
            <mat-radio-button
              *ngFor="let opt of question.options" [value]="opt.value"
            >{{opt.key}}</mat-radio-button>
          </mat-radio-group>
        </ng-template>
      </div>
    </div>

    <div class="errorMessage" *ngIf="!isValid">{{question.label}} is required</div>
  `
})
export class DynamicFormQuestionComponent implements OnInit{
  @Input() question!: FormBase<string>;
  @Input() form!: FormGroup;
  @Input() receive!: any;

  data = null;
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  ngOnInit() {
    if(this.receive) {
      this.data = this.receive[this.question.key];
      console.log(this.data);
    }
  }

}

@NgModule({
  declarations: [DynamicFormQuestionComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule],
  exports: [DynamicFormQuestionComponent]
})
export class DynamicFormQuestionModule {
}
