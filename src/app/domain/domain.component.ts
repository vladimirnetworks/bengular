import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  domain :any;
  constructor(private ar: ActivatedRoute) { 

    
    this.ar.paramMap.subscribe((z: any) => {

      this.domain = z['params']['domain'];
    });

  }

  ngOnInit(): void {
  }

}
