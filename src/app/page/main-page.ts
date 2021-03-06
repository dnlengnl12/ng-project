import {ChangeDetectionStrategy, Component, NgModule, OnInit, ViewEncapsulation} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MainService} from "../service/main.service";
import {ListModule} from "../component/list";
import {BehaviorSubject, Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {ListResolve} from "../resolve/list-resolve.resolver";

@Component({
  template: `
    <app-list [columns]="columns" [controls]="true" [serviceName]="'formService'"></app-list>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  books = new BehaviorSubject<any>(null);
  columns = ['name', 'approval'];

  constructor(
    private _mainService: MainService
  ) {
  }

  ngOnInit() {
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
        component: MainPageComponent,
        resolve: {
          listData: ListResolve
        }
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
