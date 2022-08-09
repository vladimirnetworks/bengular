import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { apidata, ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {

  constructor(private api: ApiService,public ar: ActivatedRoute,public router: Router) { }

  blog: Observable<any> | undefined;
  searchquery: any;
  status = "";

  register() {
    this.api.post("regdomain", {"domain":this.searchquery}).subscribe((x:any) => {
     
      this.status = x.status;
      console.log(x)
      if (x.status == 'ok') {
        this.router.navigate(['../domain/'+this.searchquery], {relativeTo: this.ar});

      } 
      // 
      //this.post_id = x.data.id;

    });
  }
  check(e: any) {



    if (e.keyCode == 13) {

      this.register();


    } else {

      var c = this.api.get("checkdomain/" + this.searchquery);

      this.blog = c;
    }

    /*
    this.blog = lp.pipe(map(x => {

      //return Object.assign(new post(this.api, this.domain_id, this.post_id,this.router,this.ar), x);

    //  return Object.assign(new postxx(), x);

      return x;


    }));
    */
  }

  ngOnInit(): void {
  }

}

