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


 async  doimg(inp:any, doing:any) {
      return new Promise(async (resolve) => {
        var str_s = inp;
        var regx = /<img[^>]*src="([^"]+)"[^>]*>/g;
        var m;
        while ((m = regx.exec(inp))) {
          if (m[1].includes('webp') == false) {
            str_s = str_s.replace(m[0], await doing(m[1]));
          }
        }
        resolve(str_s);
      });
    }

    

    getJpegBytes(canvas:any, callback:any) {
      var fileReader = new FileReader();

      fileReader.addEventListener('loadend', function () {
        callback(this.error, this.result);
      });

      canvas.toBlob(
        fileReader.readAsArrayBuffer.bind(fileReader),
        'image/jpeg'
      );
    }




  dodox() {

    console.log(this.data.text);

    var self = this;
    this.doimg(this.data.text, (img:any) => {
      return new Promise((resolve) => {
        var timg = new Image();

        timg.crossOrigin = 'Anonymous';
        timg.onload = function () {
          console.log(timg.width + ' ' + timg.height);

          var x = document.createElement('CANVAS') as HTMLCanvasElement;
          x.width = timg.width;
          x.height = timg.height;
          var ctx = x.getContext('2d');
          if (ctx !== null) {
          ctx.fillStyle = '#FF0000';
          ctx.drawImage(timg, 0, 0);
          }

          self.getJpegBytes(x, function (error:any, arrayBuffer:any) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://127.0.0.1:8000');
            xhr.setRequestHeader('Content-Type', 'application/octet-stream');

            xhr.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
              }
            };

            xhr.send(arrayBuffer);
          });

          var dataURL = x.toDataURL('image/png');
        };
        if (!img.includes(';base64,')) {
          img = 'https://sc.upid.ir/apix.php?url=' + img;
        }
        timg.src = img;

        /*setTimeout(() => {
            
          }, 500);*/
      });
    }).then((m:any) => {
     
     self.data.text=m;
      //this.khk = m;
    });


  }




}



export class xobj {
  title: any;

}
