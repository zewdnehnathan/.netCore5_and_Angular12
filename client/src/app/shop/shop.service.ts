import { HttpClient, HttpParams } from '@angular/common/http';
import {delay, map} from 'rxjs/Operators';

import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/products';
import { IType } from '../shared/models/productType';
import { Injectable } from '@angular/core';
import { shopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:44305/api/';

  constructor(private http:HttpClient) { }

  getProducts(shopParams:shopParams){
    let params = new HttpParams();
    if(shopParams.brandId != 0){
      params=params.append('brandId',shopParams.brandId.toString());
    }
    if(shopParams.typeId != 0){
      params=params.append('typeId',shopParams.typeId.toString());
    }
    params=params.append('sort',shopParams.sort);

    if(shopParams.pageNumber){
      params=params.append('pageIndex',shopParams.pageNumber.toString());
    }
    if(shopParams.pageSize){
      params=params.append('pageIndex',shopParams.pageSize.toString());
    }
    if(shopParams.search){
      params = params.append('search',shopParams.search);
    }

    return this.http.get<IPagination>(this.baseUrl+'products',{observe:'response',params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getProduct(id:number){
    return this.http.get<IProduct>(this.baseUrl+'products/'+id);
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

}
