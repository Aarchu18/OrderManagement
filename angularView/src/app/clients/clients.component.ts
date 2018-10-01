import { Component, OnInit } from '@angular/core';
import {ClientService} from './shared/client.service'
import { ItemService } from './shared/item.service'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private clientService:ClientService) { }

  ngOnInit() {
  }

}
