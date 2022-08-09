import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { xobj, Apilist } from '../apilist';
import { editobj } from '../editobj';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  domain: any;
  latest: any;
  itemsx: Observable<xobj> | undefined;

  constructor(private ar: ActivatedRoute,private api: ApiService) {
    this.domain = "";

    this.ar.parent?.paramMap.subscribe((parent: any) => {

      this.domain = parent["params"]['domain'];


    });
  }

  ngOnInit(): void {
    let locallates = new Apilist( 'search/site:'+this.domain, this.api, myPosts);
    this.latest = locallates;
    this.itemsx = locallates.ret;
  }

}

export class myPosts extends editobj {

  title: any;




}
