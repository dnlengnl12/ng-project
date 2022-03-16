import {ChangeDetectionStrategy, Component, NgModule, OnInit, ViewEncapsulation} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MainService} from "../service/main.service";
import {ListModule} from "../component/list";
import {BehaviorSubject, Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {DialogFormModule} from "../component/dialog-form";
import {DialogService} from "../service/dialog.service";
import {DataType} from "../input-form/data1";

@Component({
  template: `
    <app-list [receivedData$]="books" [columns]="showData"></app-list>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  books = new BehaviorSubject<any>(null);
  showData = ['name', 'approval'];

  constructor(
    private _mainService: MainService
  ) {
  }

  ngOnInit() {
    this._mainService.getData()
      .subscribe(data => {
        this.books.next(data);
      });
  }
}

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    ListModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: MainPageComponent
      }
    ]),
    CommonModule
  ],
  exports: [
    MainPageComponent
  ],
  providers: [
  ]
})
export class MainPageModule {
}
