import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/products';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';
import { shopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search', { static: false })
  searchTerm!: ElementRef;

  products: IProduct[] | undefined;
  brands:IBrand[]=[];
  types:IType[]=[];
  shopParams: shopParams = new shopParams();
  totalCount=0;
  holdPageSize = 6;

  sortOptions= [
    {name:'Alphabetical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: High to Low',value:'priceDesc'}];

  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
    this.getBrands();
  }

  getTypes(){
    this,this.shopService.getTypes().subscribe(response => {
      this.types=[{id:0,name:'All'},...response];
    },
   error =>{
     console.log(error);
   })
  }
  getBrands(){
    this.shopService.getBrands().subscribe(response => {
     this.brands=[{id:0,name:'All'},...response];
    },
    error => {
      console.log(error);
    });
  }
  getProducts(){
    this.shopService.getProducts(this.shopParams)
    .subscribe(response =>{
      this.products = response?.data;
      if(response?.pageIndex){
      this.shopParams.pageNumber=response.pageIndex;
      }
      if(response?.pageSize){
      this.shopParams.pageSize=response.pageSize;
      this.holdPageSize = this.shopParams.pageSize;
      }
      else{
        this.holdPageSize =0;
      }
      if(response?.count){
      this.totalCount=response.count;
      }
      else{
        this.totalCount=0;
      }
    },error =>{
      console.log(error);
    });
  }
  getBrandSelected(brandId:number){
    this.shopParams.brandId=brandId;
    this.shopParams.pageSize=1;
    this.getProducts();
  }
  getTypeSelected(typeId:number){
    this.shopParams.typeId=typeId;
    this.shopParams.pageSize=1;
    this.getProducts();
  }

  onSortSelected(sort:string){
    this.shopParams.sort=sort;
    this.getProducts();
  }
  onPageChanged(event: any){
    if(this.shopParams.pageNumber !== event){
    this.shopParams.pageNumber=event;
    this.getProducts();
    }
  }
  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageSize=1;
    this.getProducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams=new shopParams();
    this.getProducts();
  }

}
