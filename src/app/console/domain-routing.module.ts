//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomainConfigComponent } from '../domain-config/domain-config.component';
import { DomainOverviewComponent } from '../domain-overview/domain-overview.component';
import { DomainComponent } from '../domain/domain.component';
import { PostComponent } from '../post/post.component';
import { PostsComponent } from '../posts/posts.component';





const routes: Routes = [
  {
    path: ':domain', component: DomainComponent, children: [

      {
        path: '', component: DomainOverviewComponent
      }
      ,

      {
        path: 'post/:post_id', component: PostComponent
      }
,
      {
        path: 'posts', component: PostsComponent
      }
  ,
      {
        path: 'config', component: DomainConfigComponent
      }    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule { }
