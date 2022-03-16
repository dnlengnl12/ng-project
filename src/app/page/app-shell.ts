import {Component, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  template: `
    <ng-template #nav>
      <ul>
        <li><a href="./main">Home</a></li>
        <li><a href="./book">Books</a></li>
      </ul>
    </ng-template>
    <div id="container">
      <header>
        <ng-container *ngTemplateOutlet="nav"></ng-container>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['app-shell.scss']
})
export class AppShellComponent {
}


@NgModule({
  declarations: [AppShellComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AppShellComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'main'
          },
          {
            path: 'main',
            loadChildren: () => import('./main-page').then(m => m.MainPageModule)
          },
          {
            path: 'book',
            loadChildren: () => import('./books/books-page').then(m => m.BooksPageModule)
          }
        ]
      }
    ]),
    CommonModule
  ],
  providers: []
})
export class AppShellModule {
}
