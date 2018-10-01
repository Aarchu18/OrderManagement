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
  cliID: number;
  message: string;
  clientList = null

  constructor(private clientService: ClientService, private itemService: ItemService,private toastr: ToastrService, private routes: Router ) { }

  ngOnInit() {
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

  onSubmit(form: NgForm) {
    //console.log("hi")
    //console.log(form.controls.ItemId.value)
    if (form.value.ClientId == null) {
    //  console.log('Hiii');
      this.clientService.postClient(form.value).subscribe(data => {
        //  console.log(data);
          
          this.clientService.getClientList();
          this.toastr.success('New Record Added Succcessfully', 'Client Register');
         // localStorage.setItem('key', data.EmpCode);
          
          this.cliID = form.controls.ItemId.value;
          this.itemService.cliID = form.controls.ItemId.value;
          this.routes.navigate(['AddOrder']);
          this.resetForm(form);


        }, err => {
          this.message = "Client ID Already Exists";
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
