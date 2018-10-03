import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { ToastrService } from 'ngx-toastr';
import { OrderList } from 'src/app/order-list';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList: OrderList = new OrderList();

  constructor(private orderService: OrderService, private toastr: ToastrService, public dialog: MatDialog) { }
  //orderList=[];
  itemOrder = [];

  ngOnInit() {
    //debugger

    this.orderService.getOrderDetails().subscribe(order => {
      // debugger;
      console.log("successs" + order)
      this.itemOrder = order;


      // this.orderService.postOrderDetails(this.orderList);      
      console.log("abc" + JSON.stringify(this.itemOrder))
      // console.log(this.orderList[0].orderId);


      //     var abc = JSON.stringify(order);
      //     console.log(abc)
      //  this.orderList.push(abc);
      //   console.log("dd"+this.orderList);

    });
  }
  // deleteFieldValue(index) {
  //   this.splice(index, 1);
  //    this.orderList.getOrderID;
  //    this.orderList.deleteOrderDetails(index);
  // }
  itemDelete: number

  onOptiondeleteSelected(eventdelete) {
    console.log("working");
    debugger;
    //this.itemDelete = event.clientName;
    console.log(eventdelete);

  }
  name: string;
  openDialog(id:number,index) {
    debugger;
    console.log("index"+id);
    this.orderService.setId(id);
    //const contact =this.orderService.getOrderDetails().find(c=>c.ID === id)
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '250px',
      data: this.itemOrder[index]

      // myVar:JSON.stringify(this.itemOrder)
       
       // data: {name: this.name, animal: this.animal}
       // name:this.name
      
    });

    console.log();

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
      console.log(result);


    });
  }
  // edit(id: number) {
  //   const order = this.orderService.getOrderDetails().
  //     find(c => c.orderId === id);

  // }
  // editOrderDetails(Order: OrderList) {
  //   debugger;
  //   console.log("console" + this.itemOrder)
  //   const index = this.itemOrder.findIndex(c => c.ID === this.itemOrder[0].orderId);
  //  // this.itemOrder[index] = Order;
  //   console.log("www" + index);
  // }

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

}
