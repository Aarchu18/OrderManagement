import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { ToastrService } from 'ngx-toastr';
import { OrderList } from 'src/app/order-list';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';
import { Order } from 'src/app/clients/shared/order.model';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList: OrderList = new OrderList();
  itemDelete: number;
  constructor(private orderService: OrderService, private routes: Router, private toastr: ToastrService, public dialog: MatDialog) { }
  itemOrder = [];

  ngOnInit() {
    this.orderService.getOrderDetails().subscribe(order => {
      this.itemOrder = order;
    });
  }
  onOptiondeleteSelected(eventdelete) {
    console.log("working");

    //this.itemDelete = event.clientName;
    console.log(eventdelete);

  }
  openDialog(id: number, index) {

    console.log("index" + id);
    this.orderService.setId(id);
    var order: Order = new Order();
    order.orderId = id;
    order.ClientName = this.itemOrder[index].clientName;
    order.ItemCategory = this.itemOrder[index].itemcategory;
    order.Itemname = this.itemOrder[index].itemname;
    order.ItemQuantity = this.itemOrder[index].itemQuantity;
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '250px',
      data: order
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  deleteOrderDetails(index) {

    this.itemOrder.splice(index, 1);
  }
  onDelete(id: number, index) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.orderService.deleteOrderDetails(id)
        .subscribe(x => {
          this.orderService.getOrderDetails();
          console.log("output" + JSON.stringify(x));

          this.toastr.warning("Deleted Successfully");
        })
    }
    this.itemOrder.splice(index, 1);
    console.log("index" + index);

  }
  signOut() {
    localStorage.clear();
    this.routes.navigate(['/']);

  }

}
