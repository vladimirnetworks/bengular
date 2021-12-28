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

const appRoutes: Routes = [




  // { path: 'admin/:id', component: ProductComponent , canActivate:[AuthService]},
 
 //  { path: 'product/:id', component: ProductComponent},
 
 //  { path: 'order', component: OrderComponent},
 
  { path: '', component: IndexComponent ,  canActivate:[AuthService]},
  { path: 'blogs', component: BlogsComponent ,  canActivate:[AuthService]},
  { path: 'blogs/:id', component: BlogComponent ,  canActivate:[AuthService]},
 
 ];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BlogsComponent,
    BlogComponent
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
