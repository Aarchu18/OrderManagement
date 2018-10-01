import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Client } from './client.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClientService {
  selectedClient: Client;
  clientList: Client[];

  constructor(private http: Http,private httpClient:HttpClient) { }

  postClient(cli: Client) {
   // console.log(cli);
    var body = JSON.stringify(cli);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:56225/api/ClientMasters', cli, requestOptions).map(x => x.json());
  }

  putClient(id, cli) {
    var body = JSON.stringify(cli);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:56225/api/ClientMasters/' + id,
      body,
      requestOptions).map(res => res.json());
  }
  getClientList():Observable<any> {
    console.log("getting client")
     return this.http.get('http://localhost:56225/api/ClientMasters')
      // .map((data: Response) => {
      //   return data.json() as Client[];
      // }).toPromise().then(x => {
      //   this.clientList = x;
      
  }

  deleteClient(id: number) {
    return this.http.delete('http://localhost:56225/api/ClientMasters/' + id).map(res => res.json());
  }
}
