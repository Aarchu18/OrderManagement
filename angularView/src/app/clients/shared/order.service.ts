import { Injectable } from '@angular/core';
import { take, concatAll, toArray } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Client } from './client.model';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.model';
import {OrderList} from 'src/app/order-list';



@Injectable()
export class OrderService {
  //  ob:any = {};
  //  ob.OrderList = [];
  selectedOrder: Order;
  orderId:any;
  public ob;


//this.http.post('/myPostal/postRequestMapping', data)
 

  constructor(private http:Http) { }
  abc;

  // postOrderDetails(OrderList) {
  //   // this.ob = {
  //   //   ob1:OrderList[0], // Array1
  //   //   ob2:OrderList[1] // Object with arrays
  //   //   };
  //   //   console.log("archaa" +JSON.stringify(this.ob))
  //   // console.log("archaa" +JSON.stringify(this.ob.ob1))
  //   // console.log("archaa" +JSON.stringify(this.ob.ob2))
  //   // OrderList.forEach((order:any) => {
  //   //   console.log("abhi"+order[0]);
  //   //   console.log("abhi"+order[1]);
  //   //    var body = OrderList;
  //   var body=OrderList;
  //   console.log(b)
  //     var headerOptions = new Headers({ 'Content-Type': 'application/json' });
  //     var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
  //      return this.http.post('http://localhost:56225/api/OrderDetails',body , requestOptions).map(x => x.json(),concatAll()); 

      
  //   // });
  //   // return this.abc;
  // }
  postOrderDetails(OrderList: OrderList):Observable<any> {

   // debugger
    console.log(OrderList);
    //console.log("archana"+OrderList);
    // OrderList.order.forEach(order => {
    //   console.log("akkkk"+order);
     var body = JSON.stringify(OrderList);
     console.log("archu"+body)
     var headerOptions = new Headers({ 'Content-Type': 'application/json' });
     var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
      return this.http.post('http://localhost:56225/api/OrderDetails', body, requestOptions).map(x => x.json());  

      
    // });
    
  }
  ApiHit(order){
    
  }
  getOrderDetails():Observable<any> {
    console.log("getting order")
     return this.http.get('http://localhost:56225/api/OrderDetails').map(res => res.json());
      }
  putOrderDetails(id, OrderList) {
    var body = JSON.stringify(OrderList);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:56225/api/OrderDetailss/' + id,
      body,
      requestOptions).map(res => res.json());
  }
   
  getOrderID() {
    return this.orderId;
  }
  deleteOrderDetails(id: number) {
    return this.http.delete('http://localhost:56225/api/OrderDetails/' + id).map(res => res.json());
  }
}
