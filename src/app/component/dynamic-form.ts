import {Component, Input, NgModule, OnInit} from "@angular/core";
import {FormControlService} from "../service/form-control.service";
import {FormBase} from "./form-base";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormQuestionModule} from "./dynamic-form-question";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dynamic-form',
  template: `
<!--    <div>-->
<!--      <form (ngSubmit)="onSubmit()" [formGroup]="form">-->
<!--        <div *ngFor="let question of questions" class="form-row">-->
<!--          <app-question [question]="question" [form]="form"></app-question>-->
<!--          <ng-container [ngSwitch]="data[key].inputType">-->
<!--            <ng-template ngSwitchCase="text">-->
<!--              <mat-form-field appearance="outline">-->
<!--                <mat-label *ngIf="data[key].label">{{data[key].label}}</mat-label>-->
<!--                <input matInput placeholder="{{key}}" formControlName="{{key}}">-->
<!--              </mat-form-field>-->
<!--            </ng-template>-->
<!--            <ng-template ngSwitchCase="radio">-->
<!--              <mat-radio-group-->
<!--                aria-labelledby="example-radio-group-label"-->
<!--                class="example-radio-group"-->
<!--              >-->
<!--                <mat-radio-button-->
<!--                  class="example-radio-button"-->
<!--                  *ngFor="let value of data[key].values"-->
<!--                  [value]="value"-->
<!--                >-->
<!--                  {{value}}-->
<!--                </mat-radio-button>-->
<!--              </mat-radio-group>-->
<!--            </ng-template>-->
<!--            <ng-template ngSwitchCase="checkbox">-->
<!--              <mat-checkbox>-->

<!--              </mat-checkbox>-->
<!--            </ng-template>-->
<!--          </ng-container>-->
<!--        </div>-->
<!--      </form>-->
<!--    </div>-->

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
  @Input() data!: {} | null;
  form!: FormGroup;
  payLoad = '';

  constructor(private fcs: FormControlService) {
  }

  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.questions as FormBase<string>[]);
    console.log(this.data);
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
