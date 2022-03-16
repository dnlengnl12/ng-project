import {Component, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@Component({
  template: `
    <div>books page</div>
  `
})
export class BooksPageComponent {

}

@NgModule({
  declarations: [BooksPageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BooksPageComponent
      }
    ])
  ]
})
export class BooksPageModule {}
