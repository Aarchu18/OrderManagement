import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/client.service';
import { ItemService } from '../shared/item.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../shared/client.model';
import { Item } from '../shared/item.model';
import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';
import { ToastrService } from 'ngx-toastr'
import { OrderList } from '../../order-list';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  orderList: OrderList = new OrderList();
  public clientList: any = [];
  public orders: Order[] = [];
  itemdata = [];
  categoryData = [];
  clientNameList = [];
  qnamePattern = "[a-zA-Z]+";

  constructor(private clientService: ClientService, public dialog: MatDialog, private toastr: ToastrService, private orderService: OrderService, private itemService: ItemService, private routes: Router) { }

  ngOnInit() {
    this.itemService.getItemList()
      .subscribe(
        res => {
          var abc = res.json();
          abc.forEach((item) => {
            this.itemID = item.itemId;
            this.itemName = item.itemName;
            this.itemCategory = item.itemCategory;
            this.itemQuantity = item.itemQuantity;
            this.categoryData.push({ "category": this.itemCategory, "quantity": this.itemQuantity });
          });
        }
      );

    this.clientService.getClientList().subscribe(
      clientData => {
        var cli = clientData.json();
        cli.forEach((client) => {
          this.clientName = client.clientName;
          this.clientNameList.push({ "clientName": this.clientName });

        });
      }
    );
}
  ClientName: string;
  clientName: string;
  itemCategory: string;
  itemQuantity: number;
  itemName: string;
  itemID: number;
  modal: any;
  ItemCategory: string;
  Itemname: string;
  ItemQuantity: number;
  index: number = 0;
  Order: Order;
  optionSelected: any;
  client: string;
  item: string;
  data: Order[];
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};


  public onOptionsSelected(event): void {  // event will give you full breif of action
    this.client = event.clientName;
  }
  public onOptionsItemSelected(eventItem): void {

    this.item = eventItem.category;
  }

  addFieldValue() {

    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
    this.modal = new Item(this.itemID, this.itemName, this.itemCategory, this.itemQuantity);
    this.itemdata.push(this.modal);
    this.itemCategory = "";
    this.itemQuantity = null;
    this.itemQuantity = null;
  }
  counter = 0;
  onAdd(form: NgForm) {

    let order: Order = new Order();
    if (form.value.OrderId == null) {
      order = {
        orderId: form.value.OrderId,
        ClientName: this.client,
        ItemCategory: this.item,
        Itemname: form.controls.ItemName.value,
        ItemQuantity: form.controls.ItemQuantity.value
      };

      this.toastr.success('New Record Added Succcessfully', 'Order Added');
      this.orders.push(order);
      form.reset();
    }

  }
  onSave() {
    this.orderList.order = this.orders;
    this.orderService.postOrderDetails(this.orderList).subscribe(item => {
      this.routes.navigate(['OrderList']);
    }
    )
  }
}
