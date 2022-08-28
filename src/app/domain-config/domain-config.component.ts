import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-domain-config',
  templateUrl: './domain-config.component.html',
  styleUrls: ['./domain-config.component.css']
})
export class DomainConfigComponent implements OnInit {

  domain: any;
  // conf:Observable<any>


  title: string = "";
  cat: string = "";
  tags: string = "";

  constructor(private ar: ActivatedRoute, private api: ApiService, public router: Router) {
    this.ar.parent?.paramMap.subscribe((parent: any) => {
      this.domain = parent["params"]['domain'];
    });

    this.api.get("domain/" + this.domain).subscribe((x: any) => {
      console.log(x)
      this.title = x.title;
      this.cat = x.cats;
      this.tags = x.tags;
    });

  }





  update() {
    // console.log(this.conf$)
    this.api.post("domain/" + this.domain, { "title": this.title, "cat": this.cat , "tags": this.tags}).subscribe((x: any) => {



    }
    );
  }


  delete() {

    let randx = new Array(10).join().replace(/(.|$)/g, function () { return ((Math.random() * 36) | 0).toString(36)[Math.random() < .5 ? "toString" : "toUpperCase"](); });


    let randxrev = [...randx].reverse().join("");

    if (confirm("delete this blog ?")) {
      alert("keep this in your mind " + randx)

      if (prompt("type that reversed : ") == randxrev && confirm("motmaen ?") && confirm("motmaen2 ?") && confirm("motmaen3 ?") && confirm("motmaen4 ?") && prompt("بنویس له له له له له له له له لم له له لم به انگلیسی") == "la la la la la la la la lam la la lam") {
        this.api.delete("domain/" + this.domain).subscribe((x: any) => {
          this.router.navigate(['/console'], { relativeTo: this.ar });

        }
        );
      } else {
        alert("نشد")
      }
    }

  }

  ngOnInit(): void {
  }

}


interface configx {
  title: string;
}