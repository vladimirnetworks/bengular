//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomainComponent } from '../domain/domain.component';
import { PostComponent } from '../post/post.component';
import { ConsoleComponent } from './console.component';




const routes: Routes = [
  {
    path: '', component: ConsoleComponent, children: [
      {
        path: 'post/:domain_id/:post_id', component: PostComponent
      }
,
      {
        path: 'domain/:domain', component: DomainComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
