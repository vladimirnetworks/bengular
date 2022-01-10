//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { ConsoleComponent } from './console.component';




const routes: Routes = [
  {
    path: '', component: ConsoleComponent, children: [
      {
        path: 'post/:domain/:postid', component: PostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
