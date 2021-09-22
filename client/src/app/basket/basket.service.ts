import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';

import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../shared/models/products';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { isNgTemplate } from '@angular/compiler';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource=new BehaviorSubject<IBasket|null>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals|null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string){
    return this.http.get(this.baseUrl + 'basket?id='+id)
    .pipe(
      map((basket:any) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    )
  }
  setBasket(basket:IBasket){
    return this.http.post(this.baseUrl+'basket',basket)
     .subscribe((response:any) => {
       this.basketSource.next(response);
       this.calculateTotals();
     },error => {
       console.log(error);
     });
  }

  getCurrentBasketvalue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity=1){
    const itemToAdd: IBasketItem=this.mapProductItemToBasketItem(item,quantity);
    const basket=this.getCurrentBasketvalue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items,itemToAdd,quantity);
    this.setBasket(basket);
  }
  addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if(index === -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    else{
      items[index].quantity += quantity;
    }
    return items;
  }
  createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;
  }
  mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {

    return{
      id: item.id,
      productName:item.name,
      price:item.price,
      pictureUrl:item.pictureUrl,
      quantity,
      brand:item.productBrand,
      type:item.productType
    }
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketvalue();
    const shipping=0;
    if(basket){
    const subtotal = basket.items.reduce((a,b)=>(b.price*b.quantity)+a,0);
    const total = subtotal+shipping;
    this.basketTotalSource.next({shipping,total,subtotal});
    }
  }

  incrementItemQuntity(item:IBasketItem){
    const basket = this.getCurrentBasketvalue();
    if(basket){
    const foundItemIndex = basket.items.findIndex(x=>x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
    }
  }
  decrimentItemQuntity(item:IBasketItem){
    const basket = this.getCurrentBasketvalue();
    if(basket){
    const foundItemIndex = basket.items.findIndex(x=>x.id === item.id);
     if(basket.items[foundItemIndex].quantity > 1){
      basket.items[foundItemIndex].quantity--;
       this.setBasket(basket);
    }
     else{
      this.removeItemFromBasket(item);
     }
    this.setBasket(basket);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
  const basket = this.getCurrentBasketvalue();
  if(basket){
    if(basket.items.some(x=>x.id === item.id)){
     basket.items = basket.items.filter(i=>i.id !== item.id);
     if(basket.items.length > 0){
          this.setBasket(basket);
     }
     else{
       this.deleteBasket(basket);
     }
     }
    }
  }
  deleteBasket(basket: IBasket) {
    this.http.delete(this.baseUrl + 'basket?id='+basket.id).subscribe(()=>{
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error=>{
      console.log(error);
    });
  }

}
