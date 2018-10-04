import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Client } from './client.model';


@Injectable()
export class ClientService {
  selectedClient: Client;
  clientList: Client[];
  identity: string = localStorage.getItem("Identity");

  constructor(private http: Http) { }

  postClient(cli: Client) {
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
  getClientList(): Observable<any> {
    
    return this.http.get('http://localhost:56225/api/ClientMasters').map(res => res.json());

  }

  deleteClient(id: number) {
    return this.http.delete('http://localhost:56225/api/ClientMasters/' + id).map(res => res.json());
  }
}
