import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postid:any;

  constructor(private ar: ActivatedRoute) {

    this.ar.paramMap.subscribe((z:any) => {
     
      this.postid = z['params']['postid']
    });


   }

  ngOnInit(): void {
  }

}
