//leaves.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainComponent } from '../domain/domain.component';
import { DomainRoutingModule } from './domain-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from '../api.service';





@NgModule({
  declarations: [
     DomainComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    DomainRoutingModule
    ,
  ]


})
export class DomainModule { }
