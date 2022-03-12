import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-domain-overview',
  templateUrl: './domain-overview.component.html',
  styleUrls: ['./domain-overview.component.css']
})
export class DomainOverviewComponent implements OnInit {

  domain:any;
  constructor(private ar: ActivatedRoute) { 
    this.ar.parent?.paramMap.subscribe((parent:any)=>{
    this.domain =  parent["params"]['domain'];
    });
  }

  ngOnInit(): void {
  }

}
