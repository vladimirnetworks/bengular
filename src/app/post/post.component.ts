import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { apidata, ApiService } from '../api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  domain_id:any;
  post_id:any;

  //post:any;

  post: Observable<apidata> | undefined;

  constructor(private ar: ActivatedRoute,private api:ApiService) {

    this.ar.paramMap.subscribe((z:any) => {
     
      this.domain_id = z['params']['domain_id'];
      this.post_id = z['params']['post_id'];
    
      this.post = this.api.get("post/"+this.domain_id+"/"+this.post_id);


    });


   }

  ngOnInit(): void {
  }

}



export class xobj {
  title: any;
 
}