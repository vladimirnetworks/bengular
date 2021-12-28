import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { xobj, Apilist } from '../apilist';
import { editobj } from '../editobj';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {




  latest;
  itemsx: Observable<xobj>;
  
  constructor(
    private api: ApiService
  ) { 


    let locallates = new Apilist('fastprice', this.api, myBlogs);
    this.latest = locallates;

    this.itemsx = locallates.ret;

  }

  ngOnInit(): void {
  }

  update(obj:any) {
    obj.save();
  }

  modelChanged(e:any,obj:any) {
    obj.status = "changed";
   
  }

}


export class myBlogs extends editobj {

  title: any;
  price!: any;



  override fillable = ['price'];
}