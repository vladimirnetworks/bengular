import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  domain:any;
  constructor(private ar: ActivatedRoute) { 
    this.domain = "bbb";

    this.ar.parent?.paramMap.subscribe((parent:any)=>{
      
      this.domain =  parent["params"]['domain'];

      
    });
  }

  ngOnInit(): void {
  }

}
