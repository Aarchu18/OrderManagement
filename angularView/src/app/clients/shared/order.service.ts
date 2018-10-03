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
  //  ob:any = {};
  //  ob.OrderList = [];
  selectedOrder: Order;
  orderId: any;
  public ob;
  selectedOrderDetail: Order;
  //orderDetailList: OrderList[] = [];


  constructor(private http: Http) { }
  postOrderDetails(OrderList: OrderList): Observable<any> {
    console.log(OrderList);
    var body = JSON.stringify(OrderList);
    console.log("archu" + body)
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:56225/api/OrderDetails', body, requestOptions).map(x => x.json());
  }

  getOrderDetails(): Observable<any> {
    console.log("getting order")
    return this.http.get('http://localhost:56225/api/OrderDetails').map(res => res.json());
  }
  putOrderDetails(id,OrderList: OrderList) {
    debugger;
    var body = JSON.stringify(OrderList);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:56225/api/OrderDetails/' + id,
      body,
      requestOptions).map(res => res.json());
  }
id;
setId(id){
this.id=id
}
getId(){
  return this.id;
}
  getOrderID() {
    return this.orderId;
  }
  deleteOrderDetails(id: number) {
    return this.http.delete('http://localhost:56225/api/OrderDetails/' + id).map(res => res.json());
  }
}
