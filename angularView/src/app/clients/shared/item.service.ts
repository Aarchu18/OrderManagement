import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';


@Injectable()
export class ItemService {

  constructor(private http: Http) { }
  cliID: number;
  itemList: Item[];
  ClientItemList = []
  postItemList(ClientItemList) {
    var body = JSON.stringify(ClientItemList);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:56225/api/ItemMasters', body, requestOptions).map(x => x.json());
  }
  getItemList() {
    return this.http.get('http://localhost:56225/api/ItemMasters').map(res => res.json());
  }
  getCliID() {
    return this.cliID;
   
  }

  Deleteitem(index) {
    this.ClientItemList.splice(index, 1);
  }

  AddItem(modal: Item) {
    modal.ItemId = this.cliID
    console.log(this.cliID)
    console.log(modal)
    this.ClientItemList.push(modal)
    console.log(this.ClientItemList)
  }

}
