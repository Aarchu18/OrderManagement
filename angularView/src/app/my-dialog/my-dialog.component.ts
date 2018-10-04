import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderService } from '../clients/shared/order.service';
import { OrderList } from '../order-list';

import { NgForm, FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { Order } from 'src/app/clients/shared/order.model';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {
  orderList: OrderList = new OrderList();
  id: number;
  itemOrder = [];
  order: Order = new Order();
  public orderId: number;
  public clientName: string;
  public itemcategory: string;
  public itemname: string;
  public itemQuantity: number;

  constructor(public dialogRef: MatDialogRef<MyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Order, private toastr: ToastrService, private orderService: OrderService) {
    this.order = data;
    this.orderId = this.order.orderId;
    this.clientName = this.order.ClientName;
    this.itemcategory = this.order.ItemCategory;
    this.itemname = this.order.Itemname;
    this.itemQuantity = this.order.ItemQuantity;
  }

  ngOnInit() {
    this.id = this.orderService.getId();
    this.orderService.getOrderDetails().subscribe(order => {
      this.itemOrder = order;
    });
  }
  profileForm = new FormGroup({
    OrderId: new FormControl(''),
    ClientName: new FormControl(''),
    ItemCategory: new FormControl(''),
    Itemname: new FormControl(''),
    ItemQuantity: new FormControl(''),


  });

  onSave() {
    var order1: Order = new Order();
    order1 = {

      orderId: this.orderId,
      ClientName: this.clientName,
      ItemCategory: this.itemcategory,
      Itemname: this.itemname,
      ItemQuantity: this.itemQuantity
    };
    this.orderService.putOrderDetails(this.id, order1).subscribe(res => {
    });
    this.toastr.success(' Record Updated Succcessfully');
    this.dialogRef.close("it was saved");
  }
}
