import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { apidata, ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  domain_id: any;
  post_id: any;

  //post:any;

  post: Observable<post> | undefined;

  constructor(public ar: ActivatedRoute, private api: ApiService,public router: Router) {

    this.ar.parent?.paramMap.subscribe((parent:any)=>{
      
      this.domain_id =  parent["params"]['domain'];

      this.ar.paramMap.subscribe((z: any) => {


        this.post_id = z['params']['post_id'];



      var lp;
      if (this.post_id != 'new') {
        lp = this.api.get("post/" + this.domain_id + "/" + this.post_id);
      } else {
        lp = of({ "data": {
          "url":"new-url",
          "title":"new title",
          "tiny_text":"tiny text",
          "text":"write here ...",
        } });
      }

      this.post = lp.pipe(map(x => {

        return Object.assign(new post(this.api, this.domain_id, this.post_id,this.router,this.ar), x);

      }));



      });
    });



  }




  ngOnInit(): void {
  }


  met() {
    this.post_id = 55;
  }

}

export class post {
  
  data: any;

  constructor(private api: ApiService, private domain_id: any, public post_id: any,public router: Router,public ar: ActivatedRoute) { }

  save() {
    if (this.post_id != "new") {
      this.api.put("post/" + this.domain_id + "/" + this.post_id, this.data).subscribe(x=>{
        this.router.navigate(['../../posts'], {relativeTo: this.ar});
      });

    } else {

      this.api.post("post/" + this.domain_id + "/" + this.post_id, this.data).subscribe(x=>{
        
        this.router.navigate(['../../posts'], {relativeTo: this.ar});
          this.post_id = x.data.id;

      });


    }
  }



  delete() {

    let randx = new Array(5).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36)[Math.random()<.5?"toString":"toUpperCase"]();});

    let delx = confirm("delete this post ?");

    if (delx) {
      document.body.style.display= "none"
     setTimeout(()=>{
      
      document.body.style.display= ""

      setTimeout(()=>{
      
           if (confirm("motmaen ? ") && prompt("type this reversed : \n\n"+randx, "") == [...randx].reverse().join("")) {
            this.api.delete("post/" + this.domain_id + "/" + this.post_id).subscribe(x=>{
              this.router.navigate(['../../posts'], {relativeTo: this.ar});
            });
           } else {
             alert("نشد");
           }

          },200);

     },500);


  }

  }

}



export class xobj {
  title: any;

}