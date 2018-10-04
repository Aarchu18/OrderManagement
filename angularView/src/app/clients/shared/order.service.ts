import { Injectable } from '@angular/core';
import { take, concatAll, toArray } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Client } from './client.model';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.model';
import { OrderList } from 'src/app/order-list';



@Injectable()
export class OrderService {
  selectedOrder: Order;
  orderId: any;
  selectedOrderDetail: Order;
  id:number;

  constructor(private http: Http) { }

  postOrderDetails(OrderList: OrderList): Observable<any> {

    var body = JSON.stringify(OrderList);
    console.log("archu" + body)
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:56225/api/OrderDetails', body, requestOptions).map(x => x.json());
  }

  getOrderDetails(): Observable<any> {
    return this.http.get('http://localhost:56225/api/OrderDetails').map(res => res.json());
  }

  putOrderDetails(id, OrderList: Order) {

    var body = JSON.stringify(OrderList);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:56225/api/OrderDetails/' + id,
      body,
      requestOptions).map(res => res.json());
  }

  
  setId(id) {
    this.id = id
  }
  getId() {
    return this.id;
  }
  getOrderID() {
    return this.orderId;
  }
  deleteOrderDetails(id: number) {
    return this.http.delete('http://localhost:56225/api/OrderDetails/' + id).map(res => res.json());
  }
}
