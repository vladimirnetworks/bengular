import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-domain-config',
  templateUrl: './domain-config.component.html',
  styleUrls: ['./domain-config.component.css']
})
export class DomainConfigComponent implements OnInit {

  domain:any;
  constructor(private ar: ActivatedRoute) { 
    this.ar.parent?.paramMap.subscribe((parent:any)=>{
    this.domain =  parent["params"]['domain'];
    });
  }

  ngOnInit(): void {
  }

}
