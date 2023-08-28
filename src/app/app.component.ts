import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { product } from './model/products';
import { ProductServices } from './Service/products.service';
import { NgForm } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { AddProduct, DeleteProduct, GetProduct } from './store/actions/product.action';
import { Observable, Subscription } from 'rxjs';
import { ProductState } from './store/state/product.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy{
  title = 'httprequests';
  allProducts:product[] =[];
  editMode: boolean = false;

  @Select(ProductState.getProductList) allProducts$:Observable<product[]>;
  @Select(ProductState.productLoaded) allProductsLoaded$:Observable<boolean>;
   
  prodLoadedSub:Subscription;

  currentProductId: string;
  @ViewChild('productForm') form : NgForm;
  isFetching: boolean =false;
  errorMessage:string=null;
  constructor(
    private productService: ProductServices ,
     private store : Store
     ){}
 
  ngOnInit(){
    this.fetchProducts();
    // this.allProducts$.subscribe(res=>{
    //   console.log('state slice=>',res);
    //   this.allProducts = res;
    // })
  }
  onProductsFetch(){
this.fetchProducts();
 }
  onProductCreate(products:{pName:string, desc:string, price:string}){
    if(this.editMode)
    this.productService.updateProduct(this.currentProductId,products);
    
    else{
      this.store.dispatch(new AddProduct(this.form.value))
    }
        
  }

   fetchProducts(){
    this.prodLoadedSub = this.allProductsLoaded$.subscribe(loadedproducts=>{
      if(!loadedproducts){
        this.store.dispatch(new GetProduct());
      }
    })
   
  //   this.isFetching = true;
  //  this.productService.fetchProduct()
  //   .subscribe(( products)=>{
  //     console.log( products)
  //     this.allProducts= products;
  //     this.isFetching = false;
  //   },(err)=>{
  //     this.errorMessage = err.message;
  //   })
  }
  onDeleteProduct(id:string){
    // this.productService.deleteProduct(id)
    this.store.dispatch(new DeleteProduct(id))
  }
  onDeleteAllProducts(){
    this.productService.deleteAllProduct()
  }
  onEditClicked(id:string){
    this.currentProductId = id;
    //Get the Product based on the id
    let currentProduct = this.allProducts.find((p)=>{return p.id === id});
    console.log(currentProduct.id);
    // console.log(this.form);

    //populate the form with the product details
      this.form.setValue({
        pName:currentProduct.pName,
        desc:currentProduct.desc,
        price:currentProduct.price
      });
  
    //change the button value to update product
      this.editMode = true;
  }
   ngOnDestroy(){
   this.prodLoadedSub.unsubscribe();
  }
}
