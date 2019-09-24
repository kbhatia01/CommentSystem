import { Injectable } from '@angular/core';
// import { HttpClient} from '@angular/common/http';
import { RequestOptions, Headers,Http} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private header = new Headers({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'});


  private options = new RequestOptions({ headers: this.header });


  constructor(private http: Http) {

  }
  //fetch locations from json data and save the json on local storage
  getComments() {
   
    return this.http.get(environment.api,this.options).map((res: any) => {
      return res.json();
    });
  }
  postComments(m) {
    return this.http.post(environment.api,m,this.options).map((res: any) => {
      return res.json();
    });
  }

  patchComments(m,id){

    return this.http.patch(m,environment.api+id,this.options).map((res: any) => {
      return res.json();
    });
  }
}
