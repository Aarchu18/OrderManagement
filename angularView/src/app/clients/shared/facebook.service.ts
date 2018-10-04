import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor() { }
  data:any;
  getData():any{
    return this .data;
    
  }
  setData(data){
    this.data=data;
  }
}
