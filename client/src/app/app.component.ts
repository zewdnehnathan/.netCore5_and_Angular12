import { Component, OnInit } from '@angular/core';

import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import{HttpClient} from '@angular/common/http'
import { IPagination } from './shared/models/pagination';
import { IProduct } from './shared/models/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'skinet';
  token : any;

  constructor(private basketService:BasketService,
    private accountService:AccountService){}

  ngOnInit():void{
    this.loadBasket();
    this.loadCurrentUser();
  }
  loadCurrentUser(){

    if(localStorage.getItem('token') ===null)
    {
       this.token = null;
    }
    else{
       this.token = localStorage.getItem('token');
    }
    this.accountService.loadCurrentUser(this.token)?.subscribe(()=>{
      console.log('loaded user');
    },error=>{console.log(error)}
    );

  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
   if(basketId){
     this.basketService.getBasket(basketId).subscribe(
       () => {
         console.log('initialised basket');
       }, error => {
         console.log(error);
       });
   }
  }


}
