import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { OrderService } from '../clients/shared/order.service';
import { OrderList} from '../order-list';

import { NgForm, FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { Order } from 'src/app/clients/shared/order.model';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {
  name;
  editOrder={};
  orderList: OrderList = new OrderList();
  myString;
  myData=[];
  order:Order=new Order();
public orderId:number;
public clientName:string;
public itemcategory:string;
public itemname:string;
public itemQuantity:number;

  constructor(public dialogRef:MatDialogRef<MyDialogComponent>,@Inject(MAT_DIALOG_DATA)public data:Order,private orderService:OrderService) { 
   
    //console.log("save"+JSON.stringify(data))
    this.order=data;
    this.orderId=this.order.orderId;
    this.clientName=this.order.ClientName;
    this.itemcategory=this.order.ItemCategory;
    this.itemname=this.order.Itemname;
    this.itemQuantity=this.order.ItemQuantity;

    // let order:Order=new Order();
    //  this.editOrder=this.data;
     console.log("Angular"+data);
     
    // order=this.data;
    // order.ClientName=this.editOrder
    //console.log(order.ClientName);
    console.log("hoga "+JSON.stringify(this.editOrder));
    
    // this.myData = JSON.parse(this.editOrder);
//this.name=data.name;
    // this.myString=JSON.stringify(this.myData)
     //console.log("archaa"+this.name);
    // console.log(this.myData.toString());
    // return Mydata.toString();
    
  }
id;
itemOrder = [];
  ngOnInit() {
   this.id= this.orderService.getId();
   this.orderService.getOrderDetails().subscribe(order => {
    // debugger;
    console.log("succ" + order)
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
  profileForm = new FormGroup({
     OrderId:new FormControl(''),
    ClientName: new FormControl(''),
    ItemCategory: new FormControl(''),
    Itemname: new FormControl(''),
      ItemQuantity: new FormControl(''),
      
    
  });
  
   

// onSubmit(){
   
//     console.log("onsubmit"+JSON.stringify(this.profileForm.value));
    
//    console.log("id"+this.id);
//   //  let myOrder=this.itemOrder.find(c =>c.orderId == this.id)
//   // console.log("orderList"+JSON.stringify(myOrder));
  
   
//     this.orderService.putOrderDetails(this.id,this.profileForm.value).subscribe(res => {
//       // console.log("we"+order)
      
//       console.log("successs" +JSON.stringify( res));
//       // this.itemOrder = order;


//     //   this.orderService.postOrderDetails(this.orderList);      
//     //  console.log("abc" + JSON.stringify(this.itemOrder))
//     //   console.log(this.orderList[0].orderId);


//     //       var abc = JSON.stringify(order);
//     //       console.log(abc)
//     //    this.orderList.push(abc);
//     //     console.log("dd"+this.orderList);

//     });
  
//     this.dialogRef.close("it was saved");
//   }
  onSave(){
    var order1:Order=new Order(); 
   
    order1 = {
      //  ClientName: this.profileForm.value.ClientName,
      // ItemCategory: this.profileForm.value.ItemCategory,
      // Itemname: this.profileForm.value.Itemname,
      // ItemQuantity: this.profileForm.value.ItemQuantity
      orderId:this.orderId,
      ClientName: this.clientName,
      ItemCategory: this.itemcategory,
      Itemname: this.itemname,
      ItemQuantity: this.itemQuantity
    };
     console.log("yasg"+order1);
     this.orderService.putOrderDetails(this.id,order1).subscribe(res=>{
       console.log("sucesssss"+res);
       

     });
     this.dialogRef.close("it was saved");
   
  }

 

}
