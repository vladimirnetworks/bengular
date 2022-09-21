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

  constructor(public ar: ActivatedRoute, private api: ApiService, public router: Router) {

    this.ar.parent?.paramMap.subscribe((parent: any) => {

      this.domain_id = parent["params"]['domain'];

      this.ar.paramMap.subscribe((z: any) => {


        this.post_id = z['params']['post_id'];



        var lp;
        if (this.post_id != 'new') {
          lp = this.api.get("post/" + this.domain_id + "/" + this.post_id);
        } else {
          lp = of({
            "data": {
              "url": "new-url",
              "title": "new title",
              "tiny_text": "tiny text",
              "text": "write here ...",
              "ldjson": "{}",
            }
          });
        }

        this.post = lp.pipe(map(x => {

          return Object.assign(new post(this.api, this.domain_id, this.post_id, this.router, this.ar), x);

        }));



      });
    });



  }





  ngOnInit(): void {
  }


  met() {
    this.post_id = 55;
  }


  setup(editor: any) {
    var self = this;
    var openDialog = function () {
      return editor.windowManager.open({
        title: 'enter namasha url',
        body: {
          type: 'panel',
          items: [
            {
              type: 'input',
              name: 'url',
              label: 'namasha url',
            },
            {
              type: 'htmlpanel',
              name: 'url2',
              html: '<div id ="imgboxtmp" contenteditable="true" onclick="this.innerHTML = \'\'" >paste image here</div>',
            },
          ],
        },
        buttons: [
          {
            type: 'cancel',
            text: 'Close',
          },
          {
            type: 'submit',
            text: 'add',
            primary: true,
          },
        ],
        onSubmit: function (api: any) {
          var data = api.getData();
          //console.log(api.block())
          var xz = document.getElementById('imgboxtmp');



          var gjb = function (canvas: any, callback: any) {
            var fileReader = new FileReader();

            fileReader.addEventListener('loadend', function () {
              callback(this.error, this.result);
            });

            canvas.toBlob(
              fileReader.readAsArrayBuffer.bind(fileReader),
              'image/jpeg'
            );
          }


          /*var xhr = new XMLHttpRequest();
          xhr.open('POST', 'https://sc.upid.ir/base64api.php');
          xhr.setRequestHeader('Content-Type', 'application/octet-stream');

          xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {

              var lparse = JSON.parse(xhr.responseText);

              editor.insertContent(
                '<video poster="' + lparse['url'] + '" width="' + lparse['width'] + '" height="' + lparse['height'] + '" controls="controls" ><source src="' + data.url + '"></video>'
              );


            }
          };
          */


          var regx = /<img[^>]*src="([^"]+)"[^>]*>/g;

          if (xz != null) {
            var m = regx.exec(xz.innerHTML);

            if (m != null && m[1] != null) {
              //xhr.send(m[1]);
              var img = m[1];
              var timg = new Image();
              timg.crossOrigin = 'Anonymous';
              timg.onload = function () {

                var x = document.createElement('CANVAS') as HTMLCanvasElement;
                x.width = timg.width;
                x.height = timg.height;
                var ctx = x.getContext('2d');
                if (ctx !== null) {
                  ctx.fillStyle = '#FF0000';
                  ctx.drawImage(timg, 0, 0);
                }

                gjb(x, function (error: any, arrayBuffer: any) {
                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', 'https://sc.upid.ir/toteleg2.php');
                  xhr.setRequestHeader('Content-Type', 'application/octet-stream');

                  xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                      var lparse = JSON.parse(this.responseText);
                      editor.insertContent(
                        '<video poster="' + lparse['url'] + '" width="' + lparse['width'] + '" height="' + lparse['height'] + '" controls="controls" ><source src="' + data.url + '"></video>'
                      );
                    }
                  };
                  xhr.send(arrayBuffer);

                });

              }

              if (!img.includes(';base64,')) {
                img = 'https://sc.upid.ir/apix.php?url=' + img;
              }

              timg.src = img;

            }

          }







          api.close();
        },
      });
    };

    editor.ui.registry.addButton('namasha', {
      text: 'namasha',
      onAction: function () {
        /* Open window */
        openDialog();
      },
    });
    /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
    editor.ui.registry.addMenuItem('namasha', {
      text: 'namasha',
      onAction: function () {
        /* Open window */
        openDialog();
      },
    });
    /* Return the metadata for the help plugin */
    return {
      getMetadata: function () {
        return {
          name: '',
          url: '',
        };
      },
    };
  }

}

export class post {

  data: any;

  constructor(private api: ApiService, private domain_id: any, public post_id: any, public router: Router, public ar: ActivatedRoute) { }

  save() {
    if (this.post_id != "new") {
      this.api.put("post/" + this.domain_id + "/" + this.post_id, this.data).subscribe(x => {
        this.router.navigate(['../../posts'], { relativeTo: this.ar });
      });

    } else {

      this.api.post("post/" + this.domain_id + "/" + this.post_id, this.data).subscribe(x => {

        this.router.navigate(['../../posts'], { relativeTo: this.ar });
        this.post_id = x.data.id;

      });


    }
  }



  delete() {

    let randx = new Array(5).join().replace(/(.|$)/g, function () { return ((Math.random() * 36) | 0).toString(36)[Math.random() < .5 ? "toString" : "toUpperCase"](); });

    let delx = confirm("delete this post ?");

    if (delx) {
      document.body.style.display = "none"
      setTimeout(() => {

        document.body.style.display = ""

        setTimeout(() => {

          if (confirm("motmaen ? ") && prompt("type this reversed : \n\n" + randx, "") == [...randx].reverse().join("")) {
            this.api.delete("post/" + this.domain_id + "/" + this.post_id).subscribe(x => {
              this.router.navigate(['../../posts'], { relativeTo: this.ar });
            });
          } else {
            alert("نشد");
          }

        }, 200);

      }, 500);


    }

  }


  async doimg(inp: any, doing: any) {
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



  getJpegBytes(canvas: any, callback: any) {
    var fileReader = new FileReader();

    fileReader.addEventListener('loadend', function () {
      callback(this.error, this.result);
    });

    canvas.toBlob(
      fileReader.readAsArrayBuffer.bind(fileReader),
      'image/jpeg'
    );
  }


  jsondlgen() {
    var xhr = new XMLHttpRequest();


    var regx = /<source[^>]*src="([^"]+)"[^>]*>/g;
    var m = regx.exec(this.data.text);

    var regx2 = /<video[^>]*poster="([^"]+)"[^>]*>/g;
    var m2 = regx2.exec(this.data.text);

    var poster = "";
    if (m2 != null && m2[1] != null) {
      poster = m2[1];
    }

    var uu = "";

    if (m != null && m[1] != null) {
      uu = m[1];
    }

    xhr.open('GET', 'https://upid.ir/namashaapi.php?u=' + uu);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');

    function padTo2Digits(num:any) {
      return num.toString().padStart(2, '0');
    }
    
    function formatDate(date:any) {
      return (
        [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('-') +
        'T' +
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()),
          padTo2Digits(date.getSeconds()),
        ].join(':')
      );
    }


    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {

        var lparse = JSON.parse(xhr.responseText);

        var las = JSON.parse(this.data.ldjson);

        var uplooddate = formatDate(new Date())+"+03:30";


        if (las['uploadDate'] !== undefined) {
          uplooddate = las['uploadDate'];
        }

        var jsoong = {

          "@context": "https://schema.org/",
          "@type": "VideoObject",
          "name": this.data.title,
          "duration": lparse['dur'],
          "thumbnailUrl": poster,
          "description": this.data.tiny_text,
          "uploadDate": uplooddate

        }




        if (lparse['manifest'] != null) {
          this.data.ldjson = JSON.stringify(jsoong)
          this.data.text = this.data.text.replace(uu, lparse['manifest']);
        } else {
          if (!uu.includes("Manifest")) {
            alert("bad video");
          }
        }


      }
    };

    xhr.send();
  }


  dodox() {



    var self = this;
    this.doimg(this.data.text, (img: any) => {
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

          self.getJpegBytes(x, function (error: any, arrayBuffer: any) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://sc.upid.ir/toteleg.php');
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
    }).then((m: any) => {

      self.data.text = m;
      //this.khk = m;
    });


  }




}



export class xobj {
  title: any;

}
