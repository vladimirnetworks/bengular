import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { xobj, Apilist } from '../apilist';
import { editobj } from '../editobj';


@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
  


  latest: any;
  itemsx: Observable<xobj> | undefined;
  
  searchquery:any;
  constructor( private api: ApiService,public ar: ActivatedRoute,public router: Router) { }

  ngOnInit(): void {
  }




  search() {
    if (this.searchquery == 'newblog') {
         

           this.router.navigate(['newblog'], {relativeTo: this.ar});

    } else {
    let locallates = new Apilist('search/'+this.searchquery, this.api, myBlogs);

    this.latest = locallates;

    this.itemsx = locallates.ret;
    }

  }

  
}

export class myBlogs extends editobj {

  title: any;


}