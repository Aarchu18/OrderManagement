import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { ToastrService } from 'ngx-toastr';
import  {OrderList} from 'src/app/order-list';
import {MatDialog} from '@angular/material';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList:OrderList = new OrderList();

  constructor(private orderService :OrderService,private toastr: ToastrService,public dialog: MatDialog) { }
//orderList=[];
itemOrder=[];

  ngOnInit() {
    //debugger
 
    this.orderService.getOrderDetails().subscribe(order =>
    {
     // debugger;
      console.log("successs"+order)
      this.itemOrder=order;


     // this.orderService.postOrderDetails(this.orderList);      
      console.log("abc"+JSON.stringify(this.itemOrder))
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
  itemDelete:number

  onOptiondeleteSelected(eventdelete){
    console.log("working");
    debugger;
    //this.itemDelete = event.clientName;
    console.log(eventdelete);

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data:{
        myVar:JSON.stringify(this.itemOrder)
      }
    
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      console.log(result);
      
    
    });
  }
  deleteOrderDetails(index)
  {
 
    this.itemOrder.splice(index,1);
    }
  onDelete(id: number,index){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.orderService.deleteOrderDetails(id)
        .subscribe(x => {
           this.orderService.getOrderDetails();
          console.log("output"+JSON.stringify(x));
        
           this.toastr.warning("Deleted Successfully");
        })
    }
     this.itemOrder.splice(index,1);
   console.log("index"+index);
   
  }

}
