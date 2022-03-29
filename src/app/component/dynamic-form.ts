import {Component, Input, NgModule, OnInit} from "@angular/core";
import {FormControlService} from "../service/form-control.service";
import {FormBase} from "./form-base";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormQuestionModule} from "./dynamic-form-question";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dynamic-form',
  template: `
    <div>
        <form (ngSubmit)="onSubmit()" [formGroup]="form">
          <div *ngFor="let question of questions" class="form-row">
            <app-question [question]="question" [form]="form"></app-question>
          </div>

          <div class="form-row">
            <button type="submit" [disabled]="!form.valid">Save</button>
          </div>

          <div *ngIf="payLoad" class="form-row">
            <strong>Saved the following values</strong>
            <br>{{payLoad}}
          </div>

        </form>

    </div>
  `,
  providers: [FormControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: FormBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private fcs: FormControlService) {
  }

  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.questions as FormBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}


@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    DynamicFormQuestionModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [DynamicFormComponent]
})
export class DynamicFormModule {
}
