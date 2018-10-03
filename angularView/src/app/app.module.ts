import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ItemService } from './clients/shared/item.service';
import { AppComponent } from './app.component';
import  {ClientService} from './clients/shared/client.service';
import {OrderService} from './clients/shared/order.service';
import { ClientsComponent } from './clients/clients.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientComponent } from './clients/client/client.component';
import{Routes,RouterModule} from '@angular/router';
import {HttpModule} from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderListComponent } from './clients/order-list/order-list.component';
import {MatDialogModule} from '@angular/material';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
//import {Popup, PopupModule} from 'ng2-opd-popup';
//import { MaterialModule} from '@angular/material';
//import {MaterialModule} from '@angular/material';


const routes:Routes=[{
  path:'',
  component:ClientComponent
},
{
  path:'AddOrder',
  component:ClientListComponent,
  //canActivate:[AuthguardService]

},
{
  path:'OrderList',
  component:OrderListComponent,
  //canActivate:[AuthguardService]

},


]
@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientListComponent,
    ClientComponent,
    OrderListComponent,
    MyDialogComponent

  ],

  imports: [
    BrowserModule,
    MatDialogModule,
    ReactiveFormsModule,
   // PopupModule.forRoot(),
    FormsModule,
    HttpModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
   // ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  entryComponents:[MyDialogComponent],
  providers: [ClientService,ItemService,OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
