import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';
import { ApiService } from './api.service';
import { PostComponent } from './post/post.component';
import { DomainComponent } from './domain/domain.component';
import { PostsComponent } from './posts/posts.component';
import { DomainOverviewComponent } from './domain-overview/domain-overview.component';
import { DomainConfigComponent } from './domain-config/domain-config.component';
import { NewBlogComponent } from './new-blog/new-blog.component';
//import { EditorModule } from '@tinymce/tinymce-angular';

const appRoutes: Routes = [




  // { path: 'admin/:id', component: ProductComponent , canActivate:[AuthService]},
 
 //  { path: 'product/:id', component: ProductComponent},
 
 //  { path: 'order', component: OrderComponent},
 
  { path: '', component: IndexComponent ,  canActivate:[AuthService]},
  { path: 'blogs', component: BlogsComponent ,  canActivate:[AuthService]},
  { path: 'blogs/:id', component: BlogComponent ,  canActivate:[AuthService]},

  { path: 'domain/:domain', component: DomainComponent ,  canActivate:[AuthService] },
  { path: 'post/:domain/:post', component: PostComponent ,  canActivate:[AuthService] },



  { path: 'console', loadChildren: () => import(`./console/console.module`).then(m => m.ConsoleModule) }

 
 ];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BlogsComponent,
    BlogComponent,
    PostComponent,
    PostsComponent,
    DomainOverviewComponent,
    DomainConfigComponent,
    NewBlogComponent
    
    
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
