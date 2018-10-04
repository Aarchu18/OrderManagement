import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../shared/client.service'
import { ToastrService } from 'ngx-toastr'
import { ItemService } from '../shared/item.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  unamePattern = "[a-zA-Z]+";
  phonePattern="^[0-9]{10}$";
 
  cliID: number;
  message: string;
  clientList = null
  itemID:number;
  itemIDList=[];

  constructor(private clientService: ClientService, private itemService: ItemService, private toastr: ToastrService, private routes: Router) { }

  ngOnInit() {
    this.itemService.getItemList().subscribe(res=>{
console.log("yes"+JSON.stringify(res));
console.log(typeof(res));
var abc = res;
console.log("aa"+abc);
abc.forEach(element => {
  this.itemID = element.itemId;
  console.log("rr"+this.itemID);
  this.itemIDList.push({ "itemID": this.itemID });
  console.log("sycc"+JSON.stringify(this.itemIDList));
  
  

  
});



console.log(res[0].itemId);


    }
  );
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.clientService.selectedClient = {
      ClientName: '',
      ClientAddress: '',
      ClientContact: null,
      ItemId: null
    }
  }
  item:number;
  public onOptionsItemSelected(eventItem): void {

    this.item = eventItem.itemID;
    console.log("xx"+this.item);
    
  }
  onSubmit(form: NgForm) {
    if (form.value.ClientId == null) {
      this.clientService.postClient(form.value).subscribe(data => {
        this.clientService.getClientList();
        this.toastr.success('New Record Added Succcessfully', 'Client Register');
        this.cliID = form.controls.ItemId.value;
        this.itemService.cliID = form.controls.ItemId.value;
        this.routes.navigate(['AddOrder']);
        this.resetForm(form);
      }
      )
    }
    else {
      this.clientService.putClient(form.value.ClientId, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.clientService.getClientList();
          this.toastr.info('Record Updated Successfully!', 'Client Register');
        });
    }
  }
}
