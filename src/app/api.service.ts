import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface apidata {
  data: any;
}



@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

apiurl = 'https://www.benham.ir/api/admin/';
//apiurl = 'http://192.168.1.216:8000/api/admin/';


  logo :any;

  get(path:string) {
    console.log(this.apiurl + path);
    this.logo = this.apiurl + path;
    return this.http.get<apidata>(this.apiurl + path);
  }

  post(path:string, body:any) {
    console.log(this.apiurl + path + ',,' + JSON.stringify(body));
    return this.http.post<apidata>(this.apiurl + path, body);
  }

  put(path:string, body:any) {
    console.log(this.apiurl + path + ',,' + JSON.stringify(body));
    return this.http.put<apidata>(this.apiurl + path, body);
  }


  delete(path:string) {
   
    return this.http.delete<apidata>(this.apiurl + path);
  }

}