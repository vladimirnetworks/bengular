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

  constructor(private api: ApiService) { }

  blog: Observable<any> | undefined;
  searchquery:any;

  register() {
    this.api.post("regdomain", this.searchquery).subscribe(x=>{
      console.log(x)
    //  this.router.navigate(['../../posts'], {relativeTo: this.ar});
        //this.post_id = x.data.id;

    });
  }
  check(e:any) {

   

    if (e.keyCode == 13) {
      
      this.register();


    } else {

    var c = this.api.get("checkdomain/"+this.searchquery);
    
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

