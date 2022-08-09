//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomainComponent } from '../domain/domain.component';
import { NewBlogComponent } from '../new-blog/new-blog.component';
import { PostComponent } from '../post/post.component';
import { PostsComponent } from '../posts/posts.component';
import { ConsoleComponent } from './console.component';




const routes: Routes = [
  {
    path: '', component: ConsoleComponent, children: [



      { path: 'domain', loadChildren: () => import(`./domain.module`).then(m => m.DomainModule) },
      {
        path: 'newblog', component: NewBlogComponent
      }



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
