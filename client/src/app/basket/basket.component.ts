import { Component, OnInit } from '@angular/core';
import { IBasket, IBasketItem } from '../shared/models/basket';

import { BasketService } from './basket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$ !: Observable<IBasket|null>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
     this.basket$ = this.basketService.basket$;
  }

  removeBasketItem(item: IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item:IBasketItem){
    this.basketService.incrementItemQuntity(item);
  }
  decrementItemQuantity(item:IBasketItem){
    this.basketService.decrimentItemQuntity(item);
  }

}
