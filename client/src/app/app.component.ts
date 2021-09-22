import { Component, OnInit } from '@angular/core';

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

  constructor(private basketService:BasketService){}

  ngOnInit():void{
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
